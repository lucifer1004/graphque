import {Field, ID, ObjectType} from 'type-graphql'

@ObjectType()
export class User {
  @Field(type => ID)
  id: string

  @Field()
  type: string

  @Field()
  login: string

  @Field()
  name: string

  @Field({nullable: true})
  description?: string

  @Field()
  avatar_url: string

  @Field()
  created_at: Date

  @Field()
  updated_at: Date
}
