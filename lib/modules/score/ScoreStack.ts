import { NestedStack } from 'aws-cdk-lib';
import { StackProps } from 'aws-cdk-lib';
import { Role } from 'aws-cdk-lib/aws-iam';
import { HttpApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { Construct } from 'constructs';
import SaveScoreLambda from './SaveScoreLambda';

export class ScoreStack extends NestedStack {
  constructor(scope: Construct, props: StackProps, role: Role, apiGateway: HttpApi) {
    super(scope, 'ScoreStack', props);
    new SaveScoreLambda(this, role, apiGateway);
  }
}