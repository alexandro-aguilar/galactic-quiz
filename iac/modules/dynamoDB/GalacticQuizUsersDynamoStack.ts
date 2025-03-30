import { NestedStack, RemovalPolicy, StackProps } from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import Environment from '../../../iac/utils/Environment';

export default class GalacticQuizUsersDynamoStack extends NestedStack {
  private _table: Table;
  constructor(scope: Construct, props?: StackProps) {
    super(scope, 'GalacticQuizUsersDynamoStack', props);
    this._table = new Table(this, 'GalacticQuizUsersTable', {
      partitionKey: { name: 'email', type: AttributeType.STRING },
      tableName: `GalacticQuizUsersTable-${Environment.projectName}-${Environment.stage}`,
      removalPolicy: RemovalPolicy.DESTROY
    });
  }

  get table(): Table {
    return this._table;
  }
}