import { User } from 'src/entities/user.entity';
import { Entity } from 'typeorm';

@Entity()
export class Admin extends User {
  constructor(
    id: number,
    name: string,
    surname: string,
    phoneNumber: string,
    email: string,
    password: string,
  ) {
    super(id, name, surname, phoneNumber, email, password);
  }
}
