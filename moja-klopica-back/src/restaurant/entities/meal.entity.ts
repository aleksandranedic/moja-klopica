import { MealType } from 'src/entities/mealType';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Menu } from './menu.entity';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  private id: number;
  @Column()
  private title: string;
  @Column({ length: 200 })
  private description: string;
  @Column({
    type: 'enum',
    enum: MealType,
  })
  private type: MealType;
  @Column()
  private image: string;
  @Column('float')
  private price: number;
  @ManyToOne(() => Restaurant) //dodati cascade tako da kad se obrise restaurant sa tim id, da se obrise i ovaj review
  private restaurant: Promise<Restaurant>; //oznaka da je lazy loading, nece da ucita restoran kad dobavljam Review iz baze
  @ManyToOne(() => Menu)
  private menu: Promise<Menu>; //oznaka da je lazy loading, nece da ucita restoran kad dobavljam Review iz baze

  constructor(
    id: number,
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
}
