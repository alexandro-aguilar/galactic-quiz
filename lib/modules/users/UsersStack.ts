import { NestedStack } from 'aws-cdk-lib';
import RegisterUserLambda from './RegisterUserLambda';
import { StackProps } from 'aws-cdk-lib';
import { Role } from 'aws-cdk-lib/aws-iam';
import { IHttpApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { Construct } from 'constructs';

export class UserStack extends NestedStack {
  constructor(scope: Construct, props: StackProps, role: Role, apiGateway: IHttpApi) {
    super(scope, 'UserStack', props);
    new RegisterUserLambda(this, role, apiGateway);
  }
}