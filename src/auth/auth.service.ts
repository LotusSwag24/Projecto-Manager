import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from 'src/Users/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        try{
            const user = await this.userService.findUser(email);
            if(!user) return null;
            const matchResult = await bcrypt.compare(password, user?.password ?? "");
            if(user && matchResult){
                const {password, ...result} = user;
                return result;
            }
            return null;
        }catch(error){
            if(error instanceof Error) throw new InternalServerErrorException(error.message);
    }
}
    login(user: UserEntity) {
    const payload = { email: user.email, sub: user.id, roleId: user.roleId, roleName: user.role?.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
