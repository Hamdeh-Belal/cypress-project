import { BUZZ_BUTTONS } from "../../enum/buzz-module-enums";
import { APP_MODULES } from "../../enum/modules-enums";
import { SYSTEM_MESSAGES } from "../../enum/system-enum";

const LOCATORS = {
  POST_TEXT_AREA: `textarea[placeholder="What's on your mind?"]`,
  SUBMIT_BUTTON: 'button[type="submit"]',
  POST_CONTAINER:
    ".oxd-sheet.oxd-sheet--rounded.oxd-sheet--white.orangehrm-buzz",
  POST: ".orangehrm-buzz-post-body-text",
  TOAST_MESSAGE: ".oxd-toast",
};

class BuzzPage {
  postText: string = "";
  visitBuzzPage() {
    cy.get("nav").contains(APP_MODULES.BUZZ).click();
  }
  writePost() {
    cy.fixture("post-info").as("post");
    cy.get("@post").then((post: any) => {
      const randomStr = Math.random().toString(36).substring(2, 8);
      this.postText = `${post.post}${randomStr} -------------------------------`;
      cy.get(LOCATORS.POST_TEXT_AREA).type(this.postText);
    });
  }
  clickPost() {
    cy.get(LOCATORS.SUBMIT_BUTTON).contains(BUZZ_BUTTONS.POST).click();
  }
  verifyPost() {
    cy.get(LOCATORS.POST_CONTAINER)
      .first()
      .find(LOCATORS.POST)
      .should("contain.text", this.postText);
  }
  verifyMsg() {
    cy.get(LOCATORS.TOAST_MESSAGE, { timeout: 10000 })
      .should("be.visible", { timeout: 15000 })
      .and("contain", SYSTEM_MESSAGES.SUCCESSFULLY_SAVED);
  }
}
export const buzzPage = new BuzzPage();
