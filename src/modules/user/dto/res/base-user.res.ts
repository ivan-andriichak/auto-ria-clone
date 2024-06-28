import { ApiProperty } from '@nestjs/swagger';

export class BaseUserResDto {
  @ApiProperty({
    example: '123456',
    description: 'User Name',
  })
  id: string;

  @ApiProperty({
    example: 'Ivan',
    description: 'User Name',
  })
  public readonly name: string;

  @ApiProperty({
    example: 'test1@gmail.com',
    description: 'User Name',
  })
  public readonly email: string;

  @ApiProperty({
    example: 'https://www.example.com/image.png',
    description: 'User Image',
  })
  public readonly avatar?: string;

  @ApiProperty({
    example: '20',
    description: 'User Age',
  })
  public readonly age?: string;
}
