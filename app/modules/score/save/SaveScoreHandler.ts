import 'reflect-metadata';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import BaseAPIGatewayController from '@app/core/infrastructure/controller/BaseAPIGatewayController';

import ScoreDto from './ScoreDto';
import types from '././types';
import container from '././container';


export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const saveScoreController = container.get<BaseAPIGatewayController<ScoreDto>>(types.SaveScoreController);
  const response = await saveScoreController.execute(event);
  return response;
};
