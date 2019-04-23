import {HttpService, Injectable, Logger} from '@nestjs/common'
import {AxiosResponse} from 'axios'
import {map} from 'rxjs/operators'
import {YUQUE_BASE_URL} from '../common/constants'
import {ConfigService} from '../config/config.service'
import {YuqueUserData} from '../interfaces/yuque.interface'
import {read} from 'fs'

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  setRequestHeader() {
    return {
      headers: {
        'X-Auth-Token': this.configService.get('YUQUE_API_TOKEN'),
        'content-type': 'application/json',
      },
    }
  }

  async getUserByLogin(login: string) {
    return await this.httpService
      .get(`${YUQUE_BASE_URL}/users/${login}`, this.setRequestHeader())
      .pipe(map((res: AxiosResponse<YuqueUserData>) => res.data.data))
  }

  async getCurrentUser() {
    return await this.httpService
      .get(`${YUQUE_BASE_URL}/user`, this.setRequestHeader())
      .pipe(map((res: AxiosResponse<YuqueUserData>) => res.data.data))
  }
}
