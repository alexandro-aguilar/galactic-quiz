import { APIGatewayProxyEventV2 } from 'aws-lambda';
import GetQuizController from './GetQuizController';

export const handler = async (event: APIGatewayProxyEventV2) => {
  const getQuizController = new GetQuizController();
  const response = await getQuizController.execute(event);
  return response;
};