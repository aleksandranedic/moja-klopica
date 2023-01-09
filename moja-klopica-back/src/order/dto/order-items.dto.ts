import { IsNotEmpty, IsPositive } from 'class-validator';

export class OrderItemsDto {
  @IsPositive()
  @IsNotEmpty()
  mealId: number;
  @IsPositive()
  @IsNotEmpty()
  quantity: number;
}
