import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerService } from 'src/owner/owner.service';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { WorkHourDto } from './dto/work-hour.dto';
import { Restaurant } from './entities/restaurant.entity';
import { WorkHour } from './entities/workHour.entity';

@Injectable()
export class RestaurantService {
  @InjectRepository(Restaurant)
  private readonly restaurantRepository: Repository<Restaurant>;
  @InjectRepository(WorkHour)
  private readonly workHourRepository: Repository<WorkHour>;

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

  findAll() {
    return `This action returns all restaurant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
