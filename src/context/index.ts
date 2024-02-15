import { PrismaClient } from '@prisma/client';
import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../graphql/schema/User';

export const prisma = new PrismaClient()

export class Context {
  prisma: PrismaClient;
  req?: IncomingMessage;
  res?: ServerResponse<IncomingMessage>;
  user?: User
}

export const context: Context = {
  prisma: prisma,
}