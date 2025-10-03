import {
  ICreateUserRequest,
  ICreateUserResponse,
} from "../../interfaces/users-interface";

const LOCATORS = {
  URL: "https://reqres.in/api/users",
};

export class ReqresUserHelper {
  static createUser(payload: ICreateUserRequest) {
    return cy.apiRequest<ICreateUserResponse>("POST", LOCATORS.URL, payload);
  }
}
