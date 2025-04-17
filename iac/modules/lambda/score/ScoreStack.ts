import { NestedStack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import SaveScoreLambda from './SaveScoreLambda';
import LambdaStackProps from '../../../utils/LambdaStackProps';

export class ScoreStack extends NestedStack {
  constructor(scope: Construct, prefix: string,props: LambdaStackProps) {
    super(scope, 'ScoreStack', props);
    new SaveScoreLambda(this, prefix, props);
  }
}