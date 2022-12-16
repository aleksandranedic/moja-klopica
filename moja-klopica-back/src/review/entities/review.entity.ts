import { Client } from 'src/client/entities/client.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  private id: number;
  @Column({ type: 'varchar', length: 200 })
  private comment: string;
  @ManyToOne(() => Restaurant) //dodati cascade tako da kad se obrise restaurant sa tim id, da se obrise i ovaj review
  private restaurant: Promise<Restaurant>; //oznaka da je lazy loading, nece da ucita restoran kad dobavljam Review iz baze
  @ManyToOne(() => Client) //dodati cascade tako da kad se obrise restaurant sa tim id, da se obrise i ovaj review
  private client: Promise<Client>; //oznaka da je lazy loading, nece da ucita restoran kad dobavljam Review iz baze
  @Column()
  private generalScore: number;
  @Column()
  private atmosphereScore: number;
  constructor(comment: string, generalScore: number, atmosphereScore: number) {
    this.comment = comment;
    this.generalScore = generalScore;
    this.atmosphereScore = atmosphereScore;
  }

  get Id() {
    return this.id;
  }
  set Id(value: number) {
    this.id = value;
  }
  get Comment() {
    return this.comment;
  }
  set Comment(value: string) {
    this.comment = value;
  }
  get GeneralScore() {
    return this.generalScore;
  }
  set GeneralScore(value: number) {
    this.generalScore = value;
  }
  get AtmosphereScore() {
    return this.atmosphereScore;
  }
  set AtmosphereScore(value: number) {
    this.atmosphereScore = value;
  }
  get Restaurant() {
    let res: Restaurant;
    (async () => (res = await this.restaurant))();
    return res;
  }
  set Restaurant(value: Restaurant) {
    this.restaurant = Promise.resolve(value);
  }
  get Client() {
    let cl: Client;
    (async () => (cl = await this.client))();
    return cl;
  }
  set Client(value: Client) {
    this.client = Promise.resolve(value);
  }
}
