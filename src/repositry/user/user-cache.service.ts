import { Injectable } from "@nestjs/common";
import { CacheKeyPrefixes } from "src/config/cache/cache-key-prefix";
import { RedisService } from "src/config/cache/redis.service";

@Injectable()
export class UserCacheService {

  constructor(
    private readonly cacheService: RedisService,
    ) { }

    async getAllUser(){
        return this.cacheService.get<string[]>(CacheKeyPrefixes.USER, CacheKeyPrefixes.ALL);
    }

    async getUserById(id:string){
        return this.cacheService.get<string[]>(CacheKeyPrefixes.USER,id);
    }
    async deleteUserById(id:string){
        return this.cacheService.del(CacheKeyPrefixes.USER,id)
    }
}