import GetQuizRepository from './GetQuizRepository';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import Quiz from './Quiz';
import BaseAPIGatewayController from '@app/core/controller/BaseAPIGatewayController';
import ApiGatewayControllerResponse from '@app/core/controller/ApiGatewayControllerResponse';
import { inject } from 'inversify';
import types from './types';

export default class GetQuizController extends BaseAPIGatewayController<object> {
  constructor(
    @inject(types.GetQuizRepository) private readonly getQuizRepository: GetQuizRepository
  ) {
    super();
  }

  protected async run(request: APIGatewayProxyEventV2): Promise<ApiGatewayControllerResponse<object>> {
    const type: number = request.pathParameters?.type as unknown as number ?? 1;
    const quiz: Quiz = await this.getQuizRepository.execute(type);
    const response = new ApiGatewayControllerResponse<object>(quiz.toJson());
    return response;
  }
}