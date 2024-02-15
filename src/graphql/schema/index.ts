import { GraphQLScalarType } from 'graphql'
import { DateTimeResolver } from 'graphql-scalars'
import * as tq from 'type-graphql'
import { authChecker } from '../../auth'
import { PostResolver } from '../resolvers/Post/PostResolver'
import { UserResolver } from '../resolvers/User/UserResolver'
import { PostCreateInput } from '../schema/Post'

async function buildSchema() {
    const schema = await tq.buildSchema({
        resolvers: [PostResolver, UserResolver, PostCreateInput],
        scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
        authChecker: authChecker
    })
    return schema
}

export default buildSchema;