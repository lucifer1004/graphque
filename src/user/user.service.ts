import {HttpService, Injectable} from '@nestjs/common'
import {User} from './user.entity'
import {AxiosResponse} from 'axios'

const baseUrl = 'https://www.yuque.com/api/v2'
const httpConfig = {
  headers: {
    common: {
      'X-Auth-Token': '6s2xfDom6CRy5czH5mpyS0xQ3xuQgTBTP9KOIcYr',
    },
  },
}

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  async getUserByLogin(login): Promise<User> {
    let user: User
    // await axios
    //   .get(`${baseUrl}/users/${login}`, httpConfig)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))
    await this.httpService
      .get(`${baseUrl}/users/${login}`, httpConfig)
      .subscribe({
        next: (res: AxiosResponse<User>) => {
          console.log(res)
          user = res.data
        },
        error: err => {
          console.error(err)
        },
      })
    return user
  }
}
