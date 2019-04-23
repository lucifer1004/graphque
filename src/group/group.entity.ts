import {Field, ID, Int, ObjectType} from 'type-graphql'

@ObjectType()
export class Group {
  @Field(type => ID)
  id: string

  @Field()
  type: string

  @Field(type => ID)
  space_id: string

  @Field(type => ID)
  owner_id: string

  @Field()
  login: string

  @Field()
  name: string

  @Field({nullable: true})
  description?: string

  @Field()
  avatar_url: string

  @Field()
  large_avatar_url: string

  @Field()
  medium_avatar_url: string

  @Field()
  small_avatar_url: string

  @Field(type => Int)
  books_count: number

  @Field(type => Int)
  public_books_count: number

  @Field(type => Int)
  topics_count: number

  @Field(type => Int)
  public_topics_count: number

  @Field(type => Int)
  members_count: number

  @Field(type => Int)
  public: number

  @Field()
  created_at: Date

  @Field()
  updated_at: Date

  @Field()
  _serializer: string
}
