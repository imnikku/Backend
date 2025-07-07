import { Injectable } from '@nestjs/common';
import { UserRepositoryService } from 'src/repositry/user/user-repository.service';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository:UserRepositoryService,
    ){}

    getAllUser(){
return this.userRepository.getAllUser()
    }
}
