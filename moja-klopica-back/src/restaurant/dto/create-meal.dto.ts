import {
  IsNotEmpty,
  IsPositive,
  IsString,
  IsOptional,
  Length,
  IsEnum,
} from 'class-validator';

import { MealType } from 'src/entities/mealType';

export class createMealDto {
  @IsString()
  @IsOptional()
  image: string;
  @IsPositive()
  @IsNotEmpty()
  price: number;
  @IsString()
  @IsOptional()
  @Length(0, 200)
  description: string;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  @IsEnum(MealType)
  type: MealType;
}
