import { Injectable } from '@nestjs/common';
import { WinstonLogger } from './config/logger-config';
import { requestContextStore } from './shared/request/request-middleware';
import { AppConfigs } from './config/app-config';
import { RedisService } from './config/cache/redis.service';

@Injectable()
export class AppService {

  getHello() {
    return 'Hello World!'
  }


}
