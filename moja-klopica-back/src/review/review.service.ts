import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/client/entities/client.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  @InjectRepository(Review)
  private readonly repository: Repository<Review>;
  @InjectRepository(Restaurant)
  private readonly restaurantRepo: Repository<Restaurant>;
  @InjectRepository(Client)
  private readonly clientRepo: Repository<Client>;

  async create(createReviewDto: CreateReviewDto): Promise<boolean> {
    const rest = await this.restaurantRepo.findOneBy({
      Id: createReviewDto.restaurantId,
    });
    const client = await this.clientRepo.findOneBy({
      Id: createReviewDto.clientId,
    });
    if (!rest || !client) return false;
    const review: Review = new Review(
      createReviewDto.comment,
      createReviewDto.generalScore,
      createReviewDto.atmosphereScore,
    );
    review.Restaurant = rest;
    review.Client = client;
    this.repository.save(review);
    return true;
  }

  async findAll(): Promise<Review[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Review> {
    return await this.repository.findOneBy({ Id: id });
  }

  /*async update(id: number, updateReviewDto: UpdateReviewDto) {
    return `Review se ne update`;
  }*/

  async remove(id: number): Promise<boolean> {
    const rew: Review = await this.findOne(id);
    if (!rew) return false;
    await this.repository.remove(rew);
    return true;
  }
}
