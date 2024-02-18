import { Context } from "../../../../context";
import { CreatePostInput, Post } from "../../../schema/Post";
import CreatePostService from "./CreatePostService";

class PostServices {
    conext: Context;
    constructor(context: Context) {
        this.conext = context
    }

    async createPost(args: CreatePostInput): Promise<Post> {
        return await CreatePostService(this.conext, args);
    }
}

export default PostServices;