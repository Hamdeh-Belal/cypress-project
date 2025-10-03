interface IEmployeeData {
  empNumber: number;
  managerName: string;
}

interface IJobData {
  jobTitleId: number;
}

interface IVacancyData {
  vacancyId: number;
  vacancyName: string;
}
interface IPrepareVacancy {
  employeeData: IEmployeeData;
  jobData: IJobData;

  vacancyData: IVacancyData;
}
interface ICreatePimTitle {
  joinedDate: null | string;
  jobTitleId: number;
  empStatusId: number;
  subunitId: number;
}
interface ICreateJobTitle {
  title: string;
  description: string;
  specification: null;
  note: string;
}
interface ICreateVacancy {
  name: string;
  jobTitleId: number;
  employeeId: number;
  numOfPositions: number;
  description: string;
  status: boolean;
  isPublished: boolean;
}
