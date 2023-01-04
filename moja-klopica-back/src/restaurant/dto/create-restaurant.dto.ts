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
  @IsString()
  @IsOptional()
  images: string[];
}
