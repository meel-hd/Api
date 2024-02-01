import { IsEmail } from 'class-validator'
import 'reflect-metadata'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { Post, PostCreateInput } from '../Post'

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field()
  @IsEmail()
  email: string

  @Field(() => String, { nullable: true })
  name?: string | null

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
export class UserCreateInput {
  @Field()
  email: string

  @Field({ nullable: true })
  name: string

  @Field(() => [PostCreateInput], { nullable: true })
  posts: [PostCreateInput]
}
