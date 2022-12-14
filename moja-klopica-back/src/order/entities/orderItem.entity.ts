import { Meal } from 'src/restaurant/entities/meal.entity';

export class OrderItem {
  private id: string;
  private meal: Meal;
  private quantity: number;

  constructor(id: string, meal: Meal, quantity: number) {
    this.id = id;
    this.meal = meal;
    this.quantity = quantity;
  }
  get Id() {
    return this.id;
  }
  set Id(value: string) {
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
