import { Context } from "../../../../../context";
import { Post } from "../../../../schema/Post";

/**
 * A service used by `deletePost` mutation to delete a post.
 * 
 * @param ctx The mutation excution context.
 * @param postId The id of the post to delete.
 * @returns the deleted post data if the operation was successfull, `null` if it failed.
 */
async function DeletePostService(ctx: Context, postId: string): Promise<Post | null> {
    let deletedPost = await ctx.prisma.post.delete({
        where: {
            id: postId,
            authorId: ctx.user?.id // The user is the post creator
        }
    }).catch(() => {
        return null;
    })

    if (!deletedPost) {
        return null;
    }

    return deletedPost;
}

export default DeletePostService;