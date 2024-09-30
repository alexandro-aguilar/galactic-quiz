import { NestedStack } from 'aws-cdk-lib';
import { GetQuizLambda } from './GetQuizLambda';
import { StackProps } from 'aws-cdk-lib';
import { Role } from 'aws-cdk-lib/aws-iam';
import { HttpApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { Construct } from 'constructs';

export class QuizStack extends NestedStack {
  constructor(scope: Construct, props: StackProps, role: Role, apiGateway: HttpApi) {
    super(scope, 'QuizStack', props);
    new GetQuizLambda(this, role, apiGateway);
  }
}