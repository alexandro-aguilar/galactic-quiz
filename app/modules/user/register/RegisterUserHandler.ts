import UserRegisterController from './RegisterUserController';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEventV2) => {
  const userRegisterController = new UserRegisterController();
  const response = await userRegisterController.execute(event);
  return response;
};