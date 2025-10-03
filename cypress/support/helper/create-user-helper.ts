import { ICreatePIMUserRequest } from "../apis/payload/create-pim-user-request-interface";
import { ICreateSystemUserRequest } from "../apis/payload/create-system-user-request-interface";
import { IDeleteUserRequest } from "../apis/payload/delete-user-request-interface";
import {
  IDeleteUserResponse,
  IPIMUserResponse,
  ISystemUserResponse,
} from "../apis/response/user-response-interface";
import { HttpMethod } from "../enum/http-enum";

const URLs = {
  PIM_USER_URL:
    "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees",
  ADMIN_USER_URL:
    "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users",
};

export class UserHelper {
  static createPIMUser(payload: ICreatePIMUserRequest) {
    return cy.PIMUserRequest<IPIMUserResponse>(
      HttpMethod.POST,
      URLs.PIM_USER_URL,
      payload
    );
  }

  static deletePIMUser(payload: IDeleteUserRequest) {
    return cy.DeleteUserRequest<IDeleteUserResponse>(
      HttpMethod.DELETE,
      URLs.PIM_USER_URL,
      payload
    );
  }
  static deleteSystemUser(payload: IDeleteUserRequest) {
    return cy.DeleteUserRequest<IDeleteUserRequest>(
      HttpMethod.DELETE,
      URLs.ADMIN_USER_URL,
      payload
    );
  }
  static createSystemUser(payload: ICreateSystemUserRequest) {
    return cy.SystemUserRequest<ISystemUserResponse>(
      HttpMethod.POST,
      URLs.ADMIN_USER_URL,
      payload
    );
  }
}
