import {HttpService, Injectable} from '@nestjs/common'
import {AxiosResponse} from 'axios'
import * as dotenv from 'dotenv'
import {map} from 'rxjs/operators'
import {YUQUE_BASE_URL} from '../common/constants'
import {YuqueUserData} from '../interfaces/yuque.interface'

dotenv.config()
const baseUrl = YUQUE_BASE_URL
const httpConfig = {
  headers: {
    'X-Auth-Token': process.env.YUQUE_API_TOKEN,
    'content-type': 'application/json',
  },
}

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  async getUserByLogin(login: string) {
    return await this.httpService
      .get(`${baseUrl}/users/${login}`, httpConfig)
      .pipe(map((res: AxiosResponse<YuqueUserData>) => res.data.data))
  }
}
