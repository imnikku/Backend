import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { AppConfigs } from '../app-config';


@Injectable()
export class RedisService implements OnModuleInit {
  constructor(
    @Inject(AppConfigs.redis_client) private readonly client: Redis,
    @Inject(AppConfigs.redis_pub) private readonly publisher: Redis,
    @Inject(AppConfigs.redis_sub) private readonly subscriber: Redis,
  ) {}

   public generateKey(type: string, id: string): string {
    const environment = AppConfigs.redis_cache_environment;
    const appname = AppConfigs.app_name;
    return `{${appname}:${environment}}:${type}:${id}`;
  }

  // ------------------ CACHE METHODS ------------------

  async get<T = any>(type:string, id: string): Promise<T | null> {
    const key=this.generateKey(type,id)
    const result = await this.client.get(key);
    return result ? JSON.parse(result) : null;
  }

  async set<T = any>(type: string,id:string, value: T, ttlSeconds = 60): Promise<void> {
    const key=this.generateKey(type,id)
    await this.client.set(key, JSON.stringify(value), 'EX', ttlSeconds);
  }

  async del(type: string,id:string): Promise<void> {
    const key=this.generateKey(type,id)
    await this.client.del(key);
  }

  async exists(type: string,id:string): Promise<boolean> {
    const key=this.generateKey(type,id)
    return (await this.client.exists(key)) === 1;
  }

  // ------------------ PUB/SUB METHODS ------------------

  async publish(channel: string, message: string | object): Promise<void> {
    const payload = typeof message === 'string' ? message : JSON.stringify(message);
    await this.publisher.publish(channel, payload);
  }

  subscribe(channel: string, handler: (message: string) => void): void {
    this.subscriber.subscribe(channel);
    this.subscriber.on('message', (chan, msg) => {
      if (chan === channel) {
        handler(msg);
      }
    });
  }

  // ------------------ INIT ------------------

  onModuleInit() {
    // Optional example subscription

    this.set('user','1',{data:'nitesh'})
    this.subscribe('system:logs', (msg) => {
      console.log(`[Redis PUBSUB] system:logs ->`, msg);
    });
  }
}
