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

/** A type-graphql resolver for post related queries and mutations. */
@Resolver(Post)
export class PostResolver {
  /** A mutation to create a new posot */
  @Authorized()
  @Mutation(() => Post, {nullable: true})
  createPost(@Arg('args') args: CreatePostInput, @Ctx() ctx: Context): Promise<Post | null> {
    return new PostServices(ctx).createPost(args);
  }

  /** A Field resolver for the sub field author in the other mutations and queries. */
  @Authorized()
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

  /** A mutation to delete a post. */
  @Authorized()
  @Mutation(() => Post, { nullable: true })
  async deletePost(@Arg('id', () => ID) id: string, @Ctx() ctx: Context) {
    return new PostServices(ctx).deletePost(id);
  }

  /** A query to get a specific post data. */
  @Authorized()
  @Query(() => Post, { nullable: true })
  async postById(@Arg('id') id: string, @Ctx() ctx: Context) {
    return ctx.prisma.post.findUnique({
      where: { id },
    })
  }

  /** A mutation to increament post view count */
  @Authorized()
  @Mutation(() => Post, {nullable : true})
  async increamentPostViewCount(@Arg('postId') postId: string, @Ctx() ctx: Context): Promise<Post | null> {
    return new PostServices(ctx).increamentPostViewCount(postId);
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

}
