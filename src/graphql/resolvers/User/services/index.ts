import { randomInt } from "crypto";
import { Context } from "../../../../context";
import { CreateUserInput, UpdateUserInput, User } from "../../../schema/User";
import updateUserProfileService from "./updateProfile";


export class UserService {
    context: Context;
    constructor(context: Context) {
        this.context = context;
    }
    /** Signs up a user by email
     *  if the user doesn't exist it creates it,
     *  then, and if the user exist it creates a verifecation token
     *  and send it to the user email.
     *  @returns a boolean if operation was successful, false otherwise.
     */
    async signupUser(args: CreateUserInput): Promise<boolean> {
        let createdUser = await this.context.prisma.user.findUnique({ where: { email: args.email } })
        // New user
        if (createdUser == null) {
            createdUser = await this.context.prisma.user.create({ data: { email: args.email } })
            if (createdUser == null) {
                return false;
            }
        }else {
            // Delete old verification tokens
            await this.context.prisma.verification_Token.deleteMany({
                where: {
                    targetUserId: createdUser.id
                }
            })
        }
        // Create a 6 integer long verefication token
        const token = randomInt(100000, 999999);
        const verification_token = await this.context.prisma.verification_Token.create({
            data: {
                targetUserId: createdUser.id,
                expired: false,
                token,
            }
        });
        if(verification_token == null){
            return false;
        }

        // TODO: Send email to the user with the verification token

        // Successfull
        return true;
    }

    async updateProfile(args:UpdateUserInput): Promise<User>{
        return updateUserProfileService(this.context,args)
    }
}