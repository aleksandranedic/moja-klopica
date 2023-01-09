import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from 'src/client/client.service';
import { Client } from 'src/client/entities/client.entity';
import { Meal } from 'src/restaurant/entities/meal.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrderItemDto } from './dto/get-order-item.dto';
import { GetOrderDto } from './dto/get-order.dto';
import { OrderItemsDto } from './dto/order-items.dto';
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
    const orderItems: OrderItem[] = await this.createOrderItems(
      res.Id,
      createOrderDto.items,
    );
    order = await this.repository.save(order);
    orderItems.map(async (item) => {
      item.Order = order;
      await this.orderItemRepository.save(item);
    });
    return order;
  }

  async findOrders(idType: string, id: number, current) {
    const orders: Order[] = await this.findOrdersById(idType, id, current);
    return await this.createOrderDto(orders);
  }

  private async createOrderDto(orders: Order[]) {
    const ordersDto: GetOrderDto[] = [];
    for (const order of orders) {
      const orderItemsDto = await this.createOrderItemsDto(
        await this.findOrderItems(order.Id),
      );
      const restaurantName = (await order.Restaurant).Name;
      const clientName = (await order.Client).FullName;
      ordersDto.push(
        new GetOrderDto(
          order.Date,
          order.Price,
          restaurantName,
          clientName,
          orderItemsDto,
        ),
      );
    }
    return ordersDto;
  }

  private async findOrderItems(orderId: number) {
    const orderItems: OrderItem[] = await this.orderItemRepository
      .createQueryBuilder('orderItem')
      .where('orderItem.orderId = :id', { id: orderId })
      .leftJoinAndSelect('orderItem.meal', 'mealId')
      .getMany();
    if (!orderItems || orderItems.length === 0) {
      throw new BadRequestException('There are no order items defined!');
    }
    return orderItems;
  }

  private async createOrderItemsDto(orderItems: OrderItem[]) {
    const ordersItemsDto: GetOrderItemDto[] = [];
    for (const orderItem of orderItems) {
      const restaurantTitle = (await orderItem.Meal).Title;
      ordersItemsDto.push(
        new GetOrderItemDto(orderItem.Quantity, restaurantTitle),
      );
    }
    return ordersItemsDto;
  }
  private async findOrdersById(idType: string, id: number, current: boolean) {
    const startOfToday = new Date();
    const endOfToday = new Date();
    if (current) {
      startOfToday.setHours(0, 0, 0, 0);
      endOfToday.setHours(23, 59, 59, 999);
    } else {
      startOfToday.setMonth(startOfToday.getMonth() - 1);
      endOfToday.setHours(0, 0, 0, 0);
    }

    const orders: Order[] = await this.repository
      .createQueryBuilder('order')
      .where(`order.${idType} = :id`, { id })
      .andWhere('order.date >= :startOfToday', { startOfToday })
      .andWhere('order.date <= :endOfToday', { endOfToday })
      .getMany();
    if (!orders || orders.length === 0) {
      throw new BadRequestException('There are no orders defined!');
    }
    return orders;
  }

  private async createOrderItems(
    restaurantId: number,
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

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
