import { APIGatewayProxyEventV2 } from 'aws-lambda';
import User from './User';
import UserRegisterRepository from './RegisterUserRepository';
import HttpStatusCode from '../../../core/infrastructure/enum/httpStatusCode';
import UserDto from './UserDto';
import BaseAPIGatewayController from '@app/core/infrastructure/controller/BaseAPIGatewayController';
import ApiGatewayControllerResponse from '@app/core/infrastructure/controller/ApiGatewayControllerResponse';

export default class RegisterUserController extends BaseAPIGatewayController<void> {
  constructor(
    private readonly userRegisterRepository = new UserRegisterRepository()
  ) {
    super();
  }

  async run(event: APIGatewayProxyEventV2): Promise<ApiGatewayControllerResponse<void>> {
    const body: UserDto = JSON.parse(event.body as string);
    const user = new User(body.email, body.practice, body.name);
    const registrationResponse: boolean = await this.userRegisterRepository.execute(user);
    const statusCode = registrationResponse ? HttpStatusCode.CREATED : HttpStatusCode.OK;
    const response = new ApiGatewayControllerResponse<void>({statusCode});
    return response;
  }
}