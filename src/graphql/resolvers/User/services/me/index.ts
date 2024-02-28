import { Context } from "../../../../../context";
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
    })
};

export default meService;