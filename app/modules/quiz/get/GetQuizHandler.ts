import 'reflect-metadata';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import GetQuizController from './GetQuizController';
import container from './container';

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const getQuizController = container.get<GetQuizController>(GetQuizController);
  const response = await getQuizController.execute(event);
  return response;
};