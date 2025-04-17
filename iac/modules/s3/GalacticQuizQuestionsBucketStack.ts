import Environment from '../../../utils/Environment';
import { NestedStack, RemovalPolicy, StackProps } from 'aws-cdk-lib';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { join } from 'path';


export default class GalacticQuizQuestionsBucketStack extends NestedStack {
  private _bucket: Bucket;

  constructor(scope: Construct, prefix: string,props?: StackProps) {
    super(scope, `${prefix}-BucketStack`, props);

    const bucketName = Environment.QuizBucket
    this._bucket = new Bucket(this, `${bucketName}-id`, {
      bucketName,
      versioned: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      
    });

    new BucketDeployment(this, 'DeployFiles', {
      sources: [Source.asset(join(__dirname, './files'))], // Path to your local files
      destinationBucket: this.bucket,
    });
  }

  get bucket(): Bucket {
    return this._bucket;
  }
}