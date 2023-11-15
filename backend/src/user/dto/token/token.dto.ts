import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty({
    description: 'Access-token',
    example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
  })
  @IsString({ message: 'Should be string' })
  @IsNotEmpty({ message: 'Should`n be empty' })
  @IsJWT({ message: 'Should be JWT string' })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh-token',
    example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
  })
  @IsString({ message: 'Should be string' })
  @IsNotEmpty({ message: 'Should`n be empty' })
  @IsJWT({ message: 'Should be JWT string' })
  refreshToken: string
}
