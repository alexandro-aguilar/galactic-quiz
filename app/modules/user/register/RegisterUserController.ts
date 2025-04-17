import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import User from './User';
import HttpStatusCode from '../../../core/infrastructure/enum/httpStatusCode';
import UserDto from './UserDto';
import BaseAPIGatewayController from '@app/core/infrastructure/controller/BaseAPIGatewayController';
import ApiGatewayControllerResponse from '@app/core/infrastructure/controller/ApiGatewayControllerResponse';
import { inject, injectable } from 'inversify';
import types from './types';
import UseCase from '@app/core/application/useCase/UseCase';
import BaseMapper from '@app/core/domain/mapper/BaseMapper';
import { logMethod } from '@app/core/decorators/logMethod';

@injectable()
export default class RegisterUserController extends BaseAPIGatewayController<void> {
  constructor(
    @inject(types.ResponseMapper) responseMapper: BaseMapper<ApiGatewayControllerResponse<void>, APIGatewayProxyResultV2>,
    @inject(types.RegisterUserUseCase) private readonly registerUserUseCase: UseCase<User, Promise<boolean>>
  ) {
    super(
      responseMapper,
    );
  }

  @logMethod()
  async run(event: APIGatewayProxyEventV2): Promise<ApiGatewayControllerResponse<void>> {
    const body: UserDto = JSON.parse(event.body as string);
    const user = new User(body.email, body.practice, body.name);
    const registrationResult: boolean = await this.registerUserUseCase.execute(user);
    const statusCode = registrationResult ? HttpStatusCode.CREATED : HttpStatusCode.ALREADY_REPORTED;
    const response = new ApiGatewayControllerResponse<void>({statusCode});
    return response;
  }
}