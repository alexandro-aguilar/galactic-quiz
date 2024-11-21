export default class Environment {
  static readonly QuizBucket = process.env.QUIZ_BUCKET ?? 'default';
  static readonly UsersTable = process.env.USERS_TABLE ?? 'default';
}