import { Context } from "../../../../../context";
import errorReporter from "../../../../../lib/error/reportError";
import { User } from "../../../../schema/User";

/**
 * The servie to get the current logged in `User` info.
 * @param context The current query excution context.
 * @returns The `User` data if the operation was successfull, `null` if not.
 */
async function meService(context: Context): Promise<User | null> {
    return context.prisma.user.findUnique({
        where: {
            id: context.user?.id
        }
    }).catch(err => {
        errorReporter(err, {
            message: "Prisma failed to get user from db, userId: " + context.user?.id,
            sourceCaller: "meService",
            sourceFile: "resolvers/User/services/me/index.ts"
        })
        return null;
    })
};

export default meService;