import { Meal } from './meal.entity';

export class Menu {
  private id: string;
  private date: Date;
  private meals: Meal[];

  constructor(id: string, date: Date) {
    this.id = id;
    this.date = date;
    this.meals = [];
  }
  get Id() {
    return this.id;
  }
  set Id(value: string) {
    this.id = value;
  }
  get Date() {
    return this.date;
  }
  set Date(value: Date) {
    this.date = value;
  }
  get Meals() {
    return this.meals;
  }
  set Meals(value: Meal[]) {
    this.meals = value;
  }
}
