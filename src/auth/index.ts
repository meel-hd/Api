import { AuthChecker } from 'type-graphql'
import { Context } from '../context'

export const authChecker: AuthChecker<Context> = ({ context }) => {
    const { user } = context
    if (!user) {
        throw new Error('Unauthorized')
    }

    return true
}
