import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { error } from 'console';
import { Http } from 'winston/lib/winston/transports';
import { CustomException } from './shared/exception/custome-exception';
import { ResponseWrapper } from './shared/response/response.wrapper';
import { ResponseCodes } from './shared/response/response.codes';

@Injectable()
export class AppService {
  getHello() {
 return ResponseWrapper.error(ResponseCodes.ERROR,'not found')
  }


}
