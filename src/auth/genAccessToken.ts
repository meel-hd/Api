import { sign } from 'jsonwebtoken';

function genAccessToken(userId: string) {
    const secret = process.env.JWT_SECRET as string;
    return sign(userId, secret)
}

export default genAccessToken;