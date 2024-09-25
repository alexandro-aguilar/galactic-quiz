import SaveScoreController from './SaveScoreController';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEventV2) => {
  const saveScoreController = new SaveScoreController();
  const response = await saveScoreController.execute(event);
  return response;
};