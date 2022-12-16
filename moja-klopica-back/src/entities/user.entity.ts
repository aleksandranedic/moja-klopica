import { Column, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column()
  private deleted: boolean;

  constructor(
    id: number,
    name: string,
    surname: string,
    phoneNumber: string,
    email: string,
    password: string,
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
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

  get Surame() {
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
}
