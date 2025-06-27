import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongoDbDatabaseModule } from './config/mongdb/mongodb.module';
import { RedisModule } from './config/cache/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    // MongoDbDatabaseModule, //✅ If using mongodb database 
    // RedisModule, //✅ If using cache database
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
