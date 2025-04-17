import { handler } from '@app/modules/score/save/SaveScoreHandler';
import { fixtures,fixtures4Setup } from './fixtures';
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { DeleteItemCommand, DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import Environment from '@app/../utils/Environment';
import { setgroups } from 'process';

beforeAll(async () =>  {
  await setup()
});

afterAll(async () => {
  // Teardown
  await teardownDynamoTestItems();
});

describe('SaveScore - Integration', () => {

  test.each(fixtures)(`Given a "Quiz Score" request \n["$body"]\n, When the handler is invoked, Then the response status should be "$expectedStatus" And the score should be updated correctly`,
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



// Setup DynamoDB client
const ddbClient = new DynamoDBClient({ region: Environment.AWSRegion, endpoint: Environment.LocalEndpoint });
const tableName = Environment.UserTable;


//Setup DynamoDB client
async function setup() {
  const putPromises = fixtures4Setup.map(( email ) => {
    return ddbClient.send(
      new PutItemCommand({
        TableName: tableName,
        Item: {
          email: { S: email }
        },
      })
    );
  });

  const response = (await Promise.allSettled(putPromises)).filter(result => result.status === 'rejected');
  console.log('Setup completed:', JSON.stringify(response));

}


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