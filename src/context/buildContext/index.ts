import { IncomingMessage, ServerResponse } from "http";
import { Context, context } from "..";
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
  // TODO: Get user info using jwt
  const jwtUser = { id: req.headers.cookie };
  const user = jwtUser?.id ? await UserContext.userFromId(jwtUser.id) : undefined;
  const fullContext: Context = {
    prisma: context.prisma,
    req,
    res,
    user,
  }
  return fullContext
}

export default buildContext;