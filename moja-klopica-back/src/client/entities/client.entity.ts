import { User } from 'src/users/entities/user.entity';
import { ChildEntity } from 'typeorm';

@ChildEntity()
export class Client extends User {
  constructor(
    name: string,
    surname: string,
    phoneNumber: string,
    email: string,
    password: string,
  ) {
    super(name, surname, phoneNumber, email, password);
  }
}
