import { PrismaClient } from '@prisma/client';
import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../graphql/schema/User';

/** The interacting interface with the `DB`, using `Prirsma ORM`.*/
export const prisma = new PrismaClient()

/**
 * The excution context of each request.
 *    we expose in it in addition to the `req` and `res`, the prisma client
 *    and the calling user info if he is logged in.
 */
export class Context {
  prisma: PrismaClient;
  req?: IncomingMessage;
  res?: ServerResponse<IncomingMessage>;
  user?: User
}

/** The base building block and simplest context available for all requests. */
export const context: Context = {
  prisma: prisma,
}