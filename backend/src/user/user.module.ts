import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConfig } from 'src/jwt-config';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { PasswordService } from './services/password.service';
import { AuthController } from './contorllers/auth.controller';
import { UserController } from './contorllers/user.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtConfig,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController, UserController],
  providers: [UserService, PasswordService, AuthService],
  exports: [JwtModule],
})
export class UserModule {}
