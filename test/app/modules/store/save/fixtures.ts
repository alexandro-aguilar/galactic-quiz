import HttpStatusCode from "@app/core/infrastructure/enum/httpStatusCode";
import { register } from "module";

export const fixtures4Setup = ["example1@example.com", "example2@example.com"];


export const fixtures = [
  { body: JSON.stringify({ "email": "example1@example.com", "score": "5" }), headers: {}, expectedStatus: HttpStatusCode.OK },
  { body: JSON.stringify({ "email": "example1@example.com", "score": "4" }), headers: {}, expectedStatus: HttpStatusCode.NOT_MODIFIED },
  { body: JSON.stringify({ "email": "example2@example.com", "score": "5" }), headers: {}, expectedStatus: HttpStatusCode.OK },
  { body: JSON.stringify({ "email": "example9@example.com", "score": "6" }), headers: {}, expectedStatus: HttpStatusCode.NOT_MODIFIED },
];