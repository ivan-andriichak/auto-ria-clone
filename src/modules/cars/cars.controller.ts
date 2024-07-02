import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CarsService } from './cars.service';
import { CreateCarReqDto } from './dto/req/create-car.req.dto';
import { UpdateCarReqDto } from './dto/req/update-car.req.dto';
import { PrivateCarResDto } from './dto/res/private-car.res.dto';
import { PublicCarResDto } from './dto/res/public-car.res.dto';

@ApiBearerAuth()
@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Post()
  public async create(@Body() dto: CreateCarReqDto): Promise<PrivateCarResDto> {
    return await this.carsService.create(dto);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<PublicCarResDto> {
    return await this.carsService.findOne(id);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarReqDto,
  ): Promise<any> {
    return await this.carsService.update(id, updateCarDto);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<any> {
    return await this.carsService.remove(id);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get('user/:userId')
  public async findByUser(
    @Param('userId') userId: string,
  ): Promise<PublicCarResDto[]> {
    return await this.carsService.findByUser(userId);
  }
}
