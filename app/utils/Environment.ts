import { LogLevel } from '@aws-lambda-powertools/logger';

export default class Environment {
  static readonly AWSRegion = process.env.AWS_REGION ?? 'us-east-1';
  static readonly QuizBucket = process.env.QUIZ_BUCKET ?? 'default';
  static readonly UsersTable = process.env.USERS_TABLE ?? 'default';
  static readonly LogLevel = process.env.LOG_LEVEL as keyof typeof LogLevel ?? LogLevel.DEBUG;
  static readonly PowertoolsServiceName = process.env.POWERTOOLS_SERVICE_NAME ?? 'default-service';
  static readonly LocalEndpoint = process.env.LOCAL_ENDPOINT;
}