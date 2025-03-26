import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import User from './User';
import UserRegisterRepository from './RegisterUserRepository';
import HttpStatusCode from '../../../core/infrastructure/enum/httpStatusCode';
import UserDto from './UserDto';

export default class RegisterUserController {
  constructor(
    private readonly userRegisterRepository = new UserRegisterRepository()
  ) {}

  async execute(request: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    const body: UserDto = JSON.parse(request.body as string);
    const user = new User(body.email, body.practice, body.name);
    const registrationResponse: boolean = await this.userRegisterRepository.execute(user);

    return {
      statusCode: registrationResponse ? HttpStatusCode.CREATED : HttpStatusCode.OK
    };
  }
}