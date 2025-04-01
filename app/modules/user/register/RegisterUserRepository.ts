import User from './User';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import Environment from '../../../utils/Environment';
import Repository from '@app/core/domain/repository/Repository';
import { injectable } from 'inversify';
import UserAlreadyExistsError from './UserAlreadyExistsError';
import { logMethod } from '@app/core/decorators/logMethod';

@injectable()
export default class RegisterUserRepository implements Repository<User, void> {
  private readonly client: DynamoDBDocumentClient;

  constructor() {
    const client = new DynamoDBClient({ region: 'us-east-1', endpoint: Environment.LocalEndpoint });
    this.client = DynamoDBDocumentClient.from(client);
  }

  @logMethod()
  async execute(user: User): Promise<void> {
    const params = {
      TableName: Environment.UsersTable,
      Item: user.toJSON(),
      ConditionExpression: 'attribute_not_exists(email)' // Prevent overwriting
    };
    try {
      const command = new PutCommand(params);
      await this.client.send(command);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
      if (error.name === 'ConditionalCheckFailedException') {
        throw new UserAlreadyExistsError();
      } else {
        throw error;
      }
    }
  }
}