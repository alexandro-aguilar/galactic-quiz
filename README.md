# com-day-aws-2024

This application is the backend implementation of a Caylent quiz deployed at AWS Community Day 2024. 

## Setup

Make sure you have the following installed:
- `yarn`
- `aws-sam-cli` 
  - For macOS users, you can install via `brew install aws-sam-cli`
- Docker

To run the API, once Docker is running in the background, run the following command:

```bash
yarn dev
```

## Deployment
There is currently a pipeline in place listening to the `main` branch. Any changes to that branch will be deployed using CloudFormation alongside GitHub actions in the background.

> [!NOTE]  
> The `.env.example` file is only in place for manual deployments, so there is no need to configure those variables by hand.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `yarn build`   compile typescript to js
* `yarn watch`   watch for changes and compile
* `yarn test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
