import User from './User';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import Environment from '../../../utils/Environment';
import Repository from '@app/core/domain/repository/Repository';
import { injectable } from 'inversify';
import UserAlreadyExistsError from './UserAlreadyExistsError';

@injectable()
export default class RegisterUserRepository implements Repository<User, User> {
  private readonly client: DynamoDBDocumentClient;

  constructor() {
    const client = new DynamoDBClient({ region: 'us-east-1' });
    this.client = DynamoDBDocumentClient.from(client);
  }

  async execute(user: User): Promise<User> {
    console.log('RegisterUserRepository', user, Environment);
    const params = {
      TableName: Environment.UsersTable,
      Item: user.toJSON(),
      ConditionExpression: 'attribute_not_exists(email)' // Prevent overwriting
    };
    try {
      const command = new PutCommand(params);
      const result = await this.client.send(command);
      console.log('client', this.client);
      console.log('Result', result);
      return result.Attributes as User; // Assuming the result contains the created user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
      console.error('Error', error);
      if (error.name === 'ConditionalCheckFailedException') {
        throw new UserAlreadyExistsError();
      } else {
        throw error;
      }
    }
  }
}