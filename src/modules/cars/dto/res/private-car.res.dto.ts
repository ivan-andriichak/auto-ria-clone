import { PickType } from '@nestjs/swagger';

import { BaseCarResDto } from './base-car.res';

export class PrivateCarResDto extends PickType(BaseCarResDto, [
  'id',
  'producer',
  'model',
  'year',
  'mileage',
  'fuelType',
  'transmission',
  'bodyType',
  'price',
  'color',
  'userId',
]) {}
