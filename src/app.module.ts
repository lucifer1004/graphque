import {Module} from '@nestjs/common'
import {GraphQLModule} from '@nestjs/graphql'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {ConfigModule} from './config/config.module'
import {UserModule} from './user/user.module'
import {GroupModule} from './group/group.module'

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
    UserModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
