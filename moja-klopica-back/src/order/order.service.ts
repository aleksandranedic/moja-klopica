import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from 'src/client/client.service';
import { Client } from 'src/client/entities/client.entity';
import { Meal } from 'src/restaurant/entities/meal.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItemsDto } from './dto/order-items.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';

@Injectable()
export class OrderService {
  @InjectRepository(Order)
  private readonly repository: Repository<Order>;
  @InjectRepository(OrderItem)
  private readonly orderItemRepository: Repository<OrderItem>;

  constructor(
    private restaurantService: RestaurantService,
    private clientService: ClientService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const res: Restaurant = await this.restaurantService.findOne(
      createOrderDto.restaurantId,
    );
    const client: Client = await this.clientService.findOne(
      createOrderDto.clientId,
    );
    let order: Order = new Order(createOrderDto.date, createOrderDto.price);
    order.Restaurant = res;
    order.Client = client;
    order = await this.repository.save(order);
    const orderItems = await this.createOrderItems(
      res.Id,
      order,
      createOrderDto.items,
    );
    this.orderItemRepository.save(orderItems);
    return order;
  }

  private async createOrderItems(
    restaurantId: number,
    order: Order,
    orderItemsDto: OrderItemsDto[],
  ) {
    const orderItems = [];
    for (const orderItemDto of orderItemsDto) {
      const meal: Meal = (
        await this.restaurantService.findMealsById(restaurantId, [
          orderItemDto.mealId,
        ])
      )[0];
      const orderItem = new OrderItem(meal, orderItemDto.quantity);
      orderItem.Order = order;
      orderItems.push(orderItem);
    }
    return orderItems;
  }
  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
