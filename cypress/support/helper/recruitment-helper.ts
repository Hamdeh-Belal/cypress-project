import { ICreatePIMUserRequest } from "../apis/payload/create-pim-user-request-interface";
import { IDeleteUserRequest } from "../apis/payload/delete-user-request-interface";
import { HttpMethod } from "../enum/http-enum";
import { UserHelper } from "./create-user-helper";
const URLs = {
  PIM: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/`,
  PIM_TITLE: "/job-details",
  JOB_TITLE: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/job-titles`,
  VACANCY: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies`,
};

class RecruitmentHelper {
  emp_Number: number = -1;
  user_id: number = -1;
  job_title_id: number = -1;
  vacancies_id: number = -1;
  managerName: string = "";
  vacancyName: string = "";

  addHiringManager() {
    cy.fixture("hiring-manager").as("hiringManager");
    return cy.get("@hiringManager").then((hiringManager: any) => {
      const payload: ICreatePIMUserRequest = {
        empPicture: null,
        employeeId: hiringManager.valid.employeeId,
        firstName: hiringManager.valid.firstName,
        lastName: hiringManager.valid.lastName,
        middleName: hiringManager.valid.middleName,
      };

      return UserHelper.createPIMUser(payload)
        .then((response) => {
          expect(response.status).to.eq(200);
          this.emp_Number = response.body.data.empNumber;
          this.managerName = `${response.body.data.firstName} ${response.body.data.middleName} ${response.body.data.lastName}`;
        })
        .then(() => {
          const titlePayload: ICreatePimTitle = {
            joinedDate: null,
            jobTitleId: 23,
            empStatusId: 2,
            subunitId: 13,
          };
          return cy
            .request(
              HttpMethod.PUT,
              `${URLs.PIM}${this.emp_Number}${URLs.PIM_TITLE}`,
              titlePayload
            )
            .then((titleResponse) => {
              expect(titleResponse.status).to.eq(200);
            });
        });
    });
  }

  deleteHiringManager(managerId: number) {
    const body: IDeleteUserRequest = { ids: [managerId] };

    return UserHelper.deletePIMUser(body).then((response) => {
      expect(response.status).to.eq(200);
    });
  }
  addJopTitle() {
    cy.fixture("job").as("job");
    return cy.get("@job").then((job: any) => {
      const payload: ICreateJobTitle = {
        title: job.jobDetails.jobTitle,
        description: job.jobDetails.description,
        specification: null,
        note: job.jobDetails.note,
      };
      return cy
        .request(HttpMethod.POST, URLs.JOB_TITLE, payload)
        .then((response) => {
          expect(response.status).to.eq(200);
          this.job_title_id = response.body.data.id;
        });
    });
  }
  deleteJopTitle(jobId: number) {
    const payload: IDeleteUserRequest = { ids: [jobId] };
    return cy
      .request(HttpMethod.DELETE, URLs.JOB_TITLE, payload)
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  }
  addVacancy() {
    cy.fixture("job").as("job");
    return cy.get("@job").then((job: any) => {
      const payload: ICreateVacancy = {
        name: job.vacancies.name,
        jobTitleId: this.job_title_id,
        employeeId: this.emp_Number,
        numOfPositions: 1,
        description: job.vacancies.description,
        status: true,
        isPublished: true,
      };
      return cy
        .request(HttpMethod.POST, URLs.VACANCY, payload)
        .then((response) => {
          expect(response.status).to.eq(200);
          this.vacancies_id = response.body.data.id;
          this.vacancyName = response.body.data.name;
        });
    });
  }
  deleteVacancy(vacancyId: number) {
    const payload: IDeleteUserRequest = { ids: [vacancyId] };

    return cy
      .request(HttpMethod.DELETE, URLs.VACANCY, payload)
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  }

  prepareVacancy() {
    return this.addJopTitle()
      .then(() => {
        expect(this.job_title_id, "Job title should be set").to.not.eq(-1);

        return this.addHiringManager();
      })
      .then(() => {
        expect(this.emp_Number, "Employee number should be set").to.not.eq(-1);
        return this.addVacancy();
      })
      .then(() => {
        expect(this.vacancies_id, "Vacancy should be set").to.not.eq(-1);

        const employeeData: IEmployeeData = {
          empNumber: this.emp_Number,
          managerName: this.managerName,
        };

        const jobData: IJobData = {
          jobTitleId: this.job_title_id,
        };

        const vacancyData: IVacancyData = {
          vacancyId: this.vacancies_id,
          vacancyName: this.vacancyName,
        };
        const prepareData: IPrepareVacancy = {
          employeeData,
          jobData,
          vacancyData,
        };
        return prepareData;
      });
  }

  cleanupEntities(managerId: number, jobId: number, vacancyId: number) {
    return this.deleteVacancy(vacancyId)
      .then(() => this.deleteJopTitle(jobId))
      .then(() => this.deleteHiringManager(managerId));
  }
}

export const recruitmentHelper = new RecruitmentHelper();
