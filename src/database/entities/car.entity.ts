import { Column, Entity, ManyToOne } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { UserEntity } from './user.entity';

@Entity({ name: TableNameEnum.CARS })
export class CarEntity extends BaseModel {
  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  mileage: number;

  @Column({ default: 'USD' })
  currency: 'USD' | 'EUR' | 'UAH';

  @Column({ type: 'text', nullable: true })
  additionalInfo?: string;

  @Column()
  year: number;

  @Column()
  color: string;

  @ManyToOne(() => UserEntity, (user) => user.cars)
  owner: UserEntity;
}
