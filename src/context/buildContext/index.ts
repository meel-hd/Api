import { IncomingMessage, ServerResponse } from "http";
import { Context, context } from "..";
import { UserContext } from "./userContext";

interface Params {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>
}

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