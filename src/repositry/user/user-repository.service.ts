import { Injectable } from "@nestjs/common";
import { userDbService } from "./user-db.service";
import { UserCacheService } from "./user-cache.service";

@Injectable()
export class UserRepositoryService {

    constructor(
        private readonly userCacheService: UserCacheService,
        private readonly userDbService: userDbService,

    ) { }

    async getAllUser() {
        let allUser: any = await this.userCacheService.getAllUser()
        if (!allUser?.length) {
            allUser = await this.userDbService.getAllUser()
        }
        return allUser;
    }

    async getUserById(id: string) {
        let user: any = await this.userCacheService.getUserById(id);
        if (!user) {
            user = await this.userDbService.getUserById(id)
        }
        return user;
    }
}