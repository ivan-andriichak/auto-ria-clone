import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCarReqDto {
  @IsString()
  @MaxLength(255)
  producer: string;

  @IsString()
  model: string;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;

  @IsInt()
  @Min(0)
  mileage: number;

  @IsString()
  @MaxLength(255)
  fuelType: string;

  @IsString()
  @MaxLength(255)
  transmission: string;

  @IsString()
  @MaxLength(255)
  bodyType: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  color?: string;

  @IsString()
  userId: string;
}
