import 'reflect-metadata'
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Context } from '../../../context'
import { Post } from '../../schema/Post'
import { CreateUserInput, UpdateUserInput, User, UserUniqueInput } from '../../schema/User'
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

  @Mutation(() => User)
  async updateProfile(@Arg('args') args: UpdateUserInput, @Ctx() ctx: Context): Promise<User> {
    return new UserService(ctx).updateProfile(args);
  }

  @Query(() => [User])
  async allUsers(@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany()
  }

  @Query(() => [Post], { nullable: true })
  async draftsByUser(
    @Arg('userUniqueInput') userUniqueInput: UserUniqueInput,
    @Ctx() ctx: Context,
  ) {
    return ctx.prisma.user
      .findUnique({
        where: {
          id: userUniqueInput.id || undefined,
          email: userUniqueInput.email || undefined,
        },
      })
      .posts({
        where: {
          published: false,
        },
      })
  }
}
