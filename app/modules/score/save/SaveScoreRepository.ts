import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import Score from './Score';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export default class SaveScoreRepository {
  private readonly client: DynamoDBDocumentClient;

  constructor() {
    const client = new DynamoDBClient({ region: 'us-east-1' });
    this.client = DynamoDBDocumentClient.from(client);
  }

  async execute(score: Score): Promise<boolean> {
    try {
      const command = new UpdateCommand({
        TableName: 'ComDayUsers',
        Key: {
          email: score.email
        },
        UpdateExpression: 'set score = :score',
        ExpressionAttributeValues: {
          ':score': score.score
        },
        ConditionExpression: 'attribute_not_exists(score)',
        ReturnValues: 'NONE'
      });
  
      await this.client.send(command);
      return true;
    } catch(error: any) {
      if (error.name === 'ConditionalCheckFailedException') {
        return false;
      }
      throw error;
    }
  }
}