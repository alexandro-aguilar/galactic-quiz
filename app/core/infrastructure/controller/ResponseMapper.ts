import { APIGatewayProxyResultV2 } from 'aws-lambda';
import BaseMapper from './BaseMapper';
import { injectable } from 'inversify';
import ApiGatewayControllerResponse from './ApiGatewayControllerResponse';
import HttpStatusCode from '@app/utils/httpStatusCode';

@injectable()
export default class ResponseMapper<T> extends BaseMapper<ApiGatewayControllerResponse<T>, APIGatewayProxyResultV2> {
  protected transform(response: ApiGatewayControllerResponse<T> & { headers: object }): APIGatewayProxyResultV2 {
    console.log('adios', response);
    return {
      statusCode: HttpStatusCode.OK ?? response.statusCode,
      body: JSON.stringify(response.body),
      headers: {
        ...response.headers,
      }
    }
  }
}