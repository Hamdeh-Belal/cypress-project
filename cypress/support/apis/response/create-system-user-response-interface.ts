import { IEmployeeResponse } from "./create-employee-response-interface";
import { IUserRoleResponse } from "./system-user-role-response-interface";

export interface ICreateSystemUserResponse {
  id: number;
  userName: string | null;
  deleted: boolean | null;
  status: boolean | null;
  employee: IEmployeeResponse | null;
  userRole: IUserRoleResponse | null;
}
