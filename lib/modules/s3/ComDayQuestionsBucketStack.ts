import { NestedStack, RemovalPolicy, StackProps } from "aws-cdk-lib";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export default class ComDayQuestionsBucketStack extends NestedStack {
  private _bucket: Bucket;

  constructor(scope: Construct, props?: StackProps) {
    super(scope, 'ComDayQuestionsBucketStack', props);
    this._bucket = new Bucket(this, 'ComDayQuestionsBucket', {
      bucketName: 'com-day-questions',
      versioned: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });
  }

  get bucket(): Bucket {
    return this._bucket;
  }
}