import { IsEmail, Max, Min } from 'class-validator'
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { Post } from '../Post'

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field()
  @IsEmail()
  email: string

  @Field(() => String, { nullable: true })
  name?: string | null

  @Field(() => Number)
  @Min(1)
  @Max(40)
  profilePic: number

  @Field(() => String, { nullable: true })
  nickname?: string | null

  @Field(() => String, { nullable: true })
  bio?: string | null

  @Field(() => [Post], { nullable: true })
  posts?: [Post] | null
}

@InputType()
export class UserUniqueInput {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  email: string
}

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string
}
