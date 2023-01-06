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
import { CreateMealDto } from './dto/create-meal.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { ExcludeNullPipe } from 'src/shared/pipes/tranformation/exclude-null.pipe';

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

  @UsePipes(RestaurantTransform)
  @Role('Owner')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ExcludeNullPipe) updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return await this.restaurantService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(+id);
  }

  @Get(':id/menu')
  findMenuForTheDay(@Param('id') id: string) {
    return this.restaurantService.findOne(+id);
  }

  @Role('Owner')
  @Post(':id/menu')
  async createMenu(
    @Param('id', ParseIntPipe) id: number,
    @Body() createMenuDto: CreateMenuDto,
  ) {
    return await this.restaurantService.createMenu(id, createMenuDto);
  }

  @Role('Owner')
  @Get(':id/meal')
  async findMeals(@Param('id', ParseIntPipe) id: number) {
    return await this.restaurantService.findMeals(id);
  }

  @Role('Owner')
  @Post(':id/meal')
  async createMeal(
    @Param('id', ParseIntPipe) id: number,
    @Body() createMealDto: CreateMealDto,
  ) {
    return await this.restaurantService.createMeal(id, createMealDto);
  }

  @Role('Owner')
  @Patch(':id/meal/:mealId')
  async updateMeal(
    @Param('id', ParseIntPipe) id: number,
    @Param('mealId', ParseIntPipe) mealId: number,
    @Body(ExcludeNullPipe) updateMealDto: UpdateMealDto,
  ) {
    return await this.restaurantService.updateMeal(id, mealId, updateMealDto);
  }
}
