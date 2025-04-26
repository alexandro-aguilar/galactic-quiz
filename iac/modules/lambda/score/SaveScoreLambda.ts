import { resolve } from 'path';
import { Construct } from 'constructs';
import Environment from '../../../../utils/Environment';
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import LambdaStackProps from '../../../utils/LambdaStackProps';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { HttpMethod, HttpRoute, HttpRouteKey } from 'aws-cdk-lib/aws-apigatewayv2';
import { Runtime, Architecture, Tracing, Function, Code } from 'aws-cdk-lib/aws-lambda';

export default class SaveScoreLambda extends Function {
  private readonly name;

  constructor(scope: Construct,prefix: string, props: LambdaStackProps) {
    super(scope, `SaveScoreLambda`, {
      functionName: `${prefix}-SaveScoreLambda`,
      runtime: Runtime.NODEJS_22_X,
      code: Code.fromAsset(resolve(__dirname, '../../../../app/modules/score/save')),
      handler: 'handler', // Name of the exported handler function,
      layers: [props.layer],
      memorySize: 1024,
      architecture: Architecture.ARM_64,
      tracing: Tracing.ACTIVE,
      role: props.role,
      environment: {
        //ToDo: @alexandro, can we use the env variabble instead props, wich one is better to use?
        //USER_TABLE: Environment.UserTable,
        
        USER_TABLE: props.table.tableName,
        POWERTOOLS_SERVICE_NAME: 'SaveScoreLambda',
        POWERTOOLS_LOG_LEVEL: Environment.LogLevel,
        POWERTOOLS_METRICS_NAMESPACE: Environment.ProjectName,
      },
    });
    this.name = 'SaveScore';
    // Create an inline policy for DynamoDB PutItem access
    const dynamoUpdateItemPolicy = new Policy(scope, `${this.name}LambdaDynamoUpdateItemPolicy`, {
      statements: [
        new PolicyStatement({
          actions: ['dynamodb:UpdateItem'],
          resources: [props.table.tableArn],
        }),
      ],
    });

    // Attach the DynamoDB access policy to the Lambda function's role
    this.role?.attachInlinePolicy(dynamoUpdateItemPolicy);

    const integration = new HttpLambdaIntegration(`${this.name}Integration`, this);

    new HttpRoute(scope, `${this.name}Route`, {
      httpApi: props.api,
      routeKey: HttpRouteKey.with('/score', HttpMethod.POST),
      integration
    });
  }
}