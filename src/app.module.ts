import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongoDbDatabaseModule } from './config/mongdb/mongodb.module';
import { RedisModule } from './config/cache/redis.module';
import { UserModule } from './user/user.module';
import { RequestMiddleware } from './shared/request/request-middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    MongoDbDatabaseModule, //✅ If using mongodb database 
    RedisModule, //✅ If using cache database

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('*')
  }

}
