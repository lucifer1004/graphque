import {NotFoundException, UnauthorizedException} from '@nestjs/common'
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import {CreateGroupInput} from './dto/createGroup.input'
import {Group} from './group.entity'
import {GroupService} from './group.service'

@Resolver(of => Group)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Query(returns => [Group])
  async groups(@Args('login') login: string) {
    const groups = await this.groupService.getUserJoinedGroups(login)
    if (!groups) {
      throw new NotFoundException(login)
    }
    return groups
  }

  @Query(returns => [Group])
  async allGroups() {
    const groups = await this.groupService.getAllPublicGroups()
    if (!groups) {
      throw new UnauthorizedException()
    }
    return groups
  }

  @Mutation(returns => Group)
  async createGroup(@Args('newGroup') newGroup: CreateGroupInput) {
    return await this.groupService.createGroup({
      name: newGroup.name,
      login: newGroup.login,
      description: newGroup.description,
    })
  }
}
