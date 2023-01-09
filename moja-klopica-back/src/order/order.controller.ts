import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Role } from 'src/shared/decorators/role.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Role('Client')
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Role('Client')
  @Get('client/:clientId')
  async findClientOrders(
    @Param('clientId', ParseIntPipe) id: number,
    @Query('current', ParseBoolPipe) current: boolean,
  ) {
    return await this.orderService.findOrders('clientId', id, current);
  }

  @Role('Owner')
  @Get('restaurant/:restaurantId')
  async findRestaurantOrders(@Param('restaurantId', ParseIntPipe) id: number) {
    return await this.orderService.findOrders('restaurantId', id, true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
