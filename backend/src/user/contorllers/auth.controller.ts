import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { TokenInfoDto } from '../dto/token/token-info.dto.';
import { TokenDto } from '../dto/token/token.dto';
import { UserCreateDto } from '../dto/user/user.create.dto';
import { UserSignInDto } from '../dto/user/user.sign-in.dto';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { ExtractUser } from '../decorators/user.decoratr';
import { RefreshTokenDto } from '../dto/token/refresh-token.dto';
import { AccessToken } from '../dto/token/asccess-token.dto';

@Controller('user/auth')
@ApiTags('User authentification')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: 'User`s sign in',
  })
  @ApiResponse({
    type: TokenDto,
    description: 'Bearer token',
    status: 200,
  })
  public async login(@Body() dto: UserSignInDto): Promise<TokenDto> {
    return await this.authService.login(dto);
  }

  @Post('/registration')
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: 'User`s sign up',
  })
  @ApiResponse({
    type: TokenDto,
    description: 'Bearer token',
    status: 201,
  })
  public async registration(@Body() dto: UserCreateDto): Promise<TokenDto> {
    return await this.authService.register(dto);
  }

  @Post('/profile')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Information about current user',
  })
  @ApiResponse({
    type: TokenInfoDto,
    description: 'Bearer token',
    status: 200,
  })
  public whois(@ExtractUser() user: TokenInfoDto): TokenInfoDto {
    return user;
  }

  @Post('/refresh')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: "Refresh user's token" })
  @ApiResponse({
    type: TokenDto,
    description: 'Get new tokens',
    status: 200,
  })
  public async refreshToken(@Body() refresh: RefreshTokenDto) {
    return await this.authService.refreshToken(refresh.refreshToken)
  }
}
