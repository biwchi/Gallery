import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNumber } from 'class-validator';

export class DeleteDto {
  @ApiProperty({
    description: 'Entities IDs for delete',
    example: [1, 2, 3],
    type: Number,
    isArray: true,
  })
  @ArrayNotEmpty()
  @IsNumber({}, { each: true, message: 'Should be number' })
  ids: number[];
}
