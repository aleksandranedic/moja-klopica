import { User } from 'src/users/entities/user.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class Client extends User {
  @Column({ default: false })
  private verified: boolean; //Client cannot be logged after registration until he confirms his email
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
