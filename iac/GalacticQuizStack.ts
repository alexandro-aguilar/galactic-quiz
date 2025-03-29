import { Construct } from 'constructs';
import { QuizStack } from './modules/lambda/quiz/QuizStack';
import { Role, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { UserStack } from './modules/lambda/users/UsersStack';
import { ScoreStack } from './modules/lambda/score/ScoreStack';
import GalacticQuizAPIGatewayStack from './modules/apigateway/GalacticQuizAPIGatewayStack';
import LambdaStackProps from './utils/LambdaStackProps';
import GalacticQuizUsersDynamoStack from './modules/dynamoDB/GalacticQuizUsersDynamoStack';
import GalacticQuizQuestionsBucketStack from './modules/s3/GalacticQuizQuestionsBucketStack';
import { Stack, StackProps, Tags } from 'aws-cdk-lib';
import Environment from './utils/Environment';
import LayersStack from './modules/layers/LayersStack';

export default class GalacticQuizStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const role = new Role(this, 'LambdaExecutionRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    const apiGatewayStack = new GalacticQuizAPIGatewayStack(this, {});
    const api = apiGatewayStack.api;

    const galacticQuizUsersDynamoStack = new GalacticQuizUsersDynamoStack(this, {});
    const table = galacticQuizUsersDynamoStack.table;

    const comDayQuestionsBucketStack = new GalacticQuizQuestionsBucketStack(this, {});
    const bucket = comDayQuestionsBucketStack.bucket;

    const layerStack = new LayersStack(this, {});

    const commonLayer = layerStack.commonLayer;

    const lambdaStackProps: LambdaStackProps = {
      role,
      api,
      table,
      bucket,
      layer: commonLayer
    }

    new QuizStack(this, lambdaStackProps);

    new UserStack(this, lambdaStackProps);

    new ScoreStack(this, lambdaStackProps);


    Tags.of(this).add('project', Environment.projectName);
    Tags.of(this).add('environment', Environment.stage);
  }
}