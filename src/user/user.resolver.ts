import {NotFoundException, UnauthorizedException} from '@nestjs/common'
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

  @Query(returns => User)
  async me() {
    const user = await this.userService.getCurrentUser()
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
