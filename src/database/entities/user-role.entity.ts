import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { UserEntity } from './user.entity';

@Entity({ name: TableNameEnum.USER_ROLE })
export class UserRoleEntity extends BaseModel {
  @Column('text')
  name: string;

  @Column('text')
  role: string;

  @Column('text', { nullable: true })
  description: string;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.role)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
