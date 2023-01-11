import { Client } from 'src/client/entities/client.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  private id: number;
  @Column()
  private date: Date;
  @Column('float')
  private price: number;
  @ManyToOne(() => Restaurant, { lazy: true }) //dodati cascade tako da kad se obrise restaurant sa tim id, da se obrise i ovaj review
  private restaurant: Restaurant; //oznaka da je lazy loading, nece da ucita restoran kad dobavljam Review iz baze
  @ManyToOne(() => Client, { lazy: true }) //dodati cascade tako da kad se obrise restaurant sa tim id, da se obrise i ovaj review
  private client: Client; //oznaka da je lazy loading, nece da ucita restoran kad dobavljam Review iz baze

  constructor(date: Date, price: number) {
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
  get Restaurant() {
    return this.restaurant;
  }
  set Restaurant(value: Restaurant) {
    this.restaurant = value;
  }
  get Client() {
    return this.client;
  }
  set Client(value: Client) {
    this.client = value;
  }
}
