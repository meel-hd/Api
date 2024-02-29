import { Context } from "../../../../context";
import { CreatePostInput, Post } from "../../../schema/Post";
import CreatePostService from "./CreatePostService";
import DeletePostService from "./DeletePostService";
import IncrementPostViewCountService from "./IncreamentPostViewCountService";

/**
 * Exposes all `Post` related services and operations.
 */
class PostServices {
    conext: Context;
    constructor(context: Context) {
        this.conext = context
    }

    async createPost(args: CreatePostInput): Promise<Post | null> {
        return await CreatePostService(this.conext, args);
    }

    async deletePost(id: string): Promise<Post | null> {
        return await DeletePostService(this.conext, id);
    }

    async increamentPostViewCount(postId: string): Promise<Post | null> {
        return await IncrementPostViewCountService(this.conext, postId)
    }
}

export default PostServices;