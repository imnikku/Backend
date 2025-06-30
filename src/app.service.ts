import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { error } from 'console';
import { Http } from 'winston/lib/winston/transports';
import { CustomException } from './shared/exception/custome-exception';
import { ResponseWrapper } from './shared/response/response.wrapper';
import { ResponseCodes } from './shared/response/response.codes';
import { UniqueKeyGeneration } from './shared/utilities/db-key-modifier';
import { WinstonLogger } from './config/logger-config';
import { requestContextStore } from './shared/request/request-middleware';
import { AppConfigs } from './config/app-config';

@Injectable()
export class AppService {
  private readonly logger = new WinstonLogger(AppService.name);

  getHello() {
let id= requestContextStore.getStore()?.get(AppConfigs.request_id)



 return {data:id}
  }


}
