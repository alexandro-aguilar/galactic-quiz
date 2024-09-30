import * as path from 'path';
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Role } from 'aws-cdk-lib/aws-iam';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { HttpMethod, HttpRoute, HttpRouteKey, HttpApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { Construct } from 'constructs';

export class GetQuizLambda {
  private readonly name = 'GetQuiz';

  constructor(scope: Construct, role: Role, apiGateway: HttpApi) {
    const lambda = new NodejsFunction(scope, `${this.name}Lambda`, {
      runtime: Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '../../../app/modules/quiz/get/GetQuizHandler.ts'),
      handler: 'handler', // Name of the exported handler function,
      memorySize: 1024,
      architecture: Architecture.ARM_64,
      bundling: {
        externalModules: [
          'aws-sdk',
          '@aws-sdk'
        ], // Exclude specific modules from bundling
        nodeModules: [],     // Include specific modules in the bundle
        target: 'node20',    // Set the target environment for esbuild
        sourceMap: true,
        sourcesContent: false,
      },
      role
    });

    const integration = new HttpLambdaIntegration(`${this.name}Integration`, lambda);

    new HttpRoute(scope, `${this.name}Route`, {
      httpApi: apiGateway,
      routeKey: HttpRouteKey.with('/quiz/{type}', HttpMethod.GET),
      integration
    });
  }
}