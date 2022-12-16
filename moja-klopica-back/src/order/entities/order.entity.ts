import { Client } from 'src/client/entities/client.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './orderItem.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  private id: number;
  @Column()
  private date: Date;
  @Column('float')
  private price: number;
  @OneToMany(() => OrderItem, (item) => item.Id, { eager: true })
  private items: OrderItem[];
  @ManyToOne(() => Restaurant) //dodati cascade tako da kad se obrise restaurant sa tim id, da se obrise i ovaj review
  private restaurant: Promise<Restaurant>; //oznaka da je lazy loading, nece da ucita restoran kad dobavljam Review iz baze
  @ManyToOne(() => Client) //dodati cascade tako da kad se obrise restaurant sa tim id, da se obrise i ovaj review
  private client: Promise<Client>; //oznaka da je lazy loading, nece da ucita restoran kad dobavljam Review iz baze

  constructor(id: number, date: Date, price: number) {
    this.id = id;
    this.date = date;
    this.price = price;
  }
  get Id() {
    return this.id;
  }
  set Id(value: number) {
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
