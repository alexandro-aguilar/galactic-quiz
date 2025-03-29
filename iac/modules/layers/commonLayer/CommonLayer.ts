import { Architecture, Code, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import Environment from '../../../utils/Environment';

export default class CommonLayer extends LayerVersion {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      code: Code.fromAsset('iac/modules/layers/commonLayer/layer'),
      layerVersionName: `${id}-${Environment.projectName}-${Environment.stage}`,
      compatibleRuntimes: [Runtime.NODEJS_22_X],
      description: 'Common layer for Galactic Quiz',
      license: 'MIT',
      compatibleArchitectures: [Architecture.ARM_64],
    });
  }
}