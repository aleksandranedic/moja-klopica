import { OrderItem } from './orderItem.entity';

export class Order {
  private id: string;
  private date: Date;
  private price: number;
  private items: OrderItem[];

  constructor(id: string, date: Date, price: number) {
    this.id = id;
    this.date = date;
    this.price = price;
    this.items = [];
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
  get Price() {
    return this.price;
  }
  set Price(value: number) {
    this.price = value;
  }
  get Items() {
    return this.items;
  }
  set Items(value: OrderItem[]) {
    this.items = value;
  }
}
