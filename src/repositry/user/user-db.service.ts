import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/model/user.model";

export class userDbService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async getAllUser() {
        return this.userModel.find();
    }

    async getUserById(id: string) {
        return this.userModel.findById(id);
    }

    async deleteUserById(id:string){
        return this.userModel.findByIdAndDelete(id)
    }

    

}