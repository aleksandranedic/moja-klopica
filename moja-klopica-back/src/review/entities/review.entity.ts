export class Review {
  private id: string;
  private comment: string;
  private generalScore: number;
  private atmosphereScore: number;
  constructor(
    id: string,
    comment: string,
    generalScore: number,
    atmosphereScore: number,
  ) {
    this.id = id;
    this.comment = comment;
    this.generalScore = generalScore;
    this.atmosphereScore = atmosphereScore;
  }

  get Id() {
    return this.id;
  }
  set Id(value: string) {
    this.id = value;
  }
  get Comment() {
    return this.comment;
  }
  set Comment(value: string) {
    this.comment = value;
  }
  get GeneralScore() {
    return this.generalScore;
  }
  set GeneralScore(value: number) {
    this.generalScore = value;
  }
  get AtmosphereScore() {
    return this.atmosphereScore;
  }
  set AtmosphereScore(value: number) {
    this.atmosphereScore = value;
  }
}
