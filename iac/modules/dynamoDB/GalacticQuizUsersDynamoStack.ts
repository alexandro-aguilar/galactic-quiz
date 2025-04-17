import { NestedStack, RemovalPolicy, StackProps } from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import Environment from '../../../utils/Environment';

export default class GalacticQuizUsersDynamoStack extends NestedStack {
  private _table: Table;

  constructor(scope: Construct, prefix: string, props?: StackProps) {
    super(scope,`${prefix}-DynamoDbStack`, props);
    const tableName = Environment.UserTable;
    this._table = new Table(this, `${tableName}-id`, {
      tableName: tableName,
      partitionKey: { name: 'email', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY
    });
  }

  get table(): Table {
    return this._table;
  }
}