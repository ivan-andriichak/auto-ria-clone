import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class BaseCarReqDto {
  @IsString()
  @Length(3, 30)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  brand: string;

  @IsString()
  @Length(3, 30)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  model: string;

  @IsInt()
  @Min(1900)
  @Transform(TransformHelper.toInt)
  @Type(() => Number)
  year: number;

  @IsString()
  @Transform(TransformHelper.trim)
  @Type(() => String)
  color: string;

  @IsInt()
  @Transform(TransformHelper.toInt)
  @Type(() => Number)
  mileage: number;

  @IsInt()
  @Transform(TransformHelper.toInt)
  @Type(() => Number)
  price: number;

  @IsString()
  @Transform(TransformHelper.trim)
  @Type(() => String)
  currency: string;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @Type(() => String)
  additionalInfo?: string;

  @IsString()
  userId: string;
}
