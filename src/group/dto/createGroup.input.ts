import {IsEmail, IsNotEmpty, MaxLength, MinLength} from 'class-validator'
import {Field, InputType} from 'type-graphql'

@InputType()
export class CreateGroupInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(30)
  name: string

  @Field()
  @IsNotEmpty()
  login: string

  @Field()
  @IsNotEmpty()
  @MinLength(30)
  description: string
}
