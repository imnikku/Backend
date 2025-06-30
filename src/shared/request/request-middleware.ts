import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AsyncLocalStorage } from 'async_hooks';
import { v4 as uuidv4 } from 'uuid';
// import { JWTHelperService } from 'src/auth/jwthelper/jwthelper.service';
import { AppConfigs } from 'src/config/app-config';
import { UniqueKeyGeneration } from '../utilities/db-key-modifier';

export const requestContextStore = new AsyncLocalStorage<Map<string, any>>();

@Injectable()
export class RequestMiddleware implements NestMiddleware {
//   constructor(private readonly jwtHelper: JWTHelperService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const requestId=UniqueKeyGeneration()
    const store = new Map<string, any>();
    
    store.set(AppConfigs.request_id, requestId);
   
    requestContextStore.run(store, () => {
      next();
    });
  }
}
