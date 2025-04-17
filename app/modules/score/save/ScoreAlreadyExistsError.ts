/**
 * Custom error class representing a situation where a score already exists.
 * This error is typically thrown when attempting to save a score that conflicts
 * with an existing one.
 *
 * @extends {Error}
 */
export default class ScoreAlreadyExistsError extends Error {
  constructor() {
    super('Score already exists');
    this.name = 'ScoreAlreadyExistsError';
  }
}