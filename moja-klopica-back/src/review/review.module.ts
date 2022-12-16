import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Client } from 'src/client/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Restaurant, Client])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
