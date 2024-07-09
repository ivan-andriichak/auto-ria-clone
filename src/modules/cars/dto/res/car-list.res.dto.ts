import { ApiProperty } from '@nestjs/swagger';

import { CarResDto } from './car.res.dto';

export class CarListResDto {
  @ApiProperty({ type: [CarResDto] })
  data: CarResDto[];

  @ApiProperty()
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}
