import {NotFoundException} from '@nestjs/common'
import {Args, Query, Resolver} from '@nestjs/graphql'
import {User} from './user.entity'
import {UserService} from './user.service'

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => String)
  async hello() {
    return 'Hello GraphQL'
  }

  @Query(returns => User)
  async user(@Args('login') login: string) {
    const user = await this.userService.getUserByLogin(login)
    if (!user) {
      throw new NotFoundException(login)
    }
    return user
  }
}
