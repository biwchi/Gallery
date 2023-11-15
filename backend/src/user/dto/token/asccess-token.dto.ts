import { PickType } from '@nestjs/swagger';
import { TokenDto } from './token.dto';

export class AccessToken extends PickType(TokenDto, ['accessToken']) {}
