import {User} from './user.entity'
import {UserService} from './user.service'
export declare class UserResolver {
  private readonly userService
  constructor(userService: UserService)
  user(login: string): Promise<User>
}
