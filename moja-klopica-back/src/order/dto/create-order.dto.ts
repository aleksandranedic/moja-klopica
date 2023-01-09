import {
  IsNotEmpty,
  ArrayNotEmpty,
  IsDate,
  IsPositive,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransformFnParams } from 'class-transformer/types/interfaces';
import { OrderItemsDto } from './order-items.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsDate()
  @Transform((obj: TransformFnParams) => new Date(obj.value))
  date: Date;
  @IsPositive()
  @IsNotEmpty()
  price: number;
  @IsPositive()
  @IsNotEmpty()
  restaurantId: number;
  @IsPositive()
  @IsNotEmpty()
  clientId: number;
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemsDto)
  items: OrderItemsDto[];
}
