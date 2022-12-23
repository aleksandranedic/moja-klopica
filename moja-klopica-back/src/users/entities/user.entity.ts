import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class User {
  @PrimaryGeneratedColumn()
  private id: number;
  @Column()
  private name: string;
  @Column()
  private surname: string;
  @Column()
  private phoneNumber: string;
  @Column()
  private email: string;
  @Column()
  private password: string;
  @Column({ default: false })
  private deleted: boolean;
  @Column({ default: false })
  private verified: boolean;
  @Column({ nullable: true })
  private confimationToken: string;

  constructor(
    name: string,
    surname: string,
    phoneNumber: string,
    email: string,
    password: string,
    verified = false,
  ) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.verified = verified;
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

  get Surname() {
    return this.surname;
  }
  set Surname(value: string) {
    this.surname = value;
  }

  get Email() {
    return this.email;
  }
  set Email(value: string) {
    this.email = value;
  }

  get Password() {
    return this.password;
  }
  set Password(value: string) {
    this.password = value;
  }

  get PhoneNumber() {
    return this.phoneNumber;
  }
  set PhoneNumber(value: string) {
    this.phoneNumber = value;
  }
  get Deleted() {
    return this.deleted;
  }
  set Deleted(value: boolean) {
    this.deleted = value;
  }
  get Verified() {
    return this.verified;
  }
  set Verified(value: boolean) {
    this.verified = value;
  }
  get ConfirmationToken() {
    return this.confimationToken;
  }

  set ConfirmationToken(value: string) {
    this.confimationToken = value;
  }
}
