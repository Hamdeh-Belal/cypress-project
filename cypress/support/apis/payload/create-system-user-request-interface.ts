export interface ICreateSystemUserRequest {
  username: string;
  password: string;
  status: boolean;
  userRoleId: number;
  empNumber: number;
}
