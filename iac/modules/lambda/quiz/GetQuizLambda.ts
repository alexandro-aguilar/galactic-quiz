import { resolve } from 'path';
import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import Environment from '../../../../utils/Environment';
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import LambdaStackProps from '../../../utils/LambdaStackProps';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { HttpMethod, HttpRoute, HttpRouteKey } from 'aws-cdk-lib/aws-apigatewayv2';
import { Architecture, Runtime, Tracing, Function, Code } from 'aws-cdk-lib/aws-lambda';

export class GetQuizLambda extends Function {
  private readonly name;

  constructor(scope: Construct, prefix: string, props: LambdaStackProps) {
    super(scope, `${prefix}-GetQuizLambdaStack`, {
      functionName: `${prefix}-GetQuizLambda`,
      runtime: Runtime.NODEJS_22_X,
      code: Code.fromAsset(resolve(__dirname, '../../../../.dist/app/modules/quiz/get/GetQuizHandler.js')),
      handler: 'handler', // Name of the exported handler function,
      layers: [props.layer],
      memorySize: 1024,
      timeout: Duration.seconds(60),
      architecture: Architecture.ARM_64,
      tracing: Tracing.ACTIVE,
      role: props.role,
      environment: {
        QUIZ_BUCKET: props.bucket.bucketName,
        POWERTOOLS_SERVICE_NAME: 'GetQuizLambda',
        POWERTOOLS_LOG_LEVEL: Environment.LogLevel,
        POWERTOOLS_METRICS_NAMESPACE: Environment.ProjectName,
      },
    });
    this.name = 'GetQuiz';

    //S3 access policy
    const s3AccessPolicy = new Policy(scope, `${this.name}LambdaS3AccessPolicy`, {
      statements: [
        new PolicyStatement({
          actions: ['s3:GetObject'],
          resources: [`${props.bucket.bucketArn}/*`],
        }),
      ],
    });

    this.role?.attachInlinePolicy(s3AccessPolicy);

     // Create an inline policy for Bedrock model invocation
    const bedrockInvokePolicy = new Policy(scope, `${this.name}LambdaBedrockInvokePolicy`, {
      statements: [
        new PolicyStatement({
          actions: [
            'bedrock:InvokeModel'
          ],
          resources: ['*'], // You can specify a specific Bedrock model ARN if applicable
        }),
      ],
    });

    // Attach the Bedrock access policy to the Lambda function's role
    this.role?.attachInlinePolicy(bedrockInvokePolicy);

    const integration = new HttpLambdaIntegration(`${this.name}Integration`, this);

    new HttpRoute(scope, `${this.name}Route`, {
      httpApi: props.api,
      routeKey: HttpRouteKey.with('/quiz/{type}', HttpMethod.GET),
      integration
    });
  }
}