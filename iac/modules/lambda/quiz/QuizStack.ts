import { NestedStack } from 'aws-cdk-lib';
import { GetQuizLambda } from './GetQuizLambda';
import { Construct } from 'constructs';
import LambdaStackProps from '../../../utils/LambdaStackProps';

export class QuizStack extends NestedStack {
  constructor(scope: Construct, prefix: string, props: LambdaStackProps) {
    super(scope, `${prefix}-QuizStack`, props);
    new GetQuizLambda(this, prefix, props);
  }
}