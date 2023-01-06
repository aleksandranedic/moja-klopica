import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerService } from 'src/owner/owner.service';
import { Repository } from 'typeorm';
import { CreateMealDto } from './dto/create-meal.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { WorkHourDto } from './dto/work-hour.dto';
import { Meal } from './entities/meal.entity';
import { Menu } from './entities/menu.entity';
import { Restaurant } from './entities/restaurant.entity';
import { WorkHour } from './entities/workHour.entity';

@Injectable()
export class RestaurantService {
  @InjectRepository(Restaurant)
  private readonly restaurantRepository: Repository<Restaurant>;
  @InjectRepository(WorkHour)
  private readonly workHourRepository: Repository<WorkHour>;
  @InjectRepository(Meal)
  private readonly mealRepository: Repository<Meal>;
  @InjectRepository(Menu)
  private readonly menuRepository: Repository<Menu>;

  constructor(private ownerService: OwnerService) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    //sacuvaj slike
    const res: Restaurant = new Restaurant(
      createRestaurantDto.name,
      createRestaurantDto.address,
      createRestaurantDto.category,
      createRestaurantDto.images,
    );
    //ovo mora biti jedna transakcija
    res.Owner = await this.ownerService.findOne(createRestaurantDto.ownerId);
    this.restaurantRepository.save(res);
    this.saveWorkHours(res, createRestaurantDto.workHours);
  }

  private async saveWorkHours(res: Restaurant, workHours: WorkHourDto[]) {
    for (const workHourDto of workHours) {
      const workHour = new WorkHour(
        workHourDto.dayOfWeek,
        workHourDto.openingTime,
        workHourDto.closingTime,
      );
      workHour.Restaurant = res;
      await this.workHourRepository.save(workHour);
    }
  }

  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantRepository.find();
  }

  async findOne(id: number): Promise<Restaurant> {
    const res: Restaurant = await this.restaurantRepository
      .createQueryBuilder('restaurant')
      .where('restaurant.id = :id', { id })
      .getOne();
    if (!res) {
      throw new BadRequestException("Restaurant doesn't exist!");
    }
    return res;
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    const restaurant: Restaurant = await this.findOne(id);
    const keys = Object.keys(updateRestaurantDto);
    for (const key of keys) {
      if (key === 'ownerId')
        throw new BadRequestException("You can't update restaurant's owner!");
      if (key === 'workHours')
        await this.updateWorkHours(id, updateRestaurantDto.workHours);
      else {
        restaurant[key] = updateRestaurantDto[key];
      }
    }
    return await this.restaurantRepository.save(restaurant);
  }

  async updateWorkHours(restaurantId: number, workHourDto: WorkHourDto[]) {
    const workHours = await this.findWorkHours(restaurantId);
    for (const workHour of workHours) {
      for (const newWorkHour of workHourDto) {
        if (workHour.DayOfWeek === newWorkHour.dayOfWeek) {
          workHour.OpeningTime = newWorkHour.openingTime;
          workHour.ClosingTime = newWorkHour.closingTime;
          await this.workHourRepository.save(workHour);
          break;
        }
      }
    }
  }

  async findWorkHours(restaurantId: number) {
    const workHours: WorkHour[] = await this.workHourRepository
      .createQueryBuilder('work_hour')
      .where('work_hour.restaurantId = :id', { id: restaurantId })
      .getMany();
    if (!workHours || workHours.length === 0) {
      throw new BadRequestException(
        `There are no work hours for restaurant with id ${restaurantId} defined!`,
      );
    }
    return workHours;
  }
  async addImages(id: number, images: string[]) {
    //sacuvaj slike
    const restaurant: Restaurant = await this.findOne(id);
    for (const image of images) restaurant.addImage(image);
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }

  async findMeals(id: number) {
    await this.findOne(id);
    return await this.mealRepository
      .createQueryBuilder('meal')
      .where('meal.restaurantId = :id', { id })
      .getMany();
  }

  async createMeal(id: number, createMealDto: CreateMealDto) {
    const res: Restaurant = await this.findOne(id);
    const meal: Meal = new Meal(
      createMealDto.title,
      createMealDto.description,
      createMealDto.type,
      createMealDto.image,
      createMealDto.price,
    );
    meal.Restaurant = res;
    return await this.mealRepository.save(meal);
  }

  async createMenu(id: number, createMenuDto: CreateMenuDto) {
    const res: Restaurant = await this.findOne(id);
    const menu: Menu = new Menu(createMenuDto.date);
    menu.Restaurant = res;
    return await this.saveMealsMenu(id, menu, createMenuDto.mealId);
  }

  async saveMealsMenu(restaurantId: number, menu: Menu, mealIds: number[]) {
    const meals = await this.findMealsById(restaurantId, mealIds);
    //Ovo treba da bude jedna transakcija
    menu = await this.menuRepository.save(menu);
    for (const meal of meals) {
      await meal.addMenu(menu);
      await this.mealRepository.save(meal);
    }
    return meals;
  }

  async findMealsById(restaurantId: number, mealIds: number[]) {
    const meals: Meal[] = await this.mealRepository
      .createQueryBuilder('meal')
      .where('meal.restaurantId = :id', { id: restaurantId })
      .andWhere(`id IN (:...mealIds)`, { mealIds })
      .getMany();
    if (!meals || meals.length === 0) {
      throw new BadRequestException('There is no defined meal!');
    }
    return meals;
  }

  async updateMeal(id: number, mealId: number, updateMealDto: UpdateMealDto) {
    const meal: Meal = (await this.findMealsById(id, [mealId]))[0];
    Object.assign(meal, updateMealDto);
    return await this.mealRepository.save(meal);
  }
}
