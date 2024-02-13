import { Context } from "../../../../../context";
import { UpdateUserInput, User } from "../../../../schema/User";

/** Update the profile info of a user
 *  @args userEmail the email of the email to update,
 *  @dataToUpdate bio, name, nickname, and profilePic.
 *  @returns the updated user if the operation was successful, an error otherwise.
 */
async function updateUserProfileService(ctx: Context, args: UpdateUserInput): Promise<User> {
    const foundTargetUser = await ctx.prisma.user.findUnique({
        where: {email: args.userEmail}
    })
    if(!foundTargetUser){
        throw Error('User to update not found.')
    }
    const updatedUser = ctx.prisma.user.update({
        where: { id: foundTargetUser.id }, data: {
            bio: args.bio,
            name: args.name,
            nickname: args.nickname,
            profilePic: args.profilePic
        }
    })
    if(!updatedUser){
        throw Error('Failed to update user.')
    }
    return updatedUser;
}

export default updateUserProfileService;