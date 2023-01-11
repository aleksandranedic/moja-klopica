import { ApiProperty } from '@nestjs/swagger';

export type localStrategyPayload = {
  email: string;
  id: number;
};

export class CredentialsDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class JwtToken {
  @ApiProperty()
  access_token: string;
}

export class ConfirmationToken {
  @ApiProperty()
  token: string;
}
