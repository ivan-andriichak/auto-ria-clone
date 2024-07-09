import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import Profanity from 'profanity-js';

import { CarEntity } from '../../../database/entities/car.entity';
import { ArticleListReqDto } from '../../article/dto/req/article-list.req.dto';
import { Role } from '../../auth/enums/user-role.enum';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarRepository } from '../../repository/services/car.repository';
import { CreateCarReqDto } from '../dto/req/create-car.req.dto';
import { CarResDto } from '../dto/res/car.res.dto';
import { CarListResDto } from '../dto/res/car-list.res.dto';
import { ICarData } from '../interfaces/car-data.interface';
import { CarMapper } from './car.mapper';

@Injectable()
export class CarService {
  private readonly carRepository: CarRepository;
  private readonly profanity: Profanity;

  constructor() {
    this.profanity = new Profanity();
  }

  public async getList(
    carData: IUserData,
    query: ArticleListReqDto,
  ): Promise<CarListResDto> {
    const [entities, total] = await this.carRepository.getList(carData, query);
    return CarMapper.toListResponseDTO(entities, total, query);
  }

  public async getById(carId: string): Promise<CarResDto> {
    const car = await this.carRepository.findCarById(carId);
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return CarMapper.toResponseDTO(car);
  }

  public async createCar(
    userData: IUserData,
    carData: CreateCarReqDto,
  ): Promise<CarEntity> {
    if (!userData.roles.includes(Role.SELLER)) {
      throw new ForbiddenException(
        'You do not have permission to create cars.',
      );
    }

    const newCar = this.carRepository.create(carData);

    if (this.profanity.isProfane(newCar.additionalInfo)) {
      throw new Error(
        'The advertisement contains profanity and cannot be posted.',
      );
    }

    if (userData.accountType === 'basic') {
      const userCars = await this.carRepository.count({
        where: { owner: userData },
      });
      if (userCars >= 1) {
        throw new Error('Users with a basic account can only post one ad.');
      }
    }

    return await this.carRepository.save(newCar);
  }

  public async updateCar(
    carId: string,
    carData: Partial<CarEntity>,
    user: any,
  ): Promise<CarEntity> {
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new NotFoundException('Car not found.');
    }

    const allowedRoles = [Role.SELLER, Role.MANAGER, Role.ADMIN];

    const hasPermission =
      car.owner.id === user.userId ||
      allowedRoles.some((role) => user.roles.includes(role));

    if (!hasPermission) {
      throw new ForbiddenException(
        'You do not have permission to update this car.',
      );
    }

    Object.assign(car, carData);

    if (this.profanity.isProfane(car.additionalInfo)) {
      throw new Error(
        'The advertisement contains profanity and cannot be updated.',
      );
    }

    return await this.carRepository.save(car);
  }

  public async deleteCar(carId: string, user: any): Promise<void> {
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new NotFoundException('Car not found.');
    }

    const hasPermission =
      car.owner.id === user.userId || user.roles.some((role) => role);

    if (!hasPermission) {
      throw new ForbiddenException(
        'You do not have permission to delete this car.',
      );
    }

    await this.carRepository.remove(car);
  }

  public async getCarStatistics(carData: ICarData, user: any): Promise<any> {
    if (user.accountType !== 'premium') {
      throw new ForbiddenException('You do not have access to statistics.');
    }

    const car = await this.carRepository.findOne({
      where: { id: carData.carId },
      relations: ['owner'],
    });

    if (!car) {
      throw new NotFoundException('Car not found.');
    }

    const statistics: any = {};
    statistics.views = await this.getViewsCount(carData.carId);
    statistics.dailyViews = await this.getDailyViewsCount(carData.carId);
    statistics.weeklyViews = await this.getWeeklyViewsCount(carData.carId);
    statistics.monthlyViews = await this.getMonthlyViewsCount(carData.carId);
    statistics.averagePriceRegion = await this.getAveragePriceByRegion(car);
    statistics.averagePriceUkraine = await this.getAveragePriceInUkraine();
    return statistics;
  }

  private async getViewsCount(carId: string): Promise<number> {
    return 0; // Приклад заглушки
  }

  private async getDailyViewsCount(carId: string): Promise<number> {
    return 0; // Приклад заглушки
  }

  private async getWeeklyViewsCount(carId: string): Promise<number> {
    return 0; // Приклад заглушки
  }

  private async getMonthlyViewsCount(carId: string): Promise<number> {
    return 0; // Приклад заглушки
  }

  private async getAveragePriceByRegion(car: CarEntity): Promise<number> {
    return 0; // Приклад заглушки
  }

  private async getAveragePriceInUkraine(): Promise<number> {
    return 0; // Приклад заглушки
  }

  private containsProfanity(text: string): boolean {
    return this.profanity.isProfane(text);
  }
}
