import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm/repository/Repository";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()

export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async createUser(body: CreateUserDto){
        try{
            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hash(body.password, salt);

            const newUser = this.userRepository.create({
                name: body.name,
                password: hash,
                email: body.email
            });
            const {password, ...result} = newUser;
            return result;
        }catch(error){

        }
    }
    findUser(email: string){
        try{
            const user = this.userRepository.findOne({
                where: {
                    email: email
                    }
                })
            if(!user){ return null; } return user;
        }catch(error){
            throw new Error(`Error al buscardo el usuario: ${error.message}`);
        }
    }
}