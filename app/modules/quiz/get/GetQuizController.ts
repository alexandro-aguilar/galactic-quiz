import { APIGatewayProxyEventV2 } from 'aws-lambda';
import Quiz from './Quiz';
import BaseAPIGatewayController from '@app/core/infrastructure/controller/BaseAPIGatewayController';
import ApiGatewayControllerResponse from '@app/core/infrastructure/controller/ApiGatewayControllerResponse';
import { inject, injectable } from 'inversify';
import types from './types';
import Repository from '@app/core/domain/repository/Repository';

@injectable()
export default class GetQuizController extends BaseAPIGatewayController<object> {
  constructor(
    @inject(types.GetQuizRepository) private readonly getQuizRepository: Repository<number, Quiz>
  ) {
    super();
  }

  protected async run(event: APIGatewayProxyEventV2): Promise<ApiGatewayControllerResponse<object>> {
    const type: number = event.pathParameters?.type as unknown as number ?? 1;
    const quiz: Quiz = await this.getQuizRepository.execute(type);
    const response = new ApiGatewayControllerResponse<object>(quiz.toJson());
    return response;
  }
}