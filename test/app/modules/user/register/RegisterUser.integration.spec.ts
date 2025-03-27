import { handler } from '@app/modules/user/register/RegisterUserHandler';
import { fixtures } from './fixtures';
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

describe('GetQuizController - Base Case', () => {

  test.each(fixtures)(
    'Given a type, When the controller is called, Then it should return status $expectedStatus and the correct quiz data',
    async ({ body, headers, expectedStatus }) => {
      // Arrange
      const request = { body, headers } as unknown as APIGatewayProxyEventV2;

      // Act
      const response: any = await handler(request) as APIGatewayProxyStructuredResultV2;
      console.log('response', response);
      // Assert
      expect(response.statusCode).toBe(expectedStatus);
    }
  );
});