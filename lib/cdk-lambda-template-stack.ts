import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { QuizStack } from './modules/quiz/QuizStack';
import { HttpApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { Role, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { UserStack } from './modules/users/UsersStack';
import { ScoreStack } from './modules/score/ScoreStack';

export class MyLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Replace with your existing API Gateway RestApi ID and Root Resource ID
    const httpApiId = 'YOUR_API_ID';

    const restApi = HttpApi.fromHttpApiAttributes(this, 'ImportedRestApi', {
      httpApiId
    });

    const lambdaRole = new Role(this, 'LambdaExecutionRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    new QuizStack(this, {}, lambdaRole, restApi);

    new UserStack(this, {}, lambdaRole, restApi);

    new ScoreStack(this, {}, lambdaRole, restApi);

    // Create the Lambda function using NodejsFunction
    // const myFunction = new lambdaNodejs.NodejsFunction(this, 'MyFunction', {
    //   runtime: lambda.Runtime.NODEJS_20_X,
    //   entry: path.join(__dirname, '../lambda/index.ts'), // path to your TypeScript handler
    //   handler: 'handler', // Name of the exported handler function
    //   bundling: {
    //     externalModules: ['aws-sdk'], // Exclude specific modules from bundling
    //     nodeModules: [],     // Include specific modules in the bundle
    //     target: 'node20',    // Set the target environment for esbuild
    //     sourceMap: true,
    //     sourcesContent: false
    //   },
    // });

    // // Integrate the Lambda function with API Gateway
    // const lambdaIntegration = new apigatewayv2.LambdaIntegration(myFunction);

    // // Add a new resource and method to the existing API Gateway
    // const resource = restApi.root.addResource('myresource');
    // const resource2 = resource.addResource('myresource2');
    // resource.addMethod('GET', lambdaIntegration);
    // resource2.addMethod('GET', lambdaIntegration);
  }
}