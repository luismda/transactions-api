# Transactions API 💸

This project is a complete **Rest API in Node.js** for controlling credit (incoming) and debiting (outgoing) financial transactions. The project was built on the track of Node.js from Ignite - specialization bootcamp of [**Rocketseat**](https://github.com/rocketseat-education). The entire application was developed based on the **functional requirements** and **business rules** listed below.

## Functional requirements

- It should be able to create a new transaction
- It should be able to get a summary of transactions
- It should be able to list all transactions
- It should be able to get a specific transaction

## Business rules

- A transaction can be of the credit type that will add to the total amount, or debit that will subtract
- The title of a transaction must be at least three characters long
- It should be able to identify each user in the request
- A user will only be able to see the transactions he created

## More about the project 👀

### Description

When creating a new transaction, a **cookie** is returned to the request client, serving as a form of session that allows identifying the user in future requests. This cookie is mandatory in all routes, except the creation one, to allow searching for transactions and the summary of only one user, not allowing access to transactions of another user.

### Routing and project base

The base for this API was the **Fastify** for application route management, together with **Zod** for the validation, transforming and type definition of entries data to each route (parameters and request body). Also, was used **TypeScript** for provide best development experience and ficilitate the maintenance process, together with **ES Lint** to define patterns for writing code.

### Database

The database solution used in development was **SQLite**, already in production was used **PostgreSQL**. Also, **Knex** query builder is used to facilitate the swap of database client without need make big changes in code, together of use migrations to controlling version of database schema.

### Automated tests

In this application was developed tests on type **E2E** (end-to-end), using tools as **Vitest** and **SuperTest**. The choice of Vitest was based mainly in performance, since he use esbuild, also native support to the TypeScript and the big resemblance of functionalities with Jest.

### Deploy

The deploy of application was made using the free plan of platform **Render**. Inside of platform the PostgreSQL database and Web Service were created, connecting with the repository of GitHub to automate the process. Also, the tool **TSUP** helped in build process of application, being more performative by too use the esbuild.

## All tools and technologies 🧰

- TypeScript
- Node.js
- Fastify
- Knex
- DotEnv
- Zod
- Vitest
- SuperTest
- TSUP
- TSX
- ES Lint
- SQLite
- PostgreSQL

##

**#NeverStopLearning 🚀**
