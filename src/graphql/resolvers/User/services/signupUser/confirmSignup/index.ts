import { Context } from "../../../../../../context";
import errorReporter from "../../../../../../lib/error/reportError";
import { ConfirmSignupErrorMessage, confirmSignupInput, confirmSignupOutput } from "../../types";

/** Confirms a user signup through a token
 * @argument `userId` the of user that it is going to signup
 * @argument `token` possibly invalid verification token 
 * @returns `successful` true and set a valid auth cookie if the token is valid,
 * or `successful` false if the token is invalid, with `message` indicating why
 * confirmation failed
 */
async function confirmSignupService(context: Context, args: confirmSignupInput): Promise<confirmSignupOutput> {
    const verification_token = await context.prisma.verification_Token.findFirst({
        where: {
            targetUserId: args.userId,
            token: args.token
        }
    }).catch(err => {
        errorReporter(err, {
            message: "Invoke of prisma.verification_Token.findFirst failed, where targetUserId and token are: "
                + args.userId + " " + args.token,
            sourceCaller: "confirmSignupService"
        })
    })

    if (!verification_token) {
        return {
            successful: false,
            message: ConfirmSignupErrorMessage.INVALID_TOKEN
        };
    } else {
        const tokenAgeInHours = -(verification_token.createdAt.getTime() - Date.now()) / 3600000
        // Invalid: too old
        if (tokenAgeInHours > 5) {
            await context.prisma.verification_Token.delete({ where: { id: verification_token.id } })
                .catch(err => {
                    errorReporter(err, {
                        message: "Invoke of prisma.verification_Token.delete failed, where id: " + verification_token.id,
                        sourceCaller: "confirmSignupService.TooOldToken"
                    })
                })
            return {
                successful: false,
                message: ConfirmSignupErrorMessage.EXPIRED_TOKEN
            };
        }
        // Valid token: Authorize
        // TODO: Add jwt based cookie auth instead
        await context.prisma.verification_Token.delete({ where: { id: verification_token.id } })
            .catch(err => {
                errorReporter(err, {
                    message: "Invoke of prisma.verification_Token.delete failed, where id: " + verification_token.id,
                    sourceCaller: "confirmSignupService // Valid token section"
                })
            })
        context.res?.setHeader('cookie', args.userId);
        return {
            successful: true,
            message: ConfirmSignupErrorMessage.SUCCESSFULL
        }
    }

}

export default confirmSignupService;