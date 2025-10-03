import { CANDIDATE_STATUS } from "../../support/enum/candidate-enums";
import { recruitmentHelper } from "../../support/helper/recruitment-helper";
import { candidatesPage } from "../../support/pages/candidates/candidate-page";
import LoginPage from "../../support/pages/login-page";

describe("Validate Candidates", () => {
  let employeeData: IEmployeeData;
  let jobData: IJobData;
  let vacancyData: IVacancyData;

  beforeEach(() => {
    cy.fixture("users").as("users");
    LoginPage.visit();
    cy.get("@users").then((users: any) => {
      cy.login(users.valid.username, users.valid.password);
    });
    return recruitmentHelper.prepareVacancy().then((data) => {
      employeeData = data.employeeData;
      jobData = data.jobData;
      vacancyData = data.vacancyData;
    });
  });

  afterEach(() => {
    return recruitmentHelper.cleanupEntities(
      employeeData.empNumber,
      jobData.jobTitleId,
      vacancyData.vacancyId
    );
  });

  it("Recruitment – Candidates Page: Add, Search, Shortlist & Interview", () => {
    cy.fixture("candidate-info").as("candidate");
    cy.get("@candidate").then((candidate: any) => {
      cy.fixture("job").as("job");
      return cy.get("@job").then((job: any) => {
        candidatesPage.visitCandidatePage();
        candidatesPage.addButton();
        candidatesPage.enterFirstName(candidate.valid.firstName);
        candidatesPage.enterMiddleName(candidate.valid.middleName);
        candidatesPage.enterLastName(candidate.valid.lastName);

        candidatesPage.selectVacancy(vacancyData.vacancyName);

        candidatesPage.enterEmail(candidate.valid.email);
        candidatesPage.enterContactNumber(candidate.valid.contactNumber);
        candidatesPage.uploadResume();
        candidatesPage.enterKeywords(candidate.valid.keywords);
        candidatesPage.enterNote(candidate.valid.note);
        candidatesPage.saveButton();

        candidatesPage.visitCandidatePage();

        const candidateName = `${candidate.valid.firstName}`;

        candidatesPage.searchCandidateName(candidateName);
        candidatesPage.searchButton();
        candidatesPage.validateCandidateRow(
          vacancyData.vacancyName,
          candidateName,
          employeeData.managerName,
          CANDIDATE_STATUS.APPLICATION_INITIATED
        );
        candidatesPage.shortlisted();
        candidatesPage.saveButton();

        candidatesPage.visitCandidatePage();

        candidatesPage.searchCandidateName(candidateName);
        candidatesPage.searchButton();
        candidatesPage.validateCandidateRow(
          vacancyData.vacancyName,
          candidateName,
          employeeData.managerName,
          CANDIDATE_STATUS.SHORTLISTED
        );

        candidatesPage.scheduleInterview();

        candidatesPage.enterInterviewTitle(job.interview.title);
        candidatesPage.enterInterviewerName(employeeData.managerName);
        candidatesPage.enterData(job.interview.date);
        candidatesPage.enterTime(job.interview.time);
        candidatesPage.saveButton();
        candidatesPage.visitCandidatePage();
        candidatesPage.searchCandidateName(candidateName);
        candidatesPage.searchButton();
        candidatesPage.validateCandidateRow(
          vacancyData.vacancyName,
          candidateName,
          employeeData.managerName,
          CANDIDATE_STATUS.INTERVIEW_SCHEDULED
        );
        candidatesPage.passInterview();
        candidatesPage.saveButton();
        candidatesPage.visitCandidatePage();
        candidatesPage.searchCandidateName(candidateName);
        candidatesPage.searchButton();
        candidatesPage.validateCandidate(
          vacancyData.vacancyName,
          candidateName,
          employeeData.managerName,
          CANDIDATE_STATUS.INTERVIEW_PASSED
        );
      });
    });
  });
});
