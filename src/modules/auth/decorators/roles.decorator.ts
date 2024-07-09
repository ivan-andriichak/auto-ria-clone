import { SetMetadata } from '@nestjs/common';

import { Role } from '../enums/user-role.enum'; // шлях до вашого файлу з енумом

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
