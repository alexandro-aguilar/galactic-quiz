import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import Controller from './Controller';
import ApiGatewayControllerResponse from './ApiGatewayControllerResponse';
import { inject, injectable } from 'inversify';
import types from '../../presentation/coreTypes';
import BaseMapper from './BaseMapper';

@injectable()
export default abstract class BaseAPIGatewayController<Response> implements Controller<APIGatewayProxyEventV2, APIGatewayProxyResultV2> {
  constructor(
    @inject(types.ResponseMapper) private readonly responseMapper?: BaseMapper<ApiGatewayControllerResponse<Response>, APIGatewayProxyResultV2>
  ) {}

  protected abstract run(event: APIGatewayProxyEventV2): Promise<ApiGatewayControllerResponse<Response>>;

  async execute(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
      const result: ApiGatewayControllerResponse<Response> = await this.run(event);
      console.log('mapper', this.responseMapper);
      console.log('hola', this.responseMapper?.execute(result));
      return this.responseMapper?.execute(result) as APIGatewayProxyResultV2;
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      };
    }
  }
}