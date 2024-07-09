import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarEntity } from '../../../database/entities/car.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarListReqDto } from '../../cars/dto/req/car-list.req.dto';

@Injectable()
export class CarRepository extends Repository<CarEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarEntity, dataSource.manager);
  }

  public async getList(
    userData: IUserData,
    query: CarListReqDto,
  ): Promise<[CarEntity[], number]> {
    const qb = this.createQueryBuilder('car');
    qb.where('car.user_id = :userId', { userId: userData.userId });

    if (query.tag) {
      qb.andWhere('car.tag = :tag', { tag: query.tag });
    }

    if (query.search) {
      qb.andWhere(
        'LOWER(car.brand) LIKE :search OR LOWER(car.model) LIKE :search',
        { search: `%${query.search.toLowerCase()}%` },
      );
    }

    if (query.limit) {
      qb.take(query.limit);
    }

    if (query.offset) {
      qb.skip(query.offset);
    }

    return await qb.getManyAndCount();
  }

  public async findCarById(carId: string): Promise<CarEntity | undefined> {
    return await this.findOne({ where: { id: carId } });
  }
}
