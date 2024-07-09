import { CarEntity } from '../../../database/entities/car.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { CarListReqDto } from '../dto/req/car-list.req.dto';
import { CarResDto } from '../dto/res/car.res.dto';
import { CarListResDto } from '../dto/res/car-list.res.dto';

export class CarMapper {
  public static toResponseDTO(entity: CarEntity): CarResDto {
    const carDto: CarResDto = {
      id: entity.id,
      brand: entity.brand,
      model: entity.model,
      year: entity.year,
      color: entity.color,
      mileage: entity.mileage,
      price: entity.price,
      additionalInfo: entity.additionalInfo,
    };

    if (entity.owner) {
      carDto.user = UserMapper.toResponseDTO(entity.owner);
    }

    return carDto;
  }

  public static toListResponseDTO(
    entities: CarEntity[],
    total: number,
    query: CarListReqDto,
  ): CarListResDto {
    return {
      data: entities.map(this.toResponseDTO),
      meta: {
        total,
        limit: query.limit,
        offset: query.offset,
      },
    };
  }
}
