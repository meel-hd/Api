import { randomInt } from "crypto";
import { Context } from "../../../../../context";
import { CreateUserInput, User } from "../../../../schema/User";


/** Signs up a user by email.
 *  If the user doesn't exist it creates it,
 *  then, and if the user already exists, it creates a verifecation token
 *  and send it to the user email.
 *
 * @param ctx The current mutation excution context.
 * @param args contains the `email` of the user to signup.
 * @returns the `User` data if operation was successful, an error otherwise.
 */
// TODO: return null if the operation failed instead of throwing an error
async function signupUserService(ctx: Context, args: CreateUserInput): Promise<User> {
    let createdUser = await ctx.prisma.user.findUnique({ where: { email: args.email } })
    // New user
    if (createdUser == null) {
        createdUser = await ctx.prisma.user.create({ data: { email: args.email } })
        if (createdUser == null) {
            throw Error('Failed to create user')
        }
    } else {
        // Delete old verification tokens
        await ctx.prisma.verification_Token.deleteMany({
            where: {
                targetUserId: createdUser.id
            }
        })
    }
    // Create a 6 integer long verefication token
    const token = randomInt(100000, 999999);
    const verification_token = await ctx.prisma.verification_Token.create({
        data: {
            targetUserId: createdUser.id,
            // expired: false,
            token,
        }
    });
    if (verification_token == null) {
        throw Error("Error:3939") // Failed to create token
    }

    // TODO: Send email to the user with the verification token

    // Successfull
    return createdUser;
}

export default signupUserService;