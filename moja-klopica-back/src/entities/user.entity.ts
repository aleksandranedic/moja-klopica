export abstract class User {
  private id: string;
  private name: string;
  private surname: string;
  private phoneNumber: string;
  private email: string;
  private password: string;

  constructor(
    id: string,
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
  set Id(value: string) {
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
}
