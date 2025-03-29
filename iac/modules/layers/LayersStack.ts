import { NestedStack, StackProps } from 'aws-cdk-lib';
import { LayerVersion } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import CommonLayer from './commonLayer/CommonLayer';

export default class CommonLayerStack extends NestedStack {
  private _commonLayer: LayerVersion;
  constructor(scope: Construct, props?: StackProps) {
    super(scope, 'GalacticQuizLayersStack', props);

    this._commonLayer = new CommonLayer(this, 'CommonLayer');
  }

  get commonLayer(): LayerVersion {
    return this._commonLayer;
  }
}