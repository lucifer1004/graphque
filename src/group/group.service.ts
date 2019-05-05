import {HttpService, Injectable, Logger} from '@nestjs/common'
import {AxiosResponse} from 'axios'
import {of} from 'rxjs'
import {catchError, map} from 'rxjs/operators'
import {YUQUE_BASE_URL} from '../common/constants'
import {ConfigService} from '../config/config.service'
import {Group} from './group.entity'
import {YuqueGroupData, YuqueUserData} from '../interfaces/yuque.interface'
import {CreateGroupInput} from './dto/createGroup.input'
import {UpdateGroupInput} from './dto/updateGroup.input'

@Injectable()
export class GroupService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getUserJoinedGroups(userLogin: string) {
    return await this.httpService
      .get(
        `${YUQUE_BASE_URL}/users/${userLogin}/groups`,
        this.configService.setRequestHeader(),
      )
      .pipe(
        map((res: AxiosResponse<YuqueGroupData>) => res.data.data),
        catchError(() => {
          Logger.warn(
            `No groups found for user "${userLogin}".`,
            'GroupService',
          )
          return of(new Array<Group>())
        }),
      )
  }

  async getAllPublicGroups() {
    return await this.httpService
      .get(`${YUQUE_BASE_URL}/groups`, this.configService.setRequestHeader())
      .pipe(map((res: AxiosResponse<YuqueGroupData>) => res.data.data))
  }

  async createGroup(newGroup: CreateGroupInput) {
    return await this.httpService
      .post(
        `${YUQUE_BASE_URL}/groups`,
        newGroup,
        this.configService.setRequestHeader(),
      )
      .pipe(map((res: AxiosResponse<YuqueUserData>) => res.data.data))
  }

  async getGroup(groupLogin: string) {
    return await this.httpService
      .get(
        `${YUQUE_BASE_URL}/groups/${groupLogin}`,
        this.configService.setRequestHeader(),
      )
      .pipe(
        map((res: AxiosResponse<YuqueGroupData>) => res.data.data),
        catchError(() => {
          Logger.warn(`Group ${groupLogin} is not found.`, 'GroupService')
          return of(Group)
        }),
      )
  }

  async updateGroup(groupLogin: string, newGroup: UpdateGroupInput) {
    return await this.httpService
      .put(
        `${YUQUE_BASE_URL}/groups/${groupLogin}`,
        newGroup,
        this.configService.setRequestHeader(),
      )
      .pipe(
        map((res: AxiosResponse<YuqueGroupData>) => res.data.data),
        catchError(() => {
          Logger.warn(`Group ${groupLogin} is not found.`, 'GroupService')
          return of(Group)
        }),
      )
  }

  async deleteGroup(groupLogin: string) {
    return await this.httpService
      .delete(
        `${YUQUE_BASE_URL}/groups/${groupLogin}`,
        this.configService.setRequestHeader(),
      )
      .pipe(map((res: AxiosResponse<YuqueUserData>) => res.data.data))
  }
}
