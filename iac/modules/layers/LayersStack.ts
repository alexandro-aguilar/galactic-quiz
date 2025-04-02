import { NestedStack, StackProps } from 'aws-cdk-lib';
import { LayerVersion } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import CommonLayer from './commonLayer/CommonLayer';
import { join } from 'path';
import { execSync } from 'child_process';

export default class CommonLayerStack extends NestedStack {
  private _commonLayer: LayerVersion;
  constructor(scope: Construct, props?: StackProps) {
    super(scope, 'GalacticQuizLayersStack', props);
    const scriptPath = join(__dirname, '../../..', 'scripts', 'build-layers.sh');

    try {
      execSync(`bash ${scriptPath}`, { stdio: 'inherit' });
    } catch (error) {
      console.error('Error executing bash script:', error);
    }

    this._commonLayer = new CommonLayer(this, 'CommonLayer');
  }

  get commonLayer(): LayerVersion {
    return this._commonLayer;
  }
}