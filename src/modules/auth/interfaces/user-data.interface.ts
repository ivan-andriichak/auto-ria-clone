import { Role } from '../enums/user-role.enum';

export interface IUserData {
  userId: string;
  email: string;
  deviceId: string;
  roles: Role[];
  accountType: string;
}
