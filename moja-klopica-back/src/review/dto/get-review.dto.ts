import { ApiProperty } from '@nestjs/swagger';

export class GetReviewDto {
  @ApiProperty()
  public id: number;
  public comment: string;
  public generalScore: number;
  public atmosphereScore: number;
  public restaurant: { restaurantName: string; restaurantId: number };
  public client: { clientName: string; clientId: number };
  constructor(
    id: number,
    comment: string,
    generalScore: number,
    atmosphereScore: number,
    restaurant: { restaurantName: string; restaurantId: number },
    client: { clientName: string; clientId: number },
  ) {
    this.id = id;
    this.comment = comment;
    this.generalScore = generalScore;
    this.atmosphereScore = atmosphereScore;
    this.restaurant = restaurant;
    this.client = client;
  }
}
