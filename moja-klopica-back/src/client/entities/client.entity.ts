import { User } from 'src/users/entities/user.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class Client extends User {
  @Column()
  private verified: boolean; //Client cannot be logged after registration until he confirms his email
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
