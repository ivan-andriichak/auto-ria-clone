import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class CreateCarReqDto {
  @IsString()
  @MaxLength(255)
  producer: string; // Виробник автомобіля

  @IsString()
  model: string; // Модель автомобіля

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number; // Рік випуску

  @IsInt()
  @Min(0)
  mileage: number; // Пробіг

  @IsString()
  @MaxLength(255)
  fuelType: string; // Тип палива

  @IsString()
  @MaxLength(255)
  transmission: string; // Тип трансмісії

  @IsString()
  @MaxLength(255)
  bodyType: string; // Тип кузова

  @IsNumber()
  @Min(0)
  price: number; // Ціна

  @IsOptional()
  @IsString()
  @MaxLength(255)
  color?: string; // Колір (необов'язкове поле)

  @IsString()
  userId: string; // ID користувача
}
