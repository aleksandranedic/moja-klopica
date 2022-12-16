export interface CreateReviewDto {
  comment: string;
  restaurantId: number;
  clientId: number;
  generalScore: number;
  atmosphereScore: number;
}
