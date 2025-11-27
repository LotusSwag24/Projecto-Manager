import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from 'src/Users/dto/create-user.dto';
import { UserService } from 'src/Users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(body: CreateUserDto){
        try{
            const user = await this.userService.findUser(body.email);
            const matchResult = await bcrypt.compare(body.password, user?.password ?? "");
            if(user && matchResult){
                const {password, ...result} = user;
                return result;
            }
            return null;
        }catch(error){
            if(error instanceof Error) throw new InternalServerErrorException(error.message);
    }
}
}
