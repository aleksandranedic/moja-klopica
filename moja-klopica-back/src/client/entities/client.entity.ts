import { User } from 'src/entities/user.entity';
import { Order } from 'src/order/entities/order.entity';
import { Review } from 'src/review/entities/review.entity';

export class Client extends User {
  private reviews: Review[];
  private orders: Order[];

  constructor(
    id: string,
    name: string,
    surname: string,
    phoneNumber: string,
    email: string,
    password: string,
  ) {
    super(id, name, surname, phoneNumber, email, password);
    this.reviews = [];
    this.orders = [];
  }

  get Reviews() {
    return this.reviews;
  }
  set Reviews(reviews: Review[]) {
    this.reviews = reviews;
  }

  get Orders() {
    return this.orders;
  }
  set Orders(orders: Order[]) {
    this.orders = orders;
  }
}
