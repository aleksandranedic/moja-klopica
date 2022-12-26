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
    for (let i = 0; i < value.workHours.length; i++) {
      const openingTime = new Date(value.workHours[i].openingTime);
      const closingTime = new Date(value.workHours[i].closingTime);
      if (isNaN(closingTime.getTime()) || isNaN(openingTime.getTime())) {
        throw new BadRequestException('Invalid opening or closing time');
      }
      if (openingTime.getDate() != closingTime.getDate()) {
        throw new BadRequestException(
          'Opening and closing time must be in one day',
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
