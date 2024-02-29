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

/** A `type-grahpql` resolver for  `User` related queries and mutations. */
@Resolver(User)
export class UserResolver {
  /** A query to get the current logged-in user data. */
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    return new UserService(ctx).me();
  }

  /** The first step in signing up a user. */
  @Mutation(() => User, {nullable: true})
  async signupUser(@Arg('args') args: CreateUserInput, @Ctx() ctx: Context): Promise<User | null> {
    return new UserService(ctx).signupUser(args);
  }

  /** The second step of signing up a user. */
  @Mutation(() => confirmSignupOutput)
  async confirmSignup(@Arg('args') args: confirmSignupInput, @Ctx() ctx: Context): Promise<confirmSignupOutput> {
    return new UserService(ctx).confirmSignup(args);
  }

  /** A mutation to update the current logged in `User` profile info. */
  @Authorized()
  @Mutation(() => User)
  async updateMyProfile(@Arg('args') args: UpdateMyProfileInput, @Ctx() ctx: Context): Promise<User> {
    return new UserService(ctx).updateMyProfile(args);
  }

  /** A query to get a  `User` profile info */
  @Authorized()
  @Query(() => User, { nullable: true })
  async getUser(@Arg('userId') userId: string, @Ctx() ctx: Context): Promise<User | null> {
    return new UserService(ctx).getUser(userId);
  }

  /** A resolver for the `posts` sub field in the other qeuries and mutations. */
  @Authorized()
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
