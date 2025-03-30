import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { fixtures } from "./fixtures";
import { handler } from "@app/modules/quiz/get/GetQuizHandler";

describe('GetQuiz - Integration', () => {
  test.each(fixtures)('Given a quiz request $pathParameters, when the handler is invoked, then it should return status $expectedStatus and handle the quiz data correctly.',
    async ({ pathParameters, headers, expectedStatus }) => {
      // Arrange
      const request = { pathParameters, headers } as unknown as APIGatewayProxyEventV2;
      // Act
      const response = await handler(request) as APIGatewayProxyStructuredResultV2;
      const body = JSON.parse(response.body as string);
      // Assert
      expect(response).toHaveProperty('statusCode');
      expect(response.statusCode).toBe(expectedStatus);
      expect(response).toHaveProperty('body');
      expect(response.body).toBeDefined();
      expect(body).not.toBeNull();
      expect(body).toHaveProperty('questions');
      expect(Array.isArray(body.questions)).toBe(true);
    }
  );
});