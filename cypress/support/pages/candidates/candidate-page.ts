import { RECRUITMENT_BUTTONS } from "../../enum/candidate-enums";
import { APP_MODULES } from "../../enum/modules-enums";

const LOCATORS = {
  DROPDOWN: ".oxd-select-text--after",
  DROPDOWN_INPUT: ".oxd-select-text-input",
  DROPDOWN_OPTION: ".oxd-select-dropdown",
  UPLOAD_FILE: 'input[type="file"]',
  UPLOAD_FILE_BUTTON: ".oxd-file-button",
  FIRST_NAME: 'input[name="firstName"]',
  MIDDLE_NAME: 'input[name="middleName"]',
  LAST_NAME: 'input[name="lastName"]',
  LIST_ROW: '[role="row"]',
  CANDIDATE_NAME_INPUT: 'input[placeholder="Type for hints..."]',
  CANDIDATE_NAME_DROPDOWN: ".oxd-autocomplete-dropdown",
  EYE_BUTTON: ".oxd-icon.bi-eye-fill",
  INTERVIEWER_NAME_INPUT: 'input[placeholder="Type for hints..."]',
  INTERVIEWER_NAME_DROPDOWN: ".oxd-autocomplete-option",
  NOTE: 'textarea[placeholder="Type here"].oxd-textarea',
  DOWNLOAD_BUTTON: ".oxd-icon.bi-download",
  EMAIL: 'input[placeholder="Type here"].oxd-input--active',
  CONTACT_NUMBER: 'input[placeholder="Type here"].oxd-input--active',
  KEYWORDS: 'input[placeholder="Enter comma seperated words..."]',
  SUBMIT_BUTTON: 'button[type="submit"]',
  BUTTON_BUTTON: 'button[type="button"]',
  INTERVIEW_TITLE:
    'input.oxd-input.oxd-input--active:not([readonly]):not([placeholder="Search"])',
  DATE: 'input[placeholder="yyyy-dd-mm"]',
  TIME: 'input[placeholder="hh:mm"]',
};

class CandidatesPage {
  visitCandidatePage() {
    cy.get("a").contains(APP_MODULES.RECRUITMENT).click();
  }
  addButton() {
    cy.get("button").contains("Add").click();
  }
  enterFirstName(firstName: string) {
    cy.get(LOCATORS.FIRST_NAME).type(firstName);
  }
  enterMiddleName(middleName: string) {
    cy.get(LOCATORS.MIDDLE_NAME).type(middleName);
  }
  enterLastName(lastName: string) {
    cy.get(LOCATORS.LAST_NAME).type(lastName);
  }
  selectVacancy(vacancyName: string) {
    cy.get(LOCATORS.DROPDOWN).first().click();
    cy.get(LOCATORS.DROPDOWN_OPTION).contains(vacancyName).click();
  }
  enterEmail(email: string) {
    cy.get(LOCATORS.EMAIL).first().type(email);
  }
  enterContactNumber(contactNumber: string) {
    cy.get(LOCATORS.CONTACT_NUMBER).last().type(contactNumber);
  }
  uploadResume() {
    cy.get(LOCATORS.UPLOAD_FILE_BUTTON).click();
    cy.fixture("resume.pdf", null).as("resume");
    cy.get(LOCATORS.UPLOAD_FILE).selectFile("@resume", { force: true });
  }

  enterKeywords(keywords: string) {
    cy.get(LOCATORS.KEYWORDS).type(keywords);
  }
  enterNote(note: string) {
    cy.get(LOCATORS.NOTE).last().type(note);
  }
  saveButton() {
    cy.get(LOCATORS.SUBMIT_BUTTON).contains(RECRUITMENT_BUTTONS.SAVE).click();
  }
  searchCandidateName(name: string) {
    cy.get(LOCATORS.CANDIDATE_NAME_INPUT).type(name);
    cy.get(LOCATORS.CANDIDATE_NAME_DROPDOWN).contains(name).click();
  }
  searchButton() {
    cy.get(LOCATORS.SUBMIT_BUTTON).contains(RECRUITMENT_BUTTONS.SEARCH).click();
  }
  validateCandidateRow(
    vacancy: string,
    name: string,
    hiringManager: string,
    status: string
  ) {
    cy.get(LOCATORS.LIST_ROW)
      .should("contain", name)
      .and("be.visible")
      .and("contain", vacancy)
      .and("contain", hiringManager)
      .and("contain", status)
      .find(LOCATORS.EYE_BUTTON)
      .click();
  }
  validateCandidate(
    vacancy: string,
    name: string,
    hiringManager: string,
    status: string
  ) {
    cy.get(LOCATORS.LIST_ROW)
      .should("contain", name)
      .and("be.visible")
      .and("contain", vacancy)
      .and("contain", hiringManager)
      .and("contain", status)
      .find(LOCATORS.DOWNLOAD_BUTTON);
  }
  shortlisted() {
    cy.get(LOCATORS.BUTTON_BUTTON)
      .contains(RECRUITMENT_BUTTONS.SHORTLIST)
      .click();
    cy.get(LOCATORS.NOTE).type("Lets Go!");
  }
  scheduleInterview() {
    cy.get(LOCATORS.BUTTON_BUTTON)
      .contains(RECRUITMENT_BUTTONS.SCHEDULE_INTERVIEW)
      .click();
  }
  enterInterviewTitle(title: string) {
    cy.get(LOCATORS.INTERVIEW_TITLE).first().type(title);
  }
  enterInterviewerName(name: string) {
    cy.get(LOCATORS.INTERVIEWER_NAME_INPUT).type(name);
    cy.get(LOCATORS.INTERVIEWER_NAME_DROPDOWN).contains(name).click();
  }
  enterData(date: string) {
    cy.get(LOCATORS.DATE).clear().type(date);
  }
  enterTime(time: string) {
    cy.get(LOCATORS.TIME).clear().type(time);
  }

  passInterview() {
    cy.get(LOCATORS.BUTTON_BUTTON)
      .contains(RECRUITMENT_BUTTONS.MARK_INTERVIEW_PASSED)
      .click();
  }
}
export const candidatesPage = new CandidatesPage();
