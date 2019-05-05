import {MaxLength, MinLength} from 'class-validator'
import {Field, InputType} from 'type-graphql'

@InputType()
export class UpdateGroupInput {
  @Field({nullable: true})
  @MaxLength(30)
  name: string

  @Field({nullable: true})
  login: string

  @Field({nullable: true})
  @MinLength(30)
  description: string
}
