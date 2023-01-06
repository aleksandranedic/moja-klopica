import { CuisineCategory } from 'src/entities/category';
import { WorkHourDto } from './work-hour.dto';
import {
  IsNotEmpty,
  IsPositive,
  IsString,
  IsOptional,
  IsEnum,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsPositive()
  @IsNotEmpty()
  ownerId: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsEnum(CuisineCategory)
  @IsNotEmpty()
  category: CuisineCategory;
  @ArrayNotEmpty()
  workHours: WorkHourDto[];
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @IsOptional()
  images: string[];
}
