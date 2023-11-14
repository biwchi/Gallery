import { PickType } from '@nestjs/mapped-types';
import { UserCreateDto } from './user.create.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MaxLength } from 'class-validator';

export class UserSignInDto {
  @ApiProperty({
    description: 'User email',
    example: 'john@doe.com',
    maxLength: 200,
  })
  @IsString({ message: 'Should be string' })
  @IsNotEmpty({ message: 'Shouldn`t be empty' })
  @IsEmail({}, { message: 'Should be email' })
  @MaxLength(200)
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty',
    maxLength: 200,
  })
  @IsString({ message: 'Should be string' })
  @IsNotEmpty({ message: 'Shouldn`t be empty' })
  @MaxLength(200)
  password: string;
}
