import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/Users/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { SECRET } from 'constants/jwt-key';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from 'src/Users/user.module';
import { ProjectModule } from 'src/Projects/project.module';

@Module({
  imports: [PassportModule, JwtModule.register({
      secret: SECRET,
      signOptions: { expiresIn: '8hrs' },
    }),
    UserModule
    ,],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
