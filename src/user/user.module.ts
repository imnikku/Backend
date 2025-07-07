import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepositoryModule } from 'src/repositry/user/user.module';
import { UserRepositoryService } from 'src/repositry/user/user-repository.service';

@Module({
  imports:[UserRepositoryModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
