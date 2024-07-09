import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

import { Role } from '../../../auth/enums/user-role.enum';

export class BaseUserRoleReqDto {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  userId: string;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  role: Role;
}
