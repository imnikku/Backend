import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { error } from 'console';
import { Http } from 'winston/lib/winston/transports';
import { CustomException } from './shared/exception/custome-exception';
import { ResponseWrapper } from './shared/response/response.wrapper';
import { ResponseCodes } from './shared/response/response.codes';
import { UniqueKeyGeneration } from './shared/utilities/db-key-modifier';
import { WinstonLogger } from './config/logger-config';

@Injectable()
export class AppService {
  private readonly logger = new WinstonLogger(AppService.name);

  getHello() {
this.logger.error('test')
// this.logger.log('check','test')
this.logger.info('test')
this.logger.notice('test')



 return {data:UniqueKeyGeneration()}
  }


}
