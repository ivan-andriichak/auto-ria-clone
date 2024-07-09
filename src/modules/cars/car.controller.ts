import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CarEntity } from '../../database/entities/car.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/user-role.enum';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CurrentCar } from './decorators/current-car.decorator';
import { CarListReqDto } from './dto/req/car-list.req.dto';
import { CreateCarReqDto } from './dto/req/create-car.req.dto';
import { CarResDto } from './dto/res/car.res.dto';
import { CarListResDto } from './dto/res/car-list.res.dto';
import { CarService } from './services/car.service';

@ApiTags('Cars')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  public async getList(
    @CurrentUser() userData: IUserData,
    @Query() query: CarListReqDto,
  ): Promise<CarListResDto> {
    return await this.carService.getList(userData, query);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  @Roles(Role.SELLER)
  public async createCar(
    @CurrentUser() userData: IUserData,
    @CurrentCar() carData: CreateCarReqDto,
    @Body() dto: CreateCarReqDto,
  ): Promise<CarResDto> {
    return await this.carService.createCar(userData, carData);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get(':carId')
  public async getById(
    @Param('carId', ParseUUIDPipe) carId: string,
  ): Promise<CarResDto> {
    return await this.carService.getById(carId);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Put(':id')
  @Roles(Role.SELLER, Role.MANAGER, Role.ADMIN)
  async updateCar(
    @Param('id', ParseUUIDPipe) carId: string,
    @Body() carData: CreateCarReqDto,
    @CurrentUser() userData: IUserData,
  ): Promise<CarResDto> {
    return await this.carService.updateCar(carId, carData, userData);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @Roles(Role.BUYER, Role.MANAGER, Role.ADMIN)
  async deleteCar(
    @Param('id', ParseUUIDPipe) carId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    return await this.carService.deleteCar(carId, userData);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get('statistics/:carId')
  @Roles(Role.SELLER)
  async getCarStatistics(
    @Param('carId', ParseUUIDPipe) carId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<any> {
    return await this.carService.getCarStatistics({ carId }, userData);
  }
}
