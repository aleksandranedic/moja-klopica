import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Role } from 'src/shared/decorators/role.decorator';
import { RestaurantTransform } from 'src/shared/pipes/tranformation/create-restaurant.pipe';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @UsePipes(RestaurantTransform)
  @Role('Admin')
  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return await this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(+id);
  }

  @Get(':id/menu')
  findMenuForTheDay(@Param('id') id: string) {
    return this.restaurantService.findOne(+id);
  }

  @Post(':id/menu')
  addMenu(@Param('id') id: string) {
    return this.restaurantService.findOne(+id);
  }

  @Get(':id/meal')
  findMeals(@Param('id') id: string) {
    return this.restaurantService.findOne(+id);
  }

  @Post(':id/meal')
  addMeal(@Param('id') id: string) {
    return this.restaurantService.findOne(+id);
  }
}
