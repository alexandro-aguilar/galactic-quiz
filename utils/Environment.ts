import { LogLevel } from '@aws-lambda-powertools/logger';

export default class Environment {
  public static readonly Stage = process.env.STAGE ?? 'local';
  public static readonly AccountId = process.env.AWS_ACCOUNT_ID ?? '000000000000';
  public static readonly ProjectName = process.env.PROJECT_NAME ?? 'app';
  public static readonly Region = process.env.AWS_REGION ?? 'us-east-1';



  static readonly AppPrefix = `${Environment.ProjectName}-${Environment.Stage}`;

  // The local endpoint for AWS services, used for local development
  static readonly AWSRegion = process.env.AWS_REGION ?? 'us-east-1';

  static readonly LocalEndpoint = process.env.LOCAL_ENDPOINT;
  static readonly ForceS3PathStyle = (process.env.S3_PATH_STYLE ?? 'false') === 'true'; 

  // The service name used for AWS Lambda Powertools
  static readonly PowertoolsServiceName = process.env.POWERTOOLS_SERVICE_NAME ?? 'default-service';
  static readonly LogLevel = process.env.LOG_LEVEL as keyof typeof LogLevel ?? LogLevel.DEBUG;

  // IaC related environment variables
  static readonly QuizBucket = `${Environment.AppPrefix}-questions-bucket`;
  static readonly UserTable = `${Environment.AppPrefix}-user-table`;

  static readonly Owner = process.env.OWNER ?? 'default-owner';
  static readonly Team = process.env.TEAM ?? 'default-team';
  static readonly Client = process.env.CLIENT ?? 'default-client';

}