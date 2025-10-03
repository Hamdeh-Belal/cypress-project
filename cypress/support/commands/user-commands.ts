import { ICreatePIMUserRequest } from "../apis/payload/create-pim-user-request-interface";
import { ICreateSystemUserRequest } from "../apis/payload/create-system-user-request-interface";
import { IDeleteUserRequest } from "../apis/payload/delete-user-request-interface";
import {
  IPIMUserResponse,
  ISystemUserResponse,
  IDeleteUserResponse,
} from "../apis/response/user-response-interface";

declare global {
  namespace Cypress {
    interface Chainable {
      SystemUserRequest<T>(
        method: string,
        url: string,
        body: ICreateSystemUserRequest
      ): Chainable<Response<ISystemUserResponse>>;
    }
    interface Chainable {
      DeleteUserRequest<T>(
        method: string,
        url: string,
        body: IDeleteUserRequest
      ): Chainable<Response<IDeleteUserResponse>>;
    }
    interface Chainable {
      PIMUserRequest<T>(
        method: string,
        url: string,
        body: ICreatePIMUserRequest
      ): Chainable<Response<IPIMUserResponse>>;
    }
  }
}

Cypress.Commands.add(
  "SystemUserRequest",
  <T>(
    method: string,
    url: string,
    payload: ICreateSystemUserRequest
  ): Cypress.Chainable<Cypress.Response<ISystemUserResponse>> => {
    return cy.request<ISystemUserResponse>({
      method,
      url,
      body: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
);
Cypress.Commands.add(
  "DeleteUserRequest",
  <T>(
    method: string,
    url: string,
    payload: IDeleteUserRequest
  ): Cypress.Chainable<Cypress.Response<IDeleteUserResponse>> => {
    return cy.request<IDeleteUserResponse>({
      method,
      url,
      body: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
);
Cypress.Commands.add(
  "PIMUserRequest",
  <T>(
    method: string,
    url: string,
    payload: ICreatePIMUserRequest
  ): Cypress.Chainable<Cypress.Response<IPIMUserResponse>> => {
    return cy.request<IPIMUserResponse>({
      method,
      url,
      body: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
);
