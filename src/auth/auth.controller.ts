import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from 'src/Users/user.service';
import { CreateUserDto } from 'src/Users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {}

    @Post('/register')
    async register(@Body() body: CreateUserDto) {
      console.log('Registering user with data:', body);
    return this.userService.createUser(body);
  }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Request() req) {
    return this.authService.login(req.user);
  }
}
