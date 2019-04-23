import {HttpModule, Module} from '@nestjs/common'
import {ConfigModule} from '../config/config.module'
import {UserResolver} from './user.resolver'
import {UserService} from './user.service'

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
