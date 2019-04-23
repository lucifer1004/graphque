import {HttpModule, Module} from '@nestjs/common'
import {UserResolver} from './user.resolver'
import {UserService} from './user.service'

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
