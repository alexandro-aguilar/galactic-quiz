import path = require('path');
import { Construct } from 'constructs';
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime, Architecture } from 'aws-cdk-lib/aws-lambda';
import { HttpMethod, HttpRoute, HttpRouteKey } from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import LambdaStackProps from '@iac/utils/LambdaStackProps';
import esbuildBundlingConfig from '@iac/utils/esbuildBundlingConfig';


export default class RegisterUserLambda {
  private readonly name = 'RegisterUser';

  constructor(scope: Construct, props: LambdaStackProps) {
    const lambda = new NodejsFunction(scope, `${this.name}Lambda`, {
      runtime: Runtime.NODEJS_22_X,
      entry: path.join(__dirname, '../../../../app/modules/user/register/UserRegisterHandler.ts'),
      handler: 'handler', // Name of the exported handler function,
      memorySize: 1024,
      architecture: Architecture.ARM_64,
      role: props.role,
      environment: {
        USERS_TABLE: props.table.tableName
      },
      bundling: esbuildBundlingConfig,
    });

    // Create an inline policy for DynamoDB PutItem access
    const dynamoPutItemPolicy = new Policy(scope, `${this.name}LambdaDynamoPutItemPolicy`, {
      statements: [
        new PolicyStatement({
          actions: ['dynamodb:PutItem'],
          resources: [props.table.tableArn],
        }),
      ],
    });

    // Attach the DynamoDB access policy to the Lambda function's role
    lambda.role?.attachInlinePolicy(dynamoPutItemPolicy);

    const integration = new HttpLambdaIntegration(`${this.name}Integration`, lambda);

    new HttpRoute(scope, `${this.name}Route`, {
      httpApi: props.api,
      routeKey: HttpRouteKey.with('/users', HttpMethod.POST),
      integration
    });
  }
}