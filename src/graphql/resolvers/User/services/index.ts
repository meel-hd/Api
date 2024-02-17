import { Context } from "../../../../context";
import { CreateUserInput, UpdateMyProfileInput, User } from "../../../schema/User";
import getUserService from "./getUser";
import signupUserService from "./signupUser";
import updateMyProfileService from "./updateMyProfile";


export class UserService {
    context: Context;
    constructor(context: Context) {
        this.context = context;
    }
    async signupUser(args: CreateUserInput): Promise<boolean> {
        return signupUserService(this.context, args)
    }

    async updateMyProfile(args: UpdateMyProfileInput): Promise<User> {
        return updateMyProfileService(this.context, args)
    }

    async getUser(userId: string): Promise<User | null> {
        return getUserService(this.context, userId);
    }
}