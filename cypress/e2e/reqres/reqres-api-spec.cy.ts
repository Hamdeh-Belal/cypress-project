/*
describe("Create New user", () => {
  it("Validate Create new user via Reqres API", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: {
        name: "morpheus",
        job: "leader",
      },
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("name", "morpheus");
      expect(response.body).to.have.property("job", "leader");
      expect(response.body.id).to.be.not.empty;
      cy.log('response body: ' + JSON.stringify(response.body))
    });
  });
});
*/

import { UserHelper } from "../../helper/userHelper";
import { CreateUserRequest } from "../../interfaces/users";

describe("Create New User", () => {
  it("Validate Create new user via Reqres API", () => {
    const requestBody: CreateUserRequest = {
      name: "morpheus",
      job: "leader",
    };

    UserHelper.createUser(requestBody).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("name", "morpheus");
      expect(response.body).to.have.property("job", "leader");
      expect(response.body.id).to.not.be.empty;
      expect(response.body.createdAt).to.not.be.empty;
      cy.log("Response body: " + JSON.stringify(response.body));
    });
  });
});


/**
 * Put api request in another file as method 
 * body in fixture 
 * status code as enums
 * class with users api and put methods for each api
 * properties of body inside locator or enum
 * headers in fixture
 * url in config file
 * custom command 
 * seperate the response and body using interfaces --> more control on api
 */



 /**
 * cypress command --> takes method, url, and payload. Takes chainable from the created interface
 * 
 * interfaces --> define the body or the response with its fields (for each body and response)
 * helper --> Has method (create user), and constant urls as LOCATORS. The method calls the cypress command with parameters 
 * Test case implementation
 */