import { Module, Global } from '@nestjs/common';
import { AppConfigs } from '../app-config';
import { RedisService } from './redis.service';
import { RedisConfigService } from './redis-confg';


@Global()
@Module({
    providers: [
        RedisService,
        RedisConfigService,

        {
            provide: AppConfigs.redis_client,
            useFactory: async (configService: RedisConfigService) => configService.createRedisClient(),
            inject: [RedisConfigService],
        },
        {
            provide: AppConfigs.redis_pub,
            useFactory: (configService: RedisConfigService) => configService.createRedisClient(),
            inject: [RedisConfigService],
        },
        {
            provide: AppConfigs.redis_sub,
            useFactory: (configService: RedisConfigService) => configService.createRedisClient(),
            inject: [RedisConfigService],
        },
    ],
    exports: [RedisService],
})
export class RedisModule { }
