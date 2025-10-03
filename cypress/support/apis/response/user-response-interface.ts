import { ICreatePIMUserResponse } from "./create-pim-user-response-interface";
import { ICreateSystemUserResponse } from "./create-system-user-response-interface";

export interface IPIMUserResponse {
  data: ICreatePIMUserResponse;
  meta: unknown[];
  rels: unknown[];
}
export interface ISystemUserResponse {
  data: ICreateSystemUserResponse;
  meta: unknown[];
  rels: unknown[];
}
export interface IDeleteUserResponse {
  data: string[];
  meta: unknown[];
  rels: unknown[];
}
