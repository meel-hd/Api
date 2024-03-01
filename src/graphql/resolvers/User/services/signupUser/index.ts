import { randomInt } from "crypto";
import { Context } from "../../../../../context";
import errorReporter from "../../../../../lib/error/reportError";
import { CreateUserInput, User } from "../../../../schema/User";


/** Signs up a user by email.
 *  If the user doesn't exist it creates it,
 *  then, and if the user already exists, it creates a verifecation token
 *  and send it to the user email.
 *
 * @param ctx The current mutation excution context.
 * @param args contains the `email` of the user to signup.
 * @returns the `User` data if operation was successful, `null` otherwise.
 */
async function signupUserService(ctx: Context, args: CreateUserInput): Promise<User | null> {
    let createdUser = await ctx.prisma.user.findUnique({ where: { email: args.email } })
        .catch(err => {
            errorReporter(err, {
                message: "Invoke of prisma.user.findUnique failed, where email: " + args.email,
                sourceCaller: "signupUserService",
            })
            return null;
        })
    // New user
    if (createdUser == null) {
        createdUser = await ctx.prisma.user.create({ data: { email: args.email } })
            .catch(err => {
                errorReporter(err, {
                    message: "Invoke of prisma.user.create failed, where email: " + args.email,
                    sourceCaller: "signupUserService",
                })
                return null;
            })
        if (createdUser == null) {
            return null // Failed to create user
        }
    } else {
        // Delete old verification tokens
        await ctx.prisma.verification_Token.deleteMany({
            where: {
                targetUserId: createdUser.id
            }
        })
            .catch(err => {
                errorReporter(err, {
                    message: "Invoke of prisma.verification_Token.deleteMany failed, where targetUserId: " + createdUser?.id,
                    sourceCaller: "signupUserService",
                })
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
    })
        .catch(err => {
            errorReporter(err, {
                message: "Invoke of prisma.verification_Token.create failed, where targetUserId: " + createdUser?.id,
                sourceCaller: "signupUserService",
            })
        })
    if (verification_token == null) {
        return null // Failed to create token
    }

    // TODO: Send email to the user with the verification token

    // Successfull
    return createdUser;
}

export default signupUserService;