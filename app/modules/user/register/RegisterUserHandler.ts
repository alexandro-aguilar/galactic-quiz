import 'reflect-metadata';
import container from './container';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import types from './types';
import BaseAPIGatewayController from '@app/core/infrastructure/controller/BaseAPIGatewayController';

export const handler = async (event: APIGatewayProxyEventV2) => {
  const userRegisterController: BaseAPIGatewayController<void> = container.get(types.RegisterUserController);
  const response = await userRegisterController.execute(event);
  return response;
};