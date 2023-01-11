import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Role } from 'src/shared/decorators/role.decorator';
import { SkipAuth } from 'src/shared/decorators/skip-auth.decorator';
import { GetUser } from 'src/shared/decorators/param.decorator';
import { LoggedUserInfo } from 'src/users/dto/logged-user.dto';
import { GetReviewDto } from './dto/get-review.dto';

@ApiBearerAuth()
@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: 'Create review' })
  @ApiResponse({
    status: 201,
    type: GetReviewDto,
  })
  @Role('Client')
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewService.create(createReviewDto);
  }

  @ApiOperation({ summary: "Get logged user's reviews" })
  @ApiResponse({
    status: 200,
    type: GetReviewDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'There are no reviews defined for client with id # !',
  })
  @Role('Client')
  @Get('/mine')
  async findReviewsForClient(@GetUser() user: LoggedUserInfo) {
    return await this.reviewService.findReviewsByCriteria('clientId', user.Id);
  }

  @ApiOperation({ summary: 'Get review with id' })
  @ApiResponse({
    status: 200,
    type: GetReviewDto,
  })
  @ApiResponse({
    status: 404,
    description: "Review with id # doesn't exist",
  })
  @SkipAuth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.findOne(id);
  }

  @ApiOperation({ summary: "Get restaurant's reviews" })
  @ApiResponse({
    status: 200,
    type: GetReviewDto,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'There are no reviews defined for restaurant with id # !',
  })
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
}
