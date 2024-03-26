import { IncomingMessage, ServerResponse } from "http";
import { Context, context } from "..";
import verifyAccessToken from "../../auth/verifyAccessToken";
import { UserContext } from "./userContext";

interface Params {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>
}


/**
 * A middleware to build/add the components of our complete described context.
 *  @see  ../index.ts `Context` type, for the compelete description of the context.
 * @param object containg `request` and `response` interfaces of the call.
 * @returns a complete context as described in `Context` type.
 */
async function buildContext({ req, res }: Params) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  let user;
  const userId = verifyAccessToken(token)
  user = userId ? await UserContext.userFromId(userId) : undefined;

  const fullContext: Context = {
    prisma: context.prisma,
    req,
    res,
    user,
  }
  return fullContext
}

export default buildContext;