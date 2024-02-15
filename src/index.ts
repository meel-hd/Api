import 'reflect-metadata'

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import * as tq from 'type-graphql'
import { Context } from './context'
import buildSchema from './graphql/schema'
import { SortOrder } from './graphql/schema/Post'
import buildContext from './context/buildContext'


const app = async () => {
  tq.registerEnumType(SortOrder, { name: 'SortOrder', });

  const server = new ApolloServer<Context>({ schema: await buildSchema() })
  const { url } = await startStandaloneServer(server, { context: buildContext })

  return url
}

app()
  .then(url => {
    console.log(`🟩 Server ready at: ${url}`)
  })
