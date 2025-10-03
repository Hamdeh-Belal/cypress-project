export enum StatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum HeaderKey {
  CONTENT_TYPE = "content-type",
  ACCEPT = "Accept",
  X_API_KEY = "x-api-key",
  AUTHORIZATION = "Authorization",
}

export enum HeaderValues {
  CONTENT_TYPE = "application/json",
  X_API_KEY = Cypress.env("apiKey"),
}

export enum ResponseKey {
  PAGE = "page",
  DATA = "data",
  ARRAY = "array",
  STRING = "string",
  ID = "id",
  EMAIL = "email",
  FIRST_NAME = "first_name",
  LAST_NAME = "last_name",
  AVATAR = "avatar",
  TOKEN = "token",
  NAME = "name",
  JOB = "job",
  CREATED_AT = "createdAt",
}
