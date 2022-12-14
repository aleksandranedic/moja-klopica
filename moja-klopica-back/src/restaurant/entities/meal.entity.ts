import { MealType } from 'src/entities/mealType';

export class Meal {
  private id: string;
  private title: string;
  private description: string;
  private type: MealType;
  private image: string;
  private price: number;

  constructor(
    id: string,
    title: string,
    description: string,
    type: MealType,
    image: string,
    price: number,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.type = type;
    this.image = image;
    this.price = price;
  }
  get Id() {
    return this.id;
  }
  set Id(value: string) {
    this.id = value;
  }
  get Title() {
    return this.title;
  }
  set Title(value: string) {
    this.title = value;
  }
  get Description() {
    return this.description;
  }
  set Description(value: string) {
    this.description = value;
  }
  get Type() {
    return this.type;
  }
  set Type(value: MealType) {
    this.type = value;
  }
  get Image() {
    return this.image;
  }
  set Image(value: string) {
    this.image = value;
  }
  get Price() {
    return this.price;
  }
  set Price(value: number) {
    this.price = value;
  }
}
