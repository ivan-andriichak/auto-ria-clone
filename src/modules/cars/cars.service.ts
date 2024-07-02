import { Injectable } from '@nestjs/common';

import { CreateCarReqDto } from './dto/req/create-car.req.dto';
import { UpdateCarReqDto } from './dto/req/update-car.req.dto';
import { PrivateCarResDto } from './dto/res/private-car.res.dto';
import { PublicCarResDto } from './dto/res/public-car.res.dto';

@Injectable()
export class CarsService {
  private cars: PrivateCarResDto[] = []; // Тимчасовий масив для зберігання автомобілів

  public async create(dto: CreateCarReqDto): Promise<PrivateCarResDto> {
    const newCar = {
      ...dto,
      id: (this.cars.length + 1).toString(),
    };
    this.cars.push(newCar as PrivateCarResDto);
    return newCar as PrivateCarResDto;
  }

  public async findOne(id: string): Promise<PublicCarResDto> {
    const car = this.cars.find((car) => car.id === id);
    return car as PublicCarResDto;
  }

  public async update(id: string, dto: UpdateCarReqDto): Promise<any> {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    if (carIndex !== -1) {
      this.cars[carIndex] = { ...this.cars[carIndex], ...dto };
      return this.cars[carIndex];
    }
    return null;
  }

  public async remove(id: string): Promise<any> {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    if (carIndex !== -1) {
      const removedCar = this.cars.splice(carIndex, 1);
      return removedCar[0];
    }
    return null;
  }

  public async findByUser(userId: string): Promise<PublicCarResDto[]> {
    return this.cars.filter(
      (car) => car.userId === userId,
    ) as PublicCarResDto[];
  }
}
