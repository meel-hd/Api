import 'reflect-metadata'
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Context } from '../../../context'
import { CreatePostInput, Post, PostOrderByUpdatedAtInput } from '../../schema/Post'
import { User } from '../../schema/User'
import PostServices from './services'


@Resolver(Post)
export class PostResolver {

  @Authorized()
  @Mutation(() => Post)
  createPost(@Arg('args') args: CreatePostInput, @Ctx() ctx: Context): Promise<Post> {
    return new PostServices(ctx).createPost(args);
  }

  @FieldResolver()
  author(@Root() post: Post, @Ctx() ctx: Context): Promise<User | null> {
    return ctx.prisma.post
      .findUnique({
        where: {
          id: post.id,
        },
      })
      .author()
  }

  @Query(() => Post, { nullable: true })
  async postById(@Arg('id') id: string, @Ctx() ctx: Context) {
    return ctx.prisma.post.findUnique({
      where: { id },
    })
  }

  @Query(() => [Post])
  async feed(
    @Arg('searchString', { nullable: true }) searchString: string,
    @Arg('skip', () => Int, { nullable: true }) skip: number,
    @Arg('take', () => Int, { nullable: true }) take: number,
    @Arg('orderBy', { nullable: true }) orderBy: PostOrderByUpdatedAtInput,
    @Ctx() ctx: Context,
  ) {
    const or = searchString
      ? {
        OR: [
          { title: { contains: searchString } },
          { content: { contains: searchString } },
        ],
      }
      : {}

    return ctx.prisma.post.findMany({
      where: {
        // published: true,
        ...or,
      },
      take: take || undefined,
      skip: skip || undefined,
      orderBy: orderBy || undefined,
    })
  }



  @Mutation((returns) => Post, { nullable: true })
  async deletePost(@Arg('id', () => ID) id: string, @Ctx() ctx: Context) {
    return ctx.prisma.post.delete({
      where: {
        id,
      },
    })
  }
}
