import { User } from 'src/entities/user.entity';
import { Column, Entity } from 'typeorm';

@Entity()
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
