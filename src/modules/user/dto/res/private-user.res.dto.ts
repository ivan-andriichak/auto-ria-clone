import { PickType } from '@nestjs/swagger';

import { BaseUserResDto } from './base-user.res';

export class PrivateUserResDto extends PickType(BaseUserResDto, [
  'id',
  'name',
  'age',
  'avatar',
  'email',
]) {}
