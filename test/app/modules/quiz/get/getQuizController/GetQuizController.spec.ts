/* eslint-disable @typescript-eslint/no-explicit-any */
import GetQuizController from '@app/modules/quiz/get/GetQuizController';
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { fixtures, fixtures2, mockQuiz } from './fixtures';
import ResponseMapper from '@app/core/infrastructure/controller/ResponseMapper';

describe('GetQuizController - Base Case', () => {
  let getQuizController: GetQuizController;

  const mockGetQuizRepository = {
    execute: jest.fn().mockResolvedValue(mockQuiz),
  };

  beforeEach(() => {
    getQuizController = new GetQuizController(mockGetQuizRepository as any);
    (getQuizController as any).responseMapper = new ResponseMapper();
    console.log('getQuizController', getQuizController);
  });

  test.each(fixtures)(
    'Given a type, When the controller is called, Then it should return status $expectedStatus and the correct quiz data',
    async ({ pathParameters, headers, expectedStatus, expectedResponse }) => {
      // Arrange
      const request = { pathParameters, headers } as unknown as APIGatewayProxyEventV2;

      // Act
      const response: APIGatewayProxyStructuredResultV2 = await getQuizController.execute(request) as APIGatewayProxyStructuredResultV2;
      
      // Assert
      expect(response.statusCode).toBe(expectedStatus);
      expect(response.body).toBe(expectedResponse);
    }
  );
});

describe('GetQuizController - Error', () => {
  let getQuizController: GetQuizController;

  const mockGetQuizRepository = {
    execute: () => { throw new Error('Error getting object'); },
  };

  beforeEach(() => {
    getQuizController = new GetQuizController(mockGetQuizRepository as any);
  });

  test.each(fixtures2)(
    'Given a controller call, When the controller invokes the Repository and it throws an error, Then it should return status $expectedStatus and the correct error data',
    async ({ pathParameters, headers, expectedStatus, expectedResponse }) => {
      // Arrange
      const request = { pathParameters, headers } as unknown as APIGatewayProxyEventV2;

      // Act
      const response: APIGatewayProxyStructuredResultV2 = await getQuizController.execute(request) as APIGatewayProxyStructuredResultV2;
      
      // Assert
      expect(response.statusCode).toBe(expectedStatus);
      expect(response.body).toBe(expectedResponse);
    }
  );
});