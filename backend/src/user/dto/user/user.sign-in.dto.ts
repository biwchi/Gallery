import { PickType } from '@nestjs/mapped-types';
import { UserCreateDto } from './user.create.dto';

export class UserSignInDto extends PickType(UserCreateDto, [
  'email',
  'password',
]) {}
