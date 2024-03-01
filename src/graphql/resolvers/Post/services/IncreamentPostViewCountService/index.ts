import { Context } from "../../../../../context";
import errorReporter from "../../../../../lib/error/reportError";
import { Post } from "../../../../schema/Post";

/**
 * A service to update the view count of a specific post.
 * 
 * @param ctx the current mutation excution context
 * @param postId the id of the post to update
 * @returns the updated `Post` if the operation was successfull, null otherwise.
 */
async function IncrementPostViewCountService(ctx: Context, postId: string): Promise<Post | null> {
    const postToUpdate = await ctx.prisma.post.findUnique({
        where: {
            id: postId
        }
    }).catch(err => {
        errorReporter(err, {
            message: "Invoke prisma.post.findUnique failed, where id: " + postId,
            sourceCaller: "IncrementPostViewCountService"
        });
        return null;
    });

    if (!postToUpdate) {
        return null; // Post to update doesn't exist
    }
    const updatedPost = ctx.prisma.post.update({
        data: {
            viewCount: {
                increment: 1,
            }
        },
        where: {
            id: postToUpdate.id
        }
    }).catch(err => {
        errorReporter(err, {
            message: "Invoke prisma.post.update to increament the view count failed, where id: " + postId,
            sourceCaller: "IncrementPostViewCountService"
        });
        return null;
    })

    if (!updatedPost) {
        return null; // Failed to update post
    }

    return updatedPost;

}

export default IncrementPostViewCountService;