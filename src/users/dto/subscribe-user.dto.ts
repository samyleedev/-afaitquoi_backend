import {
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsDate,
  MinLength,
  Min,
  Max,
  IsEmail,
  MaxLength,
} from 'class-validator';

export class SubscribeUserDto {
  @MinLength(3)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
