import 'reflect-metadata'
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import { User } from '../User'
import { PostType } from '@prisma/client'

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => String)
  content: string

  @Field(() => Int)
  viewCount: number

  @Field(() => Int)
  likesCount: number
  
  @Field(() => PostType)
  postType: PostType
  

  @Field(() => User, { nullable: true })
  author?: User | null

  @Field(() => String, { nullable: true })
  authorId?: string | null
}

@InputType()
export class CreatePostInput {
  @Field()
  content: string  
  
  @Field(() => PostType)
  postType: PostType
}

@InputType()
export class PostOrderByUpdatedAtInput {
  @Field(() => SortOrder)
  updatedAt: SortOrder
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}
