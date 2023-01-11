import { Meal } from 'src/restaurant/entities/meal.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  private id: number;
  @ManyToOne(() => Meal, { eager: true })
  @JoinColumn()
  private meal: Meal;
  @Column()
  private quantity: number;
  @ManyToOne(() => Order, (order) => order.Id, { lazy: true })
  private order: Order;

  constructor(meal: Meal, quantity: number) {
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
  get Order() {
    return this.order;
  }
  set Order(value: Order) {
    this.order = value;
  }
}
