import { Field, ID, InputType, Int, ObjectType } from "type-graphql";

@InputType()
export class confirmSignupInput {
    @Field(() => ID)
    userId: string

    @Field(() => Int)
    token: number
}

export enum ConfirmSignupErrorMessage {
    SUCCESSFULL,
    INVALID_TOKEN,
    EXPIRED_TOKEN
}

@ObjectType()
export class confirmSignupOutput {
    @Field(() => Boolean)
    successful: boolean

    @Field(() => ConfirmSignupErrorMessage)
    message: ConfirmSignupErrorMessage
}