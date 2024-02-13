import { Context } from "../../../../context";
import { CreateUserInput, UpdateUserInput, User } from "../../../schema/User";
import signupUserService from "./signupUser";
import updateUserProfileService from "./updateProfile";


export class UserService {
    context: Context;
    constructor(context: Context) {
        this.context = context;
    }
    async signupUser(args: CreateUserInput): Promise<boolean> {
        return signupUserService(this.context, args)
    }

    async updateProfile(args: UpdateUserInput): Promise<User> {
        return updateUserProfileService(this.context, args)
    }
}