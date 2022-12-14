import { CuisineCategory } from 'src/entities/category';
import { WorkHour } from 'src/entities/workHour.entity';
import { Order } from 'src/order/entities/order.entity';
import { Review } from 'src/review/entities/review.entity';
import { Meal } from './meal.entity';
import { Menu } from './menu.entity';

export class Restaurant {
  private id: string;
  private name: string;
  private address: string;
  private category: CuisineCategory;
  private images: string[];
  private reviews: Review[];
  private orders: Order[];
  private menus: Menu[];
  private workHours: WorkHour[];
  private meals: Meal[];
  constructor(
    id: string,
    name: string,
    address: string,
    category: CuisineCategory,
    images: string[],
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.category = category;
    this.images = images;
    this.reviews = [];
    this.orders = [];
    this.menus = [];
    this.workHours = [];
    this.meals = [];
  }

  get Id() {
    return this.id;
  }
  set Id(value: string) {
    this.id = value;
  }
  get Name() {
    return this.name;
  }
  set Name(value: string) {
    this.name = value;
  }
  get Address() {
    return this.address;
  }
  set Address(value: string) {
    this.address = value;
  }
  set Category(value: CuisineCategory) {
    this.category = value;
  }
  get Category() {
    return this.category;
  }
  get Images() {
    return this.images;
  }
  set Images(value: string[]) {
    this.images = value;
  }
  public addImage(imgPath: string) {
    this.images.push(imgPath);
  }
  get Reviews() {
    return this.reviews;
  }
  set Reviews(value: Review[]) {
    this.reviews = value;
  }

  get Orders() {
    return this.orders;
  }
  set Orders(value: Order[]) {
    this.orders = value;
  }
  get Menus() {
    return this.menus;
  }
  set Menus(value: Menu[]) {
    this.menus = value;
  }

  get WorkHours() {
    return this.workHours;
  }
  set WorkHours(value: WorkHour[]) {
    this.workHours = value;
  }
  get Meals() {
    return this.meals;
  }
  set Meals(value: Meal[]) {
    this.meals = value;
  }
}
