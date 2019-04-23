import {HttpService} from '@nestjs/common'
import {User} from './user.entity'
export declare class UserService {
  private readonly httpService
  constructor(httpService: HttpService)
  getUserByLogin(login: any): Promise<User>
}
