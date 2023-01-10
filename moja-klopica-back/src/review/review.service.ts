import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from 'src/client/client.service';
import { Client } from 'src/client/entities/client.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  @InjectRepository(Review)
  private readonly repository: Repository<Review>;

  constructor(
    private clientService: ClientService,
    private restaurantService: RestaurantService,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const res: Restaurant = await this.restaurantService.findOne(
      createReviewDto.restaurantId,
    );
    const client: Client = await this.clientService.findOne(
      createReviewDto.clientId,
    );
    const review: Review = new Review(
      createReviewDto.comment,
      createReviewDto.generalScore,
      createReviewDto.atmosphereScore,
    );
    review.Restaurant = res;
    review.Client = client;
    return await this.repository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return await this.repository.find();
  }

  async findReviewsByCriteria(idType: string, id: number) {
    const reviews: Review[] = await this.repository
      .createQueryBuilder('order')
      .where(`order.${idType} = :id`, { id })
      .getMany();
    if (!reviews || reviews.length === 0) {
      throw new BadRequestException(
        `There are no reviews defined for ${
          idType.split('Id')[0]
        } with id ${id} !`,
      );
    }
    return reviews;
  }
  async findOne(id: number): Promise<Review> {
    const review: Review = await this.repository
      .createQueryBuilder('review')
      .where('review.id = :id', { id })
      .getOne();
    if (!review) {
      throw new BadRequestException(`Review with id ${id} doesn't exist.`);
    }
    return review;
  }

  async remove(id: number): Promise<boolean> {
    const rew: Review = await this.findOne(id);
    if (!rew) return false;
    await this.repository.remove(rew);
    return true;
  }
}
