import { CuisineCategory } from 'src/entities/category';
import { WorkHourDto } from './work-hour.dto';

export interface CreateRestaurantDto {
  ownerId: number;
  name: string;
  address: string;
  category: CuisineCategory;
  workHours: WorkHourDto[];
  images: string[];
}
