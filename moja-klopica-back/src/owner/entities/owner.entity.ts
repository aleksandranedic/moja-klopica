import { User } from 'src/entities/user.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

export class Owner extends User {
  private restaurant: Restaurant;

  constructor(
    id: string,
    name: string,
    surname: string,
    phoneNumber: string,
    email: string,
    password: string,
    restaurant: Restaurant,
  ) {
    super(id, name, surname, phoneNumber, email, password);
    this.restaurant = restaurant;
  }
  get Restaurant() {
    return this.restaurant;
  }
  set Restaurant(value: Restaurant) {
    this.restaurant = value;
  }
}
