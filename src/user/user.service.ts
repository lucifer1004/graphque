import {
  HttpService,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import {AxiosResponse} from 'axios'
import {catchError, map} from 'rxjs/operators'
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
    return await this.httpService
      .get(
        `${YUQUE_BASE_URL}/users/${login}`,
        this.configService.setRequestHeader(),
      )
      .pipe(
        map((res: AxiosResponse<YuqueUserData>) => res.data.data),
        catchError(() => {
          throw new NotFoundException(login)
        }),
      )
  }

  async getCurrentUser() {
    return await this.httpService
      .get(`${YUQUE_BASE_URL}/user`, this.configService.setRequestHeader())
      .pipe(
        map((res: AxiosResponse<YuqueUserData>) => res.data.data),
        catchError(() => {
          throw new UnauthorizedException()
        }),
      )
  }
}
