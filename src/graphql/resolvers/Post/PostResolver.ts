import 'reflect-metadata'
import {
  Arg,
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
import { Post, PostCreateInput, PostOrderByUpdatedAtInput } from '../../schema/Post'
import { User } from '../../schema/User'


@Resolver(Post)
export class PostResolver {
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
        published: true,
        ...or,
      },
      take: take || undefined,
      skip: skip || undefined,
      orderBy: orderBy || undefined,
    })
  }

  @Mutation(() => Post)
  async createDraft(
    @Arg('data') data: PostCreateInput,
    @Arg('authorEmail') authorEmail: string,

    @Ctx() ctx: Context,
  ) {
    return ctx.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        author: {
          connect: { email: authorEmail },
        },
      },
    })
  }

  @Mutation(() => Post, { nullable: true })
  async togglePublishPost(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context,
  ) {
    const post = await ctx.prisma.post.findUnique({
      where: { id: id || undefined },
      select: {
        published: true,
      },
    })

    return ctx.prisma.post.update({
      where: { id: id || undefined },
      data: { published: !post?.published },
    })
  }

  @Mutation(() => Post, { nullable: true })
  async incrementPostViewCount(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context,
  ) {
    return ctx.prisma.post.update({
      where: { id: id || undefined },
      data: {
        viewCount: {
          increment: 1,
        },
      },
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
