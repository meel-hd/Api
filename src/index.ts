import 'reflect-metadata'

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLScalarType } from 'graphql'
import { DateTimeResolver } from 'graphql-scalars'
import * as tq from 'type-graphql'
import { Context, context } from './context/index'
import { PostCreateInput, PostResolver, SortOrder } from './graphql/resolvers/Post/PostResolver'
import { UserResolver } from './graphql/resolvers/User/UserResolver'


const app = async () => {
  tq.registerEnumType(SortOrder, {
    name: 'SortOrder',
  })

  const schema = await tq.buildSchema({
    resolvers: [PostResolver, UserResolver, PostCreateInput],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
    validate: { forbidUnknownValues: false }
  })

  const server = new ApolloServer<Context>({ schema })

  const { url } = await startStandaloneServer(server, { context: async () => context })

  console.log(`🚀 Server ready at: ${url}`)
}

app()
