import * as cdk from 'aws-cdk-lib';
import { NestedStack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HttpApi, CorsHttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';

export default class APIGatewayStack extends NestedStack {
  private _api: HttpApi;
  constructor(scope: Construct, props: StackProps) {
    super(scope, 'APIGatewayStack', props);

    this._api = new HttpApi(this, 'ComDay2024', {
      corsPreflight: {
        allowHeaders: ['Content-Type', 'Authorization'],
        allowMethods: [CorsHttpMethod.GET, CorsHttpMethod.OPTIONS, CorsHttpMethod.POST],
        allowOrigins: ['*'],
        maxAge: cdk.Duration.days(10), // Cache preflight response for 10 days
      },
      apiName: 'ComDay2024Service'
    });
  }

  get api(): HttpApi {
    return this._api;
  }
}