import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WorkHour {
  @PrimaryGeneratedColumn()
  private id: number;
  @ManyToOne(() => Restaurant) //dodati cascade tako da kad se obrise restaurant sa tim id, da se obrise i ovaj review
  private restaurant: Promise<Restaurant>; //oznaka da je lazy loading, nece da ucita restoran kad dobavljam Review iz baze
  @Column()
  private dayOfWeek: number;
  @Column('time')
  private openingTime: Date;
  @Column('time')
  private closingTime: Date;
  constructor(dayOfWeek: number, openingTime: Date, closingTime: Date) {
    this.dayOfWeek = dayOfWeek;
    this.openingTime = openingTime;
    this.closingTime = closingTime;
  }

  get Id() {
    return this.id;
  }
  set Id(value: number) {
    this.id = value;
  }
  get DayOfWeek() {
    return this.dayOfWeek;
  }
  set DayOfWeek(value: number) {
    this.dayOfWeek = value;
  }
  get OpeningTime() {
    return this.openingTime;
  }
  set OpeningTime(value: Date) {
    this.openingTime = value;
  }
  get ClosingTime() {
    return this.closingTime;
  }
  set ClosingTime(value: Date) {
    this.closingTime = value;
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
