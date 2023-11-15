import { PickType } from '@nestjs/swagger';
import { UserCreateDto } from './user.create.dto';

export class UserSignInDto extends PickType(UserCreateDto, ['email', 'password']) {}