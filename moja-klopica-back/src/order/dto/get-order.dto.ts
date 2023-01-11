import { GetOrderItemDto } from './get-order-item.dto';

export class GetOrderDto {
  constructor(
    public date: Date,
    public price: number,
    public restaurantName: string,
    public clientName: string,
    public items: GetOrderItemDto[],
  ) {}
}
