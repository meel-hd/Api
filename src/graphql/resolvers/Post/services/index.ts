import { Context } from "../../../../context";
import { CreatePostInput, Post } from "../../../schema/Post";
import CreatePostService from "./CreatePostService";
import DeletePostService from "./DeletePostService";

class PostServices {
    conext: Context;
    constructor(context: Context) {
        this.conext = context
    }

    async createPost(args: CreatePostInput): Promise<Post> {
        return await CreatePostService(this.conext, args);
    }

    async deletePost(id: string): Promise<Post | null> {
        return await DeletePostService(this.conext, id);
    }
}

export default PostServices;