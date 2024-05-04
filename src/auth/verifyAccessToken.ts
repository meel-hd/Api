import { verify } from "jsonwebtoken";
import errorReporter from "../lib/error/reportError";


/**
 * Verify the JWT  sent by the user for auth
 * @param token the jsonwebtoken to verify
 * @returns the payload of the token (userId) or undifined if the token is invalid
 */
function verifyAccessToken(token: string | undefined | null) {
    const secret = process.env.JWT_SECRET as string;
    let outputUserId: string | undefined;

    if (token) {
        let verification: any = undefined;
        try {
            verification = verify(token, secret);
        } catch (error) {
            errorReporter(error, {
                message: 'Verification of access token errored, with token: ' + token,
                sourceCaller: 'verifyAccessToken'
            })
        }

        if (typeof verification == 'string') {
            outputUserId = verification;
        }
    }
    return outputUserId;
}

export default verifyAccessToken;