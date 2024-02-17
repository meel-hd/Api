import 'reflect-metadata'
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Context } from '../../../context'
import { Post } from '../../schema/Post'
import { CreateUserInput, UpdateMyProfileInput, User } from '../../schema/User'
import { UserService } from './services'
import { confirmSignupInput, confirmSignupOutput } from './services/types'


@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async signupUser(@Arg('args') args: CreateUserInput, @Ctx() ctx: Context): Promise<User> {
    return new UserService(ctx).signupUser(args);
  }

  @Mutation(() => confirmSignupOutput)
  async confirmSignup(@Arg('args') args: confirmSignupInput, @Ctx() ctx: Context): Promise<confirmSignupOutput> {
    return new UserService(ctx).confirmSignup(args);
  }

  @Authorized()
  @Mutation(() => User)
  async updateMyProfile(@Arg('args') args: UpdateMyProfileInput, @Ctx() ctx: Context): Promise<User> {
    return new UserService(ctx).updateMyProfile(args);
  }

  @Authorized()
  @Query(() => User, { nullable: true })
  async getUser(@Arg('userId') userId: string, @Ctx() ctx: Context): Promise<User | null> {
    return new UserService(ctx).getUser(userId);
  }

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
}
