import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  Length,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  password: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  surname: string;
  @ApiProperty({
    description: 'Phone number must start with +381',
  })
  @IsPhoneNumber('SR')
  @IsNotEmpty()
  phoneNumber: string;
}
