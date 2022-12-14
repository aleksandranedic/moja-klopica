export class WorkHour {
  private id: string;
  private dayOfWeek: number;
  private openingTime: Date;
  private closingTime: Date;
  constructor(
    id: string,
    dayOfWeek: number,
    openingTime: Date,
    closingTime: Date,
  ) {
    this.id = id;
    this.dayOfWeek = dayOfWeek;
    this.openingTime = openingTime;
    this.closingTime = closingTime;
  }

  get Id() {
    return this.id;
  }
  set Id(value: string) {
    this.id = value;
  }
  get DayOfWeek() {
    return this.dayOfWeek;
  }
  set DayOfWeek(value: number) {
    this.dayOfWeek = value;
  }
  get OpeningTime() {
    return this.openingTime;
  }
  set OpeningTime(value: Date) {
    this.openingTime = value;
  }
  get ClosingTime() {
    return this.closingTime;
  }
  set ClosingTime(value: Date) {
    this.closingTime = value;
  }
}
