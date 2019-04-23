import {HttpService, Injectable, Logger} from '@nestjs/common'
import {AxiosResponse} from 'axios'
import {map} from 'rxjs/operators'
import {YUQUE_BASE_URL} from '../common/constants'
import {ConfigService} from '../config/config.service'
import {YuqueUserData} from '../interfaces/yuque.interface'

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getUserByLogin(login: string) {
    const httpConfig = {
      headers: {
        'X-Auth-Token': this.configService.get('YUQUE_API_TOKEN'),
        'content-type': 'application/json',
      },
    }
    return await this.httpService
      .get(`${YUQUE_BASE_URL}/users/${login}`, httpConfig)
      .pipe(
        map((res: AxiosResponse<YuqueUserData>) => {
          Logger.log(res.data)
          return res.data.data
        }),
      )
  }
}
