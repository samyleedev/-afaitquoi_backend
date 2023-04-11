import { UserRoleEnum } from 'src/enums/user-role.enum';

export interface PayloadInterface {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly role: UserRoleEnum;
}
