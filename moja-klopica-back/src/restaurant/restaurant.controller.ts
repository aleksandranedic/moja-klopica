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
import { SkipAuth } from 'src/shared/decorators/skip-auth.decorator';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  //Da li admin dodaje restoran ili owner moze sam da dodaje? Ili moze owner dodaje, ali admin treba da potvrdi dodavanje
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

  @SkipAuth()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.restaurantService.findOne(id);
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
