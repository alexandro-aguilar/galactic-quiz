import 'reflect-metadata';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import container from './container';
import BaseAPIGatewayController from '@app/core/infrastructure/controller/BaseAPIGatewayController';
import QuizDto from './QuizDto';
import types from './types';

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const getQuizController = container.get<BaseAPIGatewayController<QuizDto>>(types.GetQuizController);
  const response = await getQuizController.execute(event);
  return response;
};