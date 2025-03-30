import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import Quiz from './Quiz';
import BaseAPIGatewayController from '@app/core/infrastructure/controller/BaseAPIGatewayController';
import ApiGatewayControllerResponse from '@app/core/infrastructure/controller/ApiGatewayControllerResponse';
import { inject, injectable } from 'inversify';
import types from './types';
import Repository from '@app/core/domain/repository/Repository';
import QuizDto from './QuizDto';
import BaseMapper from '@app/core/domain/mapper/BaseMapper';
import { logMethod } from '@app/core/decorators/logMethod';

@injectable()
export default class GetQuizController extends BaseAPIGatewayController<QuizDto> {
  constructor(
    @inject(types.ResponseMapper) responseMapper: BaseMapper<ApiGatewayControllerResponse<QuizDto>, APIGatewayProxyResultV2>,
    @inject(types.GetQuizRepository) private readonly getQuizRepository: Repository<number, Quiz>
  ) {
    super(
      responseMapper,
    );
  }

  @logMethod()
  protected async run(event: APIGatewayProxyEventV2): Promise<ApiGatewayControllerResponse<QuizDto>> {
    const type: number = event.pathParameters?.type as unknown as number ?? 1;
    const quiz: Quiz = await this.getQuizRepository.execute(type);
    const response = new ApiGatewayControllerResponse<QuizDto>({body: quiz.toJson()});
    return response;
  }
}