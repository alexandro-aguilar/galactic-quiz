export default class Environment {
  static readonly AWSRegion = process.env.AWS_REGION ?? 'us-east-1';
  static readonly QuizBucket = process.env.QUIZ_BUCKET ?? 'default';
  static readonly UsersTable = process.env.USERS_TABLE ?? 'default';
}