import * as cdk from 'aws-cdk-lib';
import { NestedStack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HttpApi, CorsHttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';

export default class GalacticQuizAPIGatewayStack extends NestedStack {
  private _api: HttpApi;
  constructor(scope: Construct, prefix: string,props: StackProps) {
    super(scope, `${prefix}-APIGatewayStack`, props);

    this._api = new HttpApi(this, `${prefix}-APIGateway`, {
      corsPreflight: {
        allowHeaders: ['Content-Type', 'Authorization'],
        allowMethods: [CorsHttpMethod.GET, CorsHttpMethod.OPTIONS, CorsHttpMethod.POST],
        allowOrigins: ['*'],
        maxAge: cdk.Duration.days(10), // Cache preflight response for 10 days
      },
      apiName: `${prefix}-APIGatewayService`
    });
  }

  get api(): HttpApi {
    return this._api;
  }
}