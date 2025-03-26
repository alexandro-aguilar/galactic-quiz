export default class Environment {
  public static readonly stage = process.env.STAGE ?? 'local';
  public static readonly accountId = process.env.AWS_ACCOUNT_ID ?? '000000000000';
  public static readonly projectName = process.env.PROJECT_NAME ?? 'app';
}