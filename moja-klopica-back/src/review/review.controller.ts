import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Role } from 'src/shared/decorators/role.decorator';
import { SkipAuth } from 'src/shared/decorators/skip-auth.decorator';
import { GetUser } from 'src/shared/decorators/param.decorator';
import { LoggedUserInfo } from 'src/users/dto/logged-user.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Role('Client')
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewService.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Role('Client')
  @Get('/mine')
  async findReviewsForClient(@GetUser() user: LoggedUserInfo) {
    return await this.reviewService.findReviewsByCriteria('clientId', user.Id);
  }

  @SkipAuth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.findOne(id);
  }

  @SkipAuth()
  @Get('/restaurant/:restaurantId')
  async findReviewsForRestaurant(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
  ) {
    return await this.reviewService.findReviewsByCriteria(
      'restaurantId',
      restaurantId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
