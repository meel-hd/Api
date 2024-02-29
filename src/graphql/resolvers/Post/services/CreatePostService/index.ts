import { Context } from "../../../../../context";
import { CreatePostInput, Post } from "../../../../schema/Post";

/**
 * The service used by the `createPost` mutation to create a post.
 * @param ctx  the current mutation excution context.
 * @param args the data required to create a post.
 * @returns The created post if the operation was successffull.
 * TODO: instead of throwing an error on failure, return null.
 */
async function CreatePostService(ctx: Context, args: CreatePostInput): Promise<Post> {
    if(args.authorId !== ctx.user?.id){
        throw Error("Error:1010") // Forbidden
    }
    const author = await ctx.prisma.user.findUnique({ where: { id: args.authorId } })
    if (!author) {
        throw Error("Error:1011") // Author not found
    }
    const createdPost = await ctx.prisma.post.create({
        data: {
            postType: args.postType,
            content: args.content,
            author: { connect: { id: args.authorId } }
        },
    })
    if (!createdPost) {
        throw Error("Error:1012") // Failed to create post
    }
    return createdPost;
}

export default CreatePostService;[]