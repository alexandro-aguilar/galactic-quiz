import HttpStatusCode from '@app/core/infrastructure/enum/httpStatusCode';

export default class ApiGatewayControllerResponse<T> {
  constructor(
    private _body: T,
    private _statusCode?: HttpStatusCode
  ) {}

  get body(): T {
    return this._body;
  }

  get statusCode(): HttpStatusCode | undefined {
    return this._statusCode;
  }
}