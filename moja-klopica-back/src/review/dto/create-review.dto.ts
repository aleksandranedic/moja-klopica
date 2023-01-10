import { IsNotEmpty, IsPositive, IsString, Length } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  comment: string;
  @IsNotEmpty()
  @IsPositive()
  restaurantId: number;
  @IsNotEmpty()
  @IsPositive()
  clientId: number;
  @IsNotEmpty()
  @IsPositive()
  generalScore: number;
  @IsNotEmpty()
  @IsPositive()
  atmosphereScore: number;
}
