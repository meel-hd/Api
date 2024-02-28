import { Context } from "../../../../context";
import { CreateUserInput, UpdateMyProfileInput, User } from "../../../schema/User";
import getUserService from "./getUser";
import meService from "./me";
import signupUserService from "./signupUser";
import confirmSignupService from "./signupUser/confirmSignup";
import { confirmSignupInput, confirmSignupOutput } from "./types";
import updateMyProfileService from "./updateMyProfile";

/**
 * Exposes all `User` related services and operations.
 */
export class UserService {
    context: Context;
    constructor(context: Context) {
        this.context = context;
    }
    async me(): Promise<User | null> {
        return meService(this.context);
    }
    async signupUser(args: CreateUserInput): Promise<User> {
        return signupUserService(this.context, args)
    }

    async confirmSignup(args: confirmSignupInput): Promise<confirmSignupOutput> {
        return confirmSignupService(this.context, args);
    }

    async updateMyProfile(args: UpdateMyProfileInput): Promise<User> {
        return updateMyProfileService(this.context, args)
    }

    async getUser(userId: string): Promise<User | null> {
        return getUserService(this.context, userId);
    }
}