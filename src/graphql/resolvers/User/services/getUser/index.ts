import { Context } from "../../../../../context";
import errorReporter from "../../../../../lib/error/reportError";
import { User } from "../../../../schema/User";

/**
 * Gets a user by his id
 * @param context The current query excution context.
 * @param userId the wanted user id
 * @retruns a user if exists, or null otherwise.
 */
async function getUserService(context: Context, userId: string): Promise<User | null> {
    return await context.prisma.user.findUnique({
        where: {
            id: userId
        }
    }).catch(err => {
        errorReporter(err, {
            message: "Prisma can't get user with this id: " + userId,
            sourceCaller: "getUserService",
            sourceFile: "resolvers/User/services/index.ts"
        })
        return null;
    })
}

export default getUserService;