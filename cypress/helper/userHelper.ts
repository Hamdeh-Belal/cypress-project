import { CreateUserRequest, CreateUserResponse } from "../interfaces/users";

const LOCATORS = {
    URL: "https://reqres.in/api/users"
}

export class UserHelper {
  static createUser(payload: CreateUserRequest) {
    return cy.apiRequest<CreateUserResponse>(
      "POST",
      LOCATORS.URL,
      payload
    );
  }
}
