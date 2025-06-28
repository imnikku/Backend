import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseCodes } from 'src/shared/response/response.codes';
import { ResponseWrapper } from 'src/shared/response/response.wrapper';
import { keyModifier } from 'src/shared/utilities/db-key-modifier';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // ✅ Default to 500 unless it's an HttpException
    const status =exception instanceof HttpException? exception.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;

    // ✅ Try to get a consistent structure for the response body
    const responseBody =exception instanceof HttpException ? exception.getResponse() : exception;


    // ✅ Mongo duplicate key error
    if (responseBody?.code === 11000 && responseBody?.keyPattern) {
      const key = Object.keys(responseBody.keyPattern)[0];
      return response.status(HttpStatus.CONFLICT).json(ResponseWrapper.error(ResponseCodes.ALREADY_EXISTS,`${keyModifier(key)} already exists`, null));
    }

    // ✅ Mongoose validation error
    if (responseBody?.errors && typeof responseBody.errors === 'object') {
      const key = Object.keys(responseBody.errors)[0];
      return response.status(HttpStatus.BAD_REQUEST).json(ResponseWrapper.error(ResponseCodes.INVALID_INPUT,`${keyModifier(key)} is required.`,null));
    }

    // ✅ Extract message safely
    const message =typeof responseBody?.message === 'string'? responseBody.message: Array.isArray(responseBody?.message)? responseBody.message[0]: exception.message || 'Internal server error';

    return response.status(status).json(ResponseWrapper.error(ResponseCodes.ERROR, message, null));
  }
}
