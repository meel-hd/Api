import { Context, context } from "..";
import { User } from "../../graphql/schema/User";

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