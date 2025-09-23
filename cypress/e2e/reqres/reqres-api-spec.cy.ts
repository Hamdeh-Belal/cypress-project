import { UserHelper } from "../../helper/user-helper";
import { ICreateUserRequest } from "../../interfaces/users-interface";

describe("Create New User", () => {
  it("Validate Create new user via Reqres API", () => {
    const requestBody: ICreateUserRequest = {
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
