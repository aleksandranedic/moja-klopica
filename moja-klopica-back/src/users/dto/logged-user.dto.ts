export class LoggedUserInfo {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  role: string;

  constructor(
    id: number,
    name: string,
    surname: string,
    phoneNumber: string,
    role: string,
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.phoneNumber = phoneNumber;
    this.role = role;
  }

  get Id(): number {
    return this.id;
  }

  set Id(id: number) {
    this.id = id;
  }

  get Name(): string {
    return this.name;
  }

  set Name(name: string) {
    this.name = name;
  }

  get Surname(): string {
    return this.surname;
  }

  set Surname(surname: string) {
    this.surname = surname;
  }

  get PhoneNumber(): string {
    return this.phoneNumber;
  }

  set PhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  get Role(): string {
    return this.role;
  }

  set Role(role: string) {
    this.role = role;
  }
}
