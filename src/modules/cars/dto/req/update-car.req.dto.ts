import { PickType } from '@nestjs/swagger';

import { BaseCarReqDto } from './base-car.req.dto';

export class UpdateCarReqDto extends PickType(BaseCarReqDto, [
  'brand',
  'model',
  'year',
  'color',
  'mileage',
  'price',
  'additionalInfo',
]) {}
