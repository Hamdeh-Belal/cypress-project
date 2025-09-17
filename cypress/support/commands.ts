/// <reference types="cypress" />

import LoginPage from "./pages/login-page";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
    }
    interface Chainable {
      login_1(value: string, isUsername: boolean): Chainable<void>;
    }
    interface Chainable {
      apiRequest<T>(
        method: string,
        url: string,
        payload?: any
      ): Chainable<Response<T>>;
    }
  }
}

Cypress.Commands.add("login", (username: string, password: string) => {
  LoginPage.typeUsername(username);
  LoginPage.typePassword(password);
  LoginPage.submit();
});

Cypress.Commands.add("login_1", (value: string, isUsername: boolean) => {
  if (isUsername) {
    LoginPage.typeUsername(value);
  } else {
    LoginPage.typePassword(value);
  }

  LoginPage.submit();
});

Cypress.Commands.add(
  "apiRequest",
  <T>(
    method: string,
    url: string,
    payload?: any
  ): Cypress.Chainable<Cypress.Response<T>> => {
    return cy.request<T>({
      method,
      url,
      body: payload,
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });
  }
);
