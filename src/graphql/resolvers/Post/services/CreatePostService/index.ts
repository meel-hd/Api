import { Context } from "../../../../../context";
import { CreatePostInput, Post } from "../../../../schema/Post";

async function CreatePostService(ctx: Context, args: CreatePostInput): Promise<Post> {
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