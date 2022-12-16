import { User } from 'src/users/entities/user.entity';
import { ChildEntity } from 'typeorm';

@ChildEntity()
export class Owner extends User {
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
