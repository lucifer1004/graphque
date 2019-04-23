import {HttpModule, Module} from '@nestjs/common'
import {ConfigModule} from '../config/config.module'
import {GroupResolver} from './group.resolver'
import {GroupService} from './group.service'

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [GroupResolver, GroupService],
})
export class GroupModule {}
