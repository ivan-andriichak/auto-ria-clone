import { PickType } from '@nestjs/swagger';

import { BaseUserResDto } from './base-user.res';

export class PublicUserResDto extends PickType(BaseUserResDto, [
  'id',
  'name',
  'age',
  'avatar',
]) {}
