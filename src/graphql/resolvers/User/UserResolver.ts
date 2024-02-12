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
import { CreateUserInput, User, UserUniqueInput } from '../../schema/User'
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
  async signupUser(@Arg('data') data: CreateUserInput, @Ctx() ctx: Context,): Promise<Boolean> {
    return new UserService(ctx).signupUser(data)
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
