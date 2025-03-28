import { APIGatewayProxyResultV2 } from 'aws-lambda';
import { injectable } from 'inversify';
import ApiGatewayControllerResponse from './ApiGatewayControllerResponse';
import HttpStatusCode from '@app/core/infrastructure/enum/httpStatusCode';
import BaseMapper from '@app/core/domain/mapper/BaseMapper';

@injectable()
export default class ResponseMapper<T> extends BaseMapper<ApiGatewayControllerResponse<T>, APIGatewayProxyResultV2> {
  protected transform(response: ApiGatewayControllerResponse<T> & { headers: object }): APIGatewayProxyResultV2 {
    return {
      statusCode: response.statusCode ?? HttpStatusCode.OK,
      body: JSON.stringify(response.body),
      headers: {
        ...response.headers,
      }
    }
  }
}