import { Context } from "../../../../../context";
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
        return null;
    })

    if (!updatedPost) {
        return null; // Failed to update post
    }

    return updatedPost;

}

export default IncrementPostViewCountService;