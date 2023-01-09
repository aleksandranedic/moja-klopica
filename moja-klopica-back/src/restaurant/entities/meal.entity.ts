import { MealType } from 'src/entities/mealType';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Menu } from './menu.entity';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  private id: number;
  @Column()
  private title: string;
  @Column({ nullable: true, length: 200 })
  private description: string;
  @Column({
    type: 'enum',
    enum: MealType,
  })
  private type: MealType;
  @Column({ nullable: true })
  private image: string;
  @Column('float')
  private price: number;
  @ManyToOne(() => Restaurant, { lazy: true }) //dodati cascade tako da kad se obrise restaurant sa tim id, da se obrise i ovaj review
  private restaurant: Promise<Restaurant>; //oznaka da je lazy loading, nece da ucita restoran kad dobavljam Review iz baze
  @ManyToMany(() => Menu, { lazy: true })
  @JoinTable()
  private menus: Menu[]; //oznaka da je lazy loading, nece da ucita restoran kad dobavljam Review iz baze

  constructor(
    title: string,
    description: string,
    type: MealType,
    image: string,
    price: number,
  ) {
    this.title = title;
    this.description = description;
    this.type = type;
    this.image = image;
    this.price = price;
  }
  get Id() {
    return this.id;
  }
  set Id(value: number) {
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
  get Restaurant() {
    let res: Restaurant;
    (async () => (res = await this.restaurant))();
    return res;
  }
  set Restaurant(value: Restaurant) {
    this.restaurant = Promise.resolve(value);
  }
  get Menu() {
    return this.menus;
  }
  set Menu(value: Menu[]) {
    this.menus = value;
  }
  async addMenu(value: Menu) {
    (await this.menus).push(value);
  }

  async removeMenu(value: Menu) {
    let menus = await this.menus;
    menus = menus.filter((menu) => menu.Id != value.Id);
    this.Menu = menus;
  }
}
