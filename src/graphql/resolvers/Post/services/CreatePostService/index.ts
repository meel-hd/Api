import { Context, context } from "../../../../../context";
import { CreatePostInput, Post } from "../../../../schema/Post";

/**
 * The service used by the `createPost` mutation to create a post.
 * @param ctx  the current mutation excution context.
 * @param args the data required to create a post.
 * @returns The created post if the operation was successffull.
 */
async function CreatePostService(ctx: Context, args: CreatePostInput): Promise<Post | null> {
    const author = await ctx.prisma.user.findUnique({ where: { id: context.user?.id } })
    .catch(()=> {
        return null
    });

    if (!author) {
        return null // Author not found
    }
    const createdPost = await ctx.prisma.post.create({
        data: {
            postType: args.postType,
            content: args.content,
            author: { connect: { id: author.id } }
        },
    })
    .catch(() => {
        return null
    })
    if (!createdPost) {
        return null // Failed to create post
    }
    return createdPost;
}

export default CreatePostService;[]