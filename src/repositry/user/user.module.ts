import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/model/user.model';
import { UserCacheService } from './user-cache.service';
import { userDbService } from './user-db.service';
import { UserRepositoryService } from './user-repository.service';


@Module({
    imports: [
        // ✅ If Using mongodb 
        MongooseModule.forFeature(
            [
                { name: User.name, schema: UserSchema }
            ]
        )
    ],
    providers: [UserCacheService, userDbService,UserRepositoryService],
    exports:[UserRepositoryService]
})
export class UserRepositoryModule { }
