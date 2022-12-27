import { CuisineCategory } from 'src/entities/category';
import { Owner } from 'src/owner/entities/owner.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  private id: number;
  @Column()
  private name: string;
  @Column()
  private address: string;
  @Column({
    type: 'enum',
    enum: CuisineCategory,
  })
  private category: CuisineCategory;
  @Column('simple-array')
  private images: string[];
  @DeleteDateColumn({ nullable: true })
  private deletedDate: Date;
  @ManyToOne(() => Owner, {
    lazy: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'soft-delete',
  })
  private owner: Promise<Owner>;
  constructor(
    name: string,
    address: string,
    category: CuisineCategory,
    images: string[],
  ) {
    this.name = name;
    this.address = address;
    this.category = category;
    this.images = images;
  }

  get Id() {
    return this.id;
  }
  set Id(value: number) {
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
  get Owner() {
    let ow: Owner;
    (async () => (ow = await this.owner))();
    return ow;
  }
  set Owner(value: Owner) {
    this.owner = Promise.resolve(value);
  }
}
