import { handler } from '@app/modules/user/register/RegisterUserHandler';
import { fixtures } from './fixtures';
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { DeleteItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import Environment from '@app/utils/Environment';

describe('GetQuizController - Base Case', () => {

  test.each(fixtures)('Given a user registration request $body, when the handler is invoked, then it should return status $expectedStatus and handle the user data correctly.',
    async ({ body, headers, expectedStatus }) => {
      // Arrange
      const request = { body, headers } as unknown as APIGatewayProxyEventV2;
      // Act
      const response = await handler(request) as APIGatewayProxyStructuredResultV2;
      // Assert
      expect(response).toHaveProperty('statusCode');
      expect(response.statusCode).toBe(expectedStatus);
    }
  );
});

afterAll(async () => {
  // Teardown
  await teardownDynamoTestItems();
});

// Setup DynamoDB client
const ddbClient = new DynamoDBClient({ region: Environment.AWSRegion });
const tableName = Environment.UsersTable;

// Teardown logic to delete created test users by email
async function teardownDynamoTestItems() {
  const deletePromises = fixtures.map(({ body }) => {
    const parsedBody = JSON.parse(body);
    return ddbClient.send(
      new DeleteItemCommand({
        TableName: tableName,
        Key: {
          email: { S: parsedBody.email },
        },
      })
    );
  });

  const reponse = (await Promise.allSettled(deletePromises)).filter(result => result.status === 'rejected');
  console.log('Teardown completed:', JSON.stringify(reponse));
}