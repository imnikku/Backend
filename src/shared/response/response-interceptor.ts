import { Injectable, NestInterceptor,ExecutionContext,CallHandler} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseWrapper } from './response.wrapper';
import { ResponseCodes } from './response.codes';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                if (data.code && data.message) return data
                return ResponseWrapper.success(ResponseCodes.SUCCESS, data?.message ?? 'Success', data?.data);
            }),
        );
    }
}
