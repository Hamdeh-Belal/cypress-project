export interface ICreateUserRequest {
  name: string;
  job: string;
}

export interface ICreateUserResponse {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}
