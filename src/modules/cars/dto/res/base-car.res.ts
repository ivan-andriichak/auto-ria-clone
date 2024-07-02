import { ApiProperty } from '@nestjs/swagger';

export class BaseCarResDto {
  @ApiProperty({
    example: '123456',
    description: 'Car ID',
  })
  id: string;

  @ApiProperty({
    example: 'Toyota',
    description: 'Producer',
  })
  public readonly producer: string;

  @ApiProperty({
    example: 'Camry',
    description: 'Model',
  })
  public readonly model: string;

  @ApiProperty({
    example: 2020,
    description: 'Year',
  })
  public readonly year: number;

  @ApiProperty({
    example: 10000,
    description: 'Mileage',
  })
  public readonly mileage: number;

  @ApiProperty({
    example: 'Petrol',
    description: 'Fuel Type',
  })
  public readonly fuelType: string;

  @ApiProperty({
    example: 'Automatic',
    description: 'Transmission',
  })
  public readonly transmission: string;

  @ApiProperty({
    example: 'Sedan',
    description: 'Body Type',
  })
  public readonly bodyType: string;

  @ApiProperty({
    example: 25000,
    description: 'Price',
  })
  public readonly price: number;

  @ApiProperty({
    example: 'Red',
    description: 'Color',
  })
  public readonly color?: string;

  @ApiProperty({
    example: 'user123',
    description: 'User ID',
  })
  public readonly userId: string;
}
