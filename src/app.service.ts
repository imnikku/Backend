import { Injectable } from '@nestjs/common';
import { WinstonLogger } from './config/logger-config';
import { requestContextStore } from './shared/request/request-middleware';
import { AppConfigs } from './config/app-config';

@Injectable()
export class AppService {
  private readonly logger = new WinstonLogger(AppService.name);

  getHello() {
    let id = requestContextStore.getStore()?.get(AppConfigs.request_id)



    return { data: id }
  }


}
