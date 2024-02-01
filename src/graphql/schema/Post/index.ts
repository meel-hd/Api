import 'reflect-metadata'
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import { User } from '../User'

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field()
  title: string

  @Field(() => String, { nullable: true })
  content: string | null

  @Field(() => Boolean)
  published: boolean

  @Field(() => Int)
  viewCount: number

  @Field(() => User, { nullable: true })
  author?: User | null

  @Field(() => String, { nullable: true })
  authorId?: string | null
}

@InputType()
export class PostCreateInput {
  @Field()
  title: string

  @Field({ nullable: true })
  content: string
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
