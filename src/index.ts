import 'reflect-metadata'

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import * as tq from 'type-graphql'
import { Context } from './context'
import buildContext from './context/buildContext'
import { ConfirmSignupErrorMessage } from './graphql/resolvers/User/services/types'
import buildSchema from './graphql/schema'
import { SortOrder } from './graphql/schema/Post'
import { PostType } from '@prisma/client'


const app = async () => {
  /// Manually register the enums used in the type-graphql schema
  tq.registerEnumType(SortOrder, { name: 'SortOrder', });
  tq.registerEnumType(ConfirmSignupErrorMessage, { name: 'ConfirmSignupErrorMessage', });
  tq.registerEnumType(PostType, { name: 'PostType', });

  /// Create the apollo server based on the `Context` and type-graphql schema.
  const server = new ApolloServer<Context>({ schema: await buildSchema() })
  const { url } = await startStandaloneServer(server, { context: buildContext })

  return url
}

// Sever started
app()
  .then(url => {
    console.log(`🟩 Server ready at: ${url}`)
  })
