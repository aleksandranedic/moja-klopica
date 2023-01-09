import { IsNotEmpty, ArrayNotEmpty, IsDate, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';
import { TransformFnParams } from 'class-transformer/types/interfaces';

export class CreateMenuDto {
  @IsNotEmpty()
  @IsDate()
  @Transform((obj: TransformFnParams) => new Date(obj.value))
  date: Date;
  @ArrayNotEmpty()
  @IsPositive({ each: true })
  mealId: number[];
}
