import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import Controller from './Controller';
import ApiGatewayControllerResponse from './ApiGatewayControllerResponse';
import { injectable } from 'inversify';
import BaseMapper from '@app/core/domain/mapper/BaseMapper';

@injectable()
export default abstract class BaseAPIGatewayController<Response> implements Controller<APIGatewayProxyEventV2, APIGatewayProxyResultV2> {
  
  constructor(
    private readonly responseMapper: BaseMapper<ApiGatewayControllerResponse<Response>, APIGatewayProxyResultV2>
  ) {}

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