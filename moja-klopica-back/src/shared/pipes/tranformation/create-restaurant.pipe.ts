import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { CreateRestaurantDto } from 'src/restaurant/dto/create-restaurant.dto';

@Injectable()
export class RestaurantTransform implements PipeTransform {
  transform(value: CreateRestaurantDto, metadata: ArgumentMetadata) {
    if (!value.workHours) return value;
    for (let i = 0; i < value.workHours.length; i++) {
      const openingTime = new Date(value.workHours[i].openingTime);
      const closingTime = new Date(value.workHours[i].closingTime);
      if (isNaN(closingTime.getTime()) || isNaN(openingTime.getTime())) {
        throw new BadRequestException('Invalid opening or closing time');
      }
      if (
        openingTime.getDate() != closingTime.getDate() ||
        openingTime.getMonth() != closingTime.getMonth() ||
        openingTime.getFullYear() != closingTime.getFullYear()
      ) {
        throw new BadRequestException(
          'Opening and closing time must be in one day',
        );
      }
      if (openingTime.getHours() - closingTime.getHours() > 0) {
        throw new BadRequestException(
          'Opening time must be before closing time.',
        );
      }
      value.workHours[i].closingTime = closingTime;
      value.workHours[i].openingTime = openingTime;
      value.workHours[i].dayOfWeek = openingTime.getDay();
    }
    value.images = value.images ? value.images : [];
    return value;
  }
}
