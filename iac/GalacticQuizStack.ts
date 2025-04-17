import { Construct } from 'constructs';
import { QuizStack } from './modules/lambda/quiz/QuizStack';
import { Role, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { UserStack } from './modules/lambda/user/UsersStack';
import { ScoreStack } from './modules/lambda/score/ScoreStack';
import GalacticQuizAPIGatewayStack from './modules/apigateway/GalacticQuizAPIGatewayStack';
import LambdaStackProps from './utils/LambdaStackProps';
import GalacticQuizUsersDynamoStack from './modules/dynamoDB/GalacticQuizUsersDynamoStack';
import GalacticQuizQuestionsBucketStack from './modules/s3/GalacticQuizQuestionsBucketStack';
import { Stack, StackProps, Tags } from 'aws-cdk-lib';
import Environment from '../utils/Environment';
import LayersStack from './modules/layers/LayersStack';

export default class GalacticQuizStack extends Stack {
  constructor(scope: Construct, prefix: string, stackId: string, props?: StackProps) {
    super(scope, stackId, props);

    const roleName = `${prefix}-LambdaExecutionRole`
    const role = new Role(this, `${roleName}-id`, {
      roleName,
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    const apiGatewayStack = new GalacticQuizAPIGatewayStack(this, prefix, {});
    const api = apiGatewayStack.api;

    const galacticQuizUsersDynamoStack = new GalacticQuizUsersDynamoStack( this, prefix, {});
    const table = galacticQuizUsersDynamoStack.table;
    console.log("-- galacticQuizUsersDynamoStack.table", galacticQuizUsersDynamoStack.table)

    const comDayQuestionsBucketStack = new GalacticQuizQuestionsBucketStack(this,prefix,  {});
    const bucket = comDayQuestionsBucketStack.bucket;

    const layerStack = new LayersStack(this, prefix,  {});

    const commonLayer = layerStack.commonLayer;

    const lambdaStackProps: LambdaStackProps = {
      role,
      api,
      table,
      bucket,
      layer: commonLayer
    }

    // console.log("-- lambdaStackProps", lambdaStackProps)

    new QuizStack(this, prefix, lambdaStackProps);
    new ScoreStack(this, prefix, lambdaStackProps);
    new UserStack(this, prefix, lambdaStackProps);



    Tags.of(this).add('project', Environment.ProjectName);
    Tags.of(this).add('environment', Environment.Stage);
    Tags.of(this).add('owner', Environment.Owner);
    Tags.of(this).add('team', Environment.Team);
    Tags.of(this).add('client', Environment.Client);
  }
}