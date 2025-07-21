import { Architecture, Code, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { resolve } from 'path';

export default class CommonLayer extends LayerVersion {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      code: Code.fromAsset(resolve(__dirname, '../../../../.dist/layers/commonLayer/layer')),
      layerVersionName: `${id}`,
      compatibleRuntimes: [Runtime.NODEJS_22_X],
      description: 'Common layer for Galactic Quiz',
      license: 'MIT',
      compatibleArchitectures: [Architecture.ARM_64],
    });
  }
}