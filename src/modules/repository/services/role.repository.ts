import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../database/entities/user.entity';
import { UserRoleEntity } from '../../../database/entities/user-role.entity';

@Injectable()
export class RoleRepository extends Repository<UserRoleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  async findOneByName(name: string): Promise<UserRoleEntity | undefined> {
    return await this.findOne({ where: { name } });
  }
}
