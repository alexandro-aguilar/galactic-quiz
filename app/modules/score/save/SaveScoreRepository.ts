//Inversion
import { injectable } from 'inversify';
//Logging
import { logMethod } from '@app/core/decorators/logMethod';
//Storage (DynamoDB)
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
//Tools
import Environment from '../../../../utils/Environment';

//Domain
import Score from './Score';
//Repository
import Repository from '@app/core/domain/repository/Repository';
import ScoreAlreadyExistsError from './ScoreAlreadyExistsError';

@injectable()
export default class SaveScoreRepository implements Repository<Score, void> {
  private readonly client: DynamoDBDocumentClient;

  constructor() {
    const client = new DynamoDBClient({ region: Environment.Region, endpoint: Environment.LocalEndpoint });
    this.client = DynamoDBDocumentClient.from(client);
  }
  @logMethod()
  async execute(score: Score): Promise<void> {
    console.log('##:-- SaveScoreRepository');
    console.log(Environment.LocalEndpoint);
    try {
      const command = new UpdateCommand({
        TableName: Environment.UserTable,
        Key: {
          email: score.Email
        },
        UpdateExpression: 'set score = :score',

        ExpressionAttributeValues: {
          ':score': score.Score
        },
        ConditionExpression: 'attribute_exists(email) AND attribute_not_exists(score)',
        ReturnValues: 'NONE'
      });

      await this.client.send(command);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
      if (error.name === 'ConditionalCheckFailedException') {
        //If the score already exists, we throw a domain error
        //This is because we want to handle the error in the caller
        throw new ScoreAlreadyExistsError();
      } else {
        //If the error is not a ConditionalCheckFailedException, we want to throw the error
        //This is because we want to handle the error in the caller
        throw error;
      }
    }
  }
}