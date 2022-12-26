import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { WorkHour } from 'src/restaurant/entities/workHour.entity';
import { Menu } from './entities/menu.entity';
import { Meal } from './entities/meal.entity';
import { OwnerModule } from 'src/owner/owner.module';

@Module({
  imports: [
    OwnerModule,
    TypeOrmModule.forFeature([Restaurant, WorkHour, Menu, Meal]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
