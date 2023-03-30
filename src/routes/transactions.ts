import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [checkSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies

    const transactions = await knex('transactions').where(
      'session_id',
      sessionId,
    )

    const transactionsListWithAmountAsNumber = transactions.map(
      (transaction) => {
        return { ...transaction, amount: Number(transaction.amount) }
      },
    )

    return {
      transactions: transactionsListWithAmountAsNumber,
    }
  })

  app.get(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const schema = getTransactionParamsSchema.safeParse(request.params)

      if (schema.success === false) {
        return reply.status(400).send({
          error: `Invalid request param format: ${schema.error.message}`,
        })
      }

      const { id } = schema.data

      const { sessionId } = request.cookies

      const transaction = await knex('transactions')
        .where({
          id,
          session_id: sessionId,
        })
        .first()

      const transactionWithAmountAsNumber = transaction
        ? {
            ...transaction,
            amount: Number(transaction.amount),
          }
        : undefined

      return { transaction: transactionWithAmountAsNumber }
    },
  )

  app.get(
    '/summary',
    { preHandler: [checkSessionIdExists] },
    async (request) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      const summaryWithAmountAsNumber = summary
        ? {
            ...summary,
            amount: Number(summary.amount),
          }
        : undefined

      return { summary: summaryWithAmountAsNumber }
    },
  )

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string().trim().min(3),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const schema = createTransactionBodySchema.safeParse(request.body)

    if (schema.success === false) {
      return reply.status(400).send({
        error: `Invalid request body format: ${schema.error.message}`,
      })
    }

    const { title, amount, type } = schema.data

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
