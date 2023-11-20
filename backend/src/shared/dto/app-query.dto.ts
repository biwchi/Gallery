import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AppQueryDto {
  /**
   * Items to skip
   */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsInt()
  offset?: number = 0;

  /**
   * Items to show
   */
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  limit?: number = 10;

  /**
   * Searching word
   */
  @IsString()
  @IsOptional()
  search?: string;
}
