import { verify } from "jsonwebtoken";


/**
 * Verify the JWT  sent by the user for auth
 * @param token the jsonwebtoken to verify
 * @returns the payload of the token (userId) or undifined if the token is invalid
 */
function verifyAccessToken(token: string | undefined | null) {
    const secret = process.env.JWT_SECRET as string;
    let outputUserId: string | undefined;

    if (token) {
        const verification = verify(token, secret);
        if (typeof verification == 'string') {
            outputUserId = verification;
        }
    }
    return outputUserId;
}

export default verifyAccessToken;