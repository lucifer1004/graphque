import {Resolver, Query, Arg} from 'type-graphql'
import {User} from './user.entity'
import {UserService} from './user.service'

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User, {nullable: true})
  async user(@Arg('login') login: string): Promise<User> {
    return await this.userService.getUserByLogin(login)
  }
}
