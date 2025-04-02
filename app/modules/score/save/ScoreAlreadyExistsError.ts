export default class ScoreAlreadyExistsError extends Error {
  constructor() {
    super('Score already exists');
    this.name = 'ScoreAlreadyExistsError';
  }
}