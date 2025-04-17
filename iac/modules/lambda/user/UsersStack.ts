import { NestedStack } from 'aws-cdk-lib';
import RegisterUserLambda from './RegisterUserLambda';
import { Construct } from 'constructs';
import LambdaStackProps from '../../../utils/LambdaStackProps';

export class UserStack extends NestedStack {
  constructor(scope: Construct, prefix: string, props: LambdaStackProps) {
    super(scope, 'UserStack', props);
    new RegisterUserLambda(this, prefix, props);
  }
}