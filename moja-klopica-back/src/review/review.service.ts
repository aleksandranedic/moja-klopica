import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from 'src/client/client.service';
import { Client } from 'src/client/entities/client.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewDto } from './dto/get-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  @InjectRepository(Review)
  private readonly repository: Repository<Review>;

  constructor(
    private clientService: ClientService,
    private restaurantService: RestaurantService,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<GetReviewDto> {
    const res: Restaurant = await this.restaurantService.findOne(
      createReviewDto.restaurantId,
    );
    const client: Client = await this.clientService.findOne(
      createReviewDto.clientId,
    );
    let review: Review = new Review(
      createReviewDto.comment,
      createReviewDto.generalScore,
      createReviewDto.atmosphereScore,
    );
    review.Restaurant = res;
    review.Client = client;
    review = await this.repository.save(review);
    return await this.createGetReviewDto(review);
  }

  private async createGetReviewDto(review: Review) {
    const restaurant = {
      restaurantName: (await review.Restaurant).Name,
      restaurantId: (await review.Restaurant).Id,
    };
    const client = {
      clientName: (await review.Client).FullName,
      clientId: (await review.Client).Id,
    };
    return new GetReviewDto(
      review.Id,
      review.Comment,
      review.GeneralScore,
      review.AtmosphereScore,
      restaurant,
      client,
    );
  }

  private async createGetReviewsDtos(
    reviews: Review[],
  ): Promise<GetReviewDto[]> {
    const reviewsDto: Promise<GetReviewDto>[] = reviews.map(
      async (review) => await this.createGetReviewDto(review),
    );
    return await Promise.all(reviewsDto);
  }

  async findReviewsByCriteria(idType: string, id: number) {
    const reviews: Review[] = await this.repository
      .createQueryBuilder('order')
      .where(`order.${idType} = :id`, { id })
      .getMany();
    if (!reviews || reviews.length === 0) {
      throw new NotFoundException(
        `There are no reviews defined for ${
          idType.split('Id')[0]
        } with id ${id} !`,
      );
    }
    return await this.createGetReviewsDtos(reviews);
  }

  async findOne(id: number): Promise<GetReviewDto> {
    const review: Review = await this.repository
      .createQueryBuilder('review')
      .where('review.id = :id', { id })
      .getOne();
    if (!review) {
      throw new NotFoundException(`Review with id ${id} doesn't exist.`);
    }
    return await this.createGetReviewDto(review);
  }
}
