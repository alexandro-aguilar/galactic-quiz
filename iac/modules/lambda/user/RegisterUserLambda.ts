import { resolve } from 'path';
import { Construct } from 'constructs';
import Environment from '../../../../utils/Environment';
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import LambdaStackProps from '../../../utils/LambdaStackProps';
import { Runtime, Architecture, Code, Function } from 'aws-cdk-lib/aws-lambda';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { HttpMethod, HttpRoute, HttpRouteKey } from 'aws-cdk-lib/aws-apigatewayv2';

export default class RegisterUserLambda extends Function {
  private readonly name;

  constructor(scope: Construct, prefix: string, props: LambdaStackProps) {
    super(scope, `RegisterUserLambda`, {
      functionName: `${prefix}-RegisterUserLambda`,
      runtime: Runtime.NODEJS_22_X,
      code: Code.fromAsset(resolve(__dirname, '../../../../app/modules/user/register/RegisterUserHandler.ts')),
      handler: 'handler', // Name of the exported handler function,
      layers: [props.layer],
      memorySize: 1024,
      architecture: Architecture.ARM_64,
      role: props.role,
      environment: {
         //ToDo: @alexandro, can we use the env variabble instead props, wich one is better to use?
        //USER_TABLE: Environment.UserTable,

        USER_TABLE: props.table.tableName,
        POWERTOOLS_SERVICE_NAME: 'RegisterUserLambda',
        POWERTOOLS_LOG_LEVEL: Environment.LogLevel,
        POWERTOOLS_METRICS_NAMESPACE: Environment.ProjectName,
      },
    });
    this.name = 'RegisterUser';

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
    this.role?.attachInlinePolicy(dynamoPutItemPolicy);

    const integration = new HttpLambdaIntegration(`${this.name}Integration`, this);

    new HttpRoute(scope, `${this.name}Route`, {
      httpApi: props.api,
      routeKey: HttpRouteKey.with('/users', HttpMethod.POST),
      integration
    });
  }
}