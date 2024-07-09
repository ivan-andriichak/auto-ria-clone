import { ApiProperty } from '@nestjs/swagger';

import { UserResDto } from '../../../user/dto/res/user.res.dto';

export class CarResDto {
  @ApiProperty({
    example: '796cea24-a328-4463-a5e1-85a779e4780f',
    description: 'Car ID',
  })
  id: string;

  @ApiProperty({
    example: 'Toyota',
    description: 'Car Make',
  })
  brand: string;

  @ApiProperty({
    example: 'Camry',
    description: 'Car Model',
  })
  model: string;

  @ApiProperty({
    example: 2021,
    description: 'Car Year',
  })
  year: number;

  @ApiProperty({
    example: 'Blue',
    description: 'Car Color',
  })
  @ApiProperty()
  color: string;

  @ApiProperty({
    example: 50000,
    description: 'Car Mileage',
  })
  mileage: number;

  @ApiProperty({
    example: 25000,
    description: 'Car Price',
  })
  price: number;

  @ApiProperty({
    example: 'Description of the car',
    description: 'Car Description',
    nullable: true,
  })
  additionalInfo?: string;

  user?: UserResDto;
}
