import 'reflect-metadata'
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root
} from 'type-graphql'
import { Context } from '../../../context'
import { Post } from '../../schema/Post'
import { CreateUserInput, UpdateMyProfileInput, User } from '../../schema/User'
import { UserService } from './services'


@Resolver(User)
export class UserResolver {
  @FieldResolver()
  async posts(@Root() user: User, @Ctx() ctx: Context): Promise<Post[] | null> {
    return ctx.prisma.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .posts()
  }

  @Mutation(() => Boolean)
  async signupUser(@Arg('args') args: CreateUserInput, @Ctx() ctx: Context): Promise<Boolean> {
    return new UserService(ctx).signupUser(args);
  }
  
  @Authorized()
  @Mutation(() => User)
  async updateMyProfile(@Arg('args') args: UpdateMyProfileInput, @Ctx() ctx: Context): Promise<User> {
    return new UserService(ctx).updateMyProfile(args);
  }
}
