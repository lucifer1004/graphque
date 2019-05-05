import {NotFoundException, UnauthorizedException} from '@nestjs/common'
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import {CreateGroupInput} from './dto/createGroup.input'
import {UpdateGroupInput} from './dto/updateGroup.input'
import {Group} from './group.entity'
import {GroupService} from './group.service'

@Resolver(of => Group)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Query(returns => Group)
  async group(@Args('groupLogin') groupLogin: string) {
    const group = await this.groupService.getGroup(groupLogin)
    if (!group) {
      throw new NotFoundException(groupLogin)
    }
    return group
  }

  @Query(returns => [Group])
  async groups(@Args('userLogin') userLogin: string) {
    const groups = await this.groupService.getUserJoinedGroups(userLogin)
    if (!groups) {
      throw new NotFoundException(userLogin)
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
    return await this.groupService.createGroup(newGroup)
  }

  @Mutation(returns => Group)
  async updateGroup(
    @Args('groupLogin') groupLogin: string,
    @Args('newGroup') newGroup: UpdateGroupInput,
  ) {
    return await this.groupService.updateGroup(groupLogin, newGroup)
  }

  @Mutation(returns => Group)
  async deleteGroup(@Args('groupLogin') groupLogin: string) {
    return await this.groupService.deleteGroup(groupLogin)
  }
}
