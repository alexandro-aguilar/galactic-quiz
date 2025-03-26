import HttpStatusCode from '@app/core/infrastructure/enum/httpStatusCode';

export default class ApiGatewayControllerResponse<T> {
  private _body: T;
  private _statusCode?: HttpStatusCode;

  constructor(body: T, statusCode?: HttpStatusCode) {
    this._body = body;
    this._statusCode = statusCode;
  }

  get body(): T {
    return this._body;
  }

  get statusCode(): HttpStatusCode | undefined {
    return this._statusCode;
  }
}