import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  private id: number;
  @Column({ type: 'date' })
  private date: Date;
  @ManyToOne(() => Restaurant) //dodati cascade tako da kad se obrise restaurant sa tim id, da se obrise i ovaj review
  private restaurant: Promise<Restaurant>; //oznaka da je lazy loading, nece da ucita restoran kad dobavljam Review iz baze

  constructor(date: Date) {
    this.date = date;
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
  get Restaurant() {
    let res: Restaurant;
    (async () => (res = await this.restaurant))();
    return res;
  }
  set Restaurant(value: Restaurant) {
    this.restaurant = Promise.resolve(value);
  }
}
