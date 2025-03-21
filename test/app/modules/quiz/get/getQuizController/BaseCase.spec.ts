import GetQuizController from '@app/modules/quiz/get/GetQuizController';
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

describe('GetQuizController - Happy Path', () => {
  let getQuizController: GetQuizController;

  const mockQuiz = {
    toJson: () => ([
      {
        id: '1',
        type: 'multiple-choice',
        text: 'What is 2 + 2?',
        answers: [
          { id: 'a', text: '3' },
          { id: 'b', text: '4' },
          { id: 'c', text: '5' },
        ],
        rightAnswer: 'b',
      },
      {
        id: '2',
        type: 'multiple-choice',
        text: 'What is 3 + 3?',
        answers: [
          { id: 'a', text: '5' },
          { id: 'b', text: '6' },
          { id: 'c', text: '7' },
        ],
        rightAnswer: 'b',
      },
      {
        id: '3',
        type: 'multiple-choice',
        text: 'What is 4 + 4?',
        answers: [
          { id: 'a', text: '7' },
          { id: 'b', text: '8' },
          { id: 'c', text: '9' },
        ],
        rightAnswer: 'b',
      },
    ]),
  };

  const mockGetQuizRepository = {
    execute: jest.fn().mockResolvedValue(mockQuiz),
  };

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getQuizController = new GetQuizController(mockGetQuizRepository as any);
  });

  test.each([
    { pathParameters: { type: 1 }, headers: {}, expectedStatus: 200, expectedResponse: JSON.stringify(mockQuiz.toJson()) },
    { pathParameters: { type: 2 }, headers: {}, expectedStatus: 200, expectedResponse: JSON.stringify(mockQuiz.toJson()) },
    { pathParameters: { type: 3 }, headers: {}, expectedStatus: 200, expectedResponse: JSON.stringify(mockQuiz.toJson()) },
  ])(
    'Given a valid quizId ($quizId), When the controller is called, Then it should return status $expectedStatus and the correct quiz data',
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