import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { QuizStack } from './modules/quiz/QuizStack';
import { Role, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { UserStack } from './modules/users/UsersStack';
import { ScoreStack } from './modules/score/ScoreStack';
import APIGatewayStack from './modules/apigateway/APIGatewayStack';
import LambdaStackProps from './utils/LambdaStackProps';
import ComDayUsersDynamoStack from './modules/dynamoDB/ComDayUsersDynamoStack';
import ComDayQuestionsBucketStack from './modules/s3/ComDayQuestionsBucketStack';

export class MyLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const role = new Role(this, 'LambdaExecutionRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    const apiGatewayStack = new APIGatewayStack(this, {});
    const api = apiGatewayStack.api;

    const comDayUsersDynamoStack = new ComDayUsersDynamoStack(this, {});
    const table = comDayUsersDynamoStack.table;

    const comDayQuestionsBucketStack = new ComDayQuestionsBucketStack(this, {});
    const bucket = comDayQuestionsBucketStack.bucket;

    const lambdaStackProps: LambdaStackProps = {
      role,
      api,
      table,
      bucket
    }
    
    new QuizStack(this, lambdaStackProps);

    new UserStack(this, lambdaStackProps);

    new ScoreStack(this, lambdaStackProps);
  }
}