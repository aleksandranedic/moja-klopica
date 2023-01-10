import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ClientModule } from 'src/client/client.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
  imports: [ClientModule, RestaurantModule, TypeOrmModule.forFeature([Review])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
