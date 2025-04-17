import HttpStatusCode from "@app/core/infrastructure/enum/httpStatusCode";

export const fixtures = [
  { body: JSON.stringify({ "email": "example1@example.com", "name": "juam", "practice": 1 }), headers: {}, expectedStatus: HttpStatusCode.CREATED },
  { body: JSON.stringify({ "email": "example1@example.com", "name": "juan", "practice": 1 }), headers: {}, expectedStatus: HttpStatusCode.ALREADY_REPORTED },
  { body: JSON.stringify({ "email": "example2@example.com", "name": "name", "practice": 2 }), headers: {}, expectedStatus: HttpStatusCode.CREATED },
];
