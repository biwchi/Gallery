import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { UserService } from './user.service';
import { UserCreateDto } from '../dto/user/user.create.dto';
import { UserSignInDto } from '../dto/user/user.sign-in.dto';
import { User } from '../entities/user.entity';
import { TokenDto } from '../dto/token/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  public async login(dto: UserSignInDto) {
    return this.generateToken(await this.validateUser(dto));
  }

  public async register(dto: UserCreateDto) {
    const user = await this.userService.create(dto);

    return this.generateToken(user);
  }

  private generateToken(user: User): TokenDto {
    return {
      token: this.jwtService.sign({
        email: user.email,
        id: user.id,
      }),
    };
  }

  private async validateUser(dto: UserSignInDto) {
    const user = await this.userService.findOneByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Bad credentials');
    }

    if (
      this.passwordService.decrypt(user.password) === dto.password &&
      user.email === dto.email
    ) {
      return user;
    }

    throw new UnauthorizedException('Bad credentials');
  }
}
