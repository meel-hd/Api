import { Context, context } from "..";
import { User } from "../../graphql/schema/User";

/**
 * Create the  `user` needed in `Context`.
 * @param id the `user` id we got from the cookie jwt token.
 * @returns the user we want if found in the db. undefined otherwise.
 */
export class UserContext extends Context {
  user!: User;
  static async userFromId(id: string): Promise<User | undefined> {
    let user = await context.prisma.user.findUnique({
      where: {
        id: id
      }
    })
    if (!user) {
      return undefined
    }
    return user
  }
}