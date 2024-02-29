import { Context } from "../../../../../context";
import errorReporter from "../../../../../lib/error/reportError";
import { UpdateMyProfileInput, User } from "../../../../schema/User";

/** Update the profile info of the user
 *  @args userEmail the email of the email to update,
 *  @dataToUpdate bio, name, nickname, and profilePic.
 *  @returns the updated user if the operation was successful, an error otherwise.
 */
async function updateMyProfileService(ctx: Context, args: UpdateMyProfileInput): Promise<User | null> {
    const foundTargetUser = await ctx.prisma.user.findUnique({
        where: { id: ctx.user?.id }
    })
        .catch(err => {
            errorReporter(err, {
                message: "Invoke of prisma.user.findUnique failed, where id: " + ctx.user?.id,
                sourceCaller: "updateMyProfileService"
            })
            return null;
        })
    if (!foundTargetUser) {
        return null; //User to update not found
    }
    const updatedUser = ctx.prisma.user.update({
        where: { id: foundTargetUser.id }, data: {
            bio: args.bio,
            name: args.name,
            nickname: args.nickname,
            profilePic: args.profilePic
        }
    }).catch(err => {
        errorReporter(err, {
            message: "Invoke of prisma.user.update failed, where data: " + args,
            sourceCaller: "updateMyProfileService"
        })
        return null;
    })
    if (!updatedUser) {
        return null; // Failed to update user.
    }
    return updatedUser;
}

export default updateMyProfileService;