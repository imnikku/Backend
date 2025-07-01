import { Injectable } from '@nestjs/common';
import { WinstonLogger } from './config/logger-config';
import { requestContextStore } from './shared/request/request-middleware';
import { AppConfigs } from './config/app-config';
import { RedisService } from './config/cache/redis.service';

@Injectable()
export class AppService {
  private readonly logger = new WinstonLogger(AppService.name);
  constructor(private readonly redisService:RedisService){}

  getHello(data:any) {
    let id = requestContextStore.getStore()?.get(AppConfigs.request_id)
    console.log(data)
this.redisService.publish('test',data)


    return { data: id }
  }


}
