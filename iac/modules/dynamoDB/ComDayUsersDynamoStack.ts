import { NestedStack, RemovalPolicy, StackProps } from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export default class ComDayUsersDynamoStack extends NestedStack {
  private _table: Table;
  constructor(scope: Construct, props?: StackProps) {
    super(scope, 'ComDayUsersDynamoStack', props);
    this._table = new Table(this, 'ComDayUsersTable', {
      partitionKey: { name: 'email', type: AttributeType.STRING },
      tableName: 'ComDayUsers',
      removalPolicy: RemovalPolicy.DESTROY
    });
  }

  get table(): Table {
    return this._table;
  }
}