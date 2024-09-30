import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { QuizStack } from './modules/quiz/QuizStack';
import { HttpApi, CorsHttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { Role, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { UserStack } from './modules/users/UsersStack';
import { ScoreStack } from './modules/score/ScoreStack';

export class MyLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new HttpApi(this, 'ComDay2024', {
      corsPreflight: {
        allowHeaders: ['Content-Type', 'Authorization'],
        allowMethods: [CorsHttpMethod.GET, CorsHttpMethod.OPTIONS, CorsHttpMethod.POST],
        allowOrigins: ['*'],
        maxAge: cdk.Duration.days(10), // Cache preflight response for 10 days
      },
      apiName: 'ComDay2024Service'
    });

    const lambdaRole = new Role(this, 'LambdaExecutionRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    new QuizStack(this, {}, lambdaRole, api);

    new UserStack(this, {}, lambdaRole, api);

    new ScoreStack(this, {}, lambdaRole, api);
  }
}