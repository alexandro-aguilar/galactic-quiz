//Injection
import types from './types';
import { inject, injectable } from 'inversify';
//Logging
import { logMethod } from '@app/core/decorators/logMethod';
//Architecture + framework
import BaseAPIGatewayController from '@app/core/infrastructure/controller/BaseAPIGatewayController';
import ApiGatewayControllerResponse from '@app/core/infrastructure/controller/ApiGatewayControllerResponse';
import UseCase from '@app/core/application/useCase/UseCase';
import BaseMapper from '@app/core/domain/mapper/BaseMapper';

//Tools
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import HttpStatusCode from '../../../core/infrastructure/enum/httpStatusCode';

//Domain
import Score from './Score';
import ScoreDto from './ScoreDto';

@injectable()
export default class SaveScoreController extends BaseAPIGatewayController<void> {
  constructor(
    @inject(types.ResponseMapper) responseMapper: BaseMapper<ApiGatewayControllerResponse<void>, APIGatewayProxyResultV2>,
    @inject(types.SaveScoreUseCase) private readonly saveScoreUseCase: UseCase<Score, Promise<boolean>>
  ) {
    super(
      responseMapper,
    );
  }

  @logMethod()
  async run(event: APIGatewayProxyEventV2): Promise<ApiGatewayControllerResponse<void>> {
    const body: ScoreDto = JSON.parse(event.body as string);
    const score = new Score(body.email, body.score);
    const scoreResult: boolean = await this.saveScoreUseCase.execute(score);
    const statusCode = scoreResult ? HttpStatusCode.OK : HttpStatusCode.NOT_MODIFIED;
    const response = new ApiGatewayControllerResponse<void>({statusCode});
    return response;
  }


}