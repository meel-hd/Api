# A GraphQL API for Nur App
A social media Graphql Api built using typescript, prisma and MySQL.

## Features
- Accounts.
- Passwordless Auth + JWTs.
- Posts
- and Users.
- Fully typed.
- Well designed and documented codebase.


## Tech Stack
- Typescript.
- GraphQL.
- jsonwebtoken.
- type-graphql + class-validator.
- Apollo Server.
- ts-node.

## Development

### 1. Download example and install dependencies

Clone this repo

```
git clone https://github.com/meel-hd/social-graphql
```


Install npm dependencies:

```

npm install
```



### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.


### 3. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run dev
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

## Using the GraphQL API

The schema specifies the API operations of your GraphQL server. TypeGraphQL allows you to define a schema using TypeScript classes and decorators. The schema is generated at runtime, and is defined by the following classes:

- `./src/graphql/resolvers/Post/PostResolvers.ts`
- `./src/graphql/resolvers/User/UserResolvers.ts`
- `./src/graphql/schema/User/index.ts`
- `./src/graphql/schema/Post/index.ts`

Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

#### Retrieve all published posts and their authors

```graphql
query {
  feed {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

## Start writing code
you can start modifying the code at `src/index.ts`.

## Licence 
MIT