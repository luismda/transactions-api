# Transactions API 💸

Esse projeto é uma **API Rest em Node.js** completa para controle de transações financeiras de crédito (entrada) e débito (saída). Toda a aplicação foi desenvolvida a partir dos **requisitos funcionais** e **regras de negócio** elencados abaixo.

## Requisitos funcionais

- Deve ser possível criar uma nova transação
- Deve ser possível obter um resumo de transações
- Deve ser possível listar todas as transações já realizadas
- Deve ser possível visualizar uma única transação

## Regras de negócio

- Uma transação pode ser do tipo crédito que somará ao valor total, ou débito que subtrairá
- O título de uma transação deve ter no mínimo três caracteres
- Deve ser possível indentificar cada usuário na requisição
- Um usuário só poderá ver as transações que ele criou

## Sobre o projeto 👀

### Descrição

Ao criar uma nova transação, um **cookie** é devolvido para o cliente da requisição, servindo como uma forma de sessão que permite identficar o usuário nas próximas requisições. Esse cookie é obrigatório em todas as rotas, execeto a de criação, para permitir buscar as transações e o resumo apenas de um usuário, não permitindo acessar transações de outro usuário.

### Roteamento e base do projeto

Como base para essa API foi utilizado o **Fastify** para o gerenciamento das rotas da aplicação. Além disso, também foi utilizado o **TypeScript** para proporcionar melhor experiência de desenvolvimento em conjunto do **ES Lint** para manter a padronização de escrita no código.

### Banco de dados

A solução de banco de dados utilizada em desenvolvimento foi o **SQLite**, já em produção foi o **PostgreSQL**. Além disso, o query builder **Knex** também foi utilizado para facilitar a troca do cliente de banco de dados sem precisar fazer grandes alterações no código, em conjunto do uso de migrations para controle de versão da estrutura do banco.

### Testes automatizados

Nessa aplicação foi desenvolvido testes do tipo **E2E**, utilizando ferramentas como **Vitest** e **SuperTest**.

### Deploy

O deploy da aplicação foi feito utilizando o plano gratuito da plataforma **Render**. Dentro da plataforma foi criado o banco de dados PostgreSQL e o Web Service, conectando com o repositório do GitHub para automatizar o processo. Além disso, a ferramenta **TSUP** ajudou no processo de build da aplicação, deixando mais performático.

## Todas as ferramentas e tecnologias do projeto 🧰

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
