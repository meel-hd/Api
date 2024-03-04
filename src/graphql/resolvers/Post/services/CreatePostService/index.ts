import { Context } from "../../../../../context";
import errorReporter from "../../../../../lib/error/reportError";
import { CreatePostInput, Post } from "../../../../schema/Post";

/**
 * The service used by the `createPost` mutation to create a post.
 * @param context  the current mutation excution context.
 * @param args the data required to create a post.
 * @returns The created post if the operation was successffull.
 */
async function CreatePostService(context: Context, args: CreatePostInput): Promise<Post | null> {
    const author = await context.prisma.user.findUnique({ where: { id: context.user?.id } })
        .catch((err) => {
            errorReporter(err, {
                message: "Invoke prisma.user.findUnique failed, where id: " + context.user?.id,
                sourceCaller: "CreatePostService"
            });
            return null
        });
    if (!author) {
        return null // Author not found
    }

    const createdPost = await context.prisma.post.create({
        data: {
            postType: args.postType,
            content: args.content,
            author: { connect: { id: author.id } }
        },
    })
        .catch((err) => {
            errorReporter(err, {
                message: "Invoke prisma.user.create failed, where the post input is: " + args,
                sourceCaller: "CreatePostService"
            });
            return null
        })
    if (!createdPost) {
        return null // Failed to create post
    }
    return createdPost;
}

export default CreatePostService;[]