import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
  Min,
  Max,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  comment: string;
  @IsNotEmpty()
  @IsPositive()
  restaurantId: number;
  @IsNotEmpty()
  @IsPositive()
  clientId: number;
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @Max(5)
  generalScore: number;
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @Max(5)
  atmosphereScore: number;
}
