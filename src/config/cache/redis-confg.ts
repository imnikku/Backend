import { Injectable } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import { AppConfigs } from 'src/config/app-config';

@Injectable()
export class RedisConfigService {
  createRedisClient(): Redis {
    // const options: RedisOptions = {

    // // ✅ Connection Details
    //   host: AppConfigs.redis_host,
    //   port: AppConfigs.redis_port,
    //   password: AppConfigs.redis_password,
    //   username: AppConfigs.redis_user,
    //   db: AppConfigs.redis_db,

    // // ✅ Connection Retry Logic
    //   connectTimeout:AppConfigs.redis_connection_timeout,
    //   keepAlive: AppConfigs.redis_keep_alive,
    //   retryStrategy: (times) => {
    //     if (times > AppConfigs.redis_max_retry) {
    //       return null
    //     }
    //     const delay = Math.min(times * 3000, AppConfigs.redis_connection_timeout);
    //     return delay;
    //   },
    // };
    // return new Redis(options)
    return new Redis(AppConfigs.redis_url, {
      connectTimeout: AppConfigs.redis_connection_timeout,
      keepAlive: AppConfigs.redis_keep_alive,
      retryStrategy: (times) => {
        if (times > AppConfigs.redis_max_retry) {
          return null
        }
        const delay = Math.min(times * 3000, AppConfigs.redis_connection_timeout);
        return delay;
      },
    });
  }
}
