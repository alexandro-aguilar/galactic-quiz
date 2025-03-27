import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import Controller from './Controller';
import ApiGatewayControllerResponse from './ApiGatewayControllerResponse';
import { injectable } from 'inversify';
import BaseMapper from '@app/core/domain/mapper/BaseMapper';
import container from '@app/modules/user/register/container';
import types from '@app/modules/user/register/types';

@injectable()
export default abstract class BaseAPIGatewayController<Response> implements Controller<APIGatewayProxyEventV2, APIGatewayProxyResultV2> {
  private readonly responseMapper: BaseMapper<ApiGatewayControllerResponse<Response>, APIGatewayProxyResultV2>
  constructor() {
    this.responseMapper = container.get<BaseMapper<ApiGatewayControllerResponse<Response>, APIGatewayProxyResultV2>>(types.ResponseMapper);
  }

  protected abstract run(event: APIGatewayProxyEventV2): Promise<ApiGatewayControllerResponse<Response>>;

  async execute(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
      const result: ApiGatewayControllerResponse<Response> = await this.run(event);
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