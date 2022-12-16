import { Meal } from 'src/restaurant/entities/meal.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  private id: number;
  @OneToOne(() => Meal)
  @JoinColumn()
  private meal: Meal;
  @Column()
  private quantity: number;
  @ManyToOne(() => Order)
  order: Order;

  constructor(id: number, meal: Meal, quantity: number) {
    this.id = id;
    this.meal = meal;
    this.quantity = quantity;
  }
  get Id() {
    return this.id;
  }
  set Id(value: number) {
    this.id = value;
  }
  get Meal() {
    return this.meal;
  }
  set Meal(value: Meal) {
    this.meal = value;
  }
  get Quantity() {
    return this.quantity;
  }
  set Quantity(value: number) {
    this.quantity = value;
  }
}
