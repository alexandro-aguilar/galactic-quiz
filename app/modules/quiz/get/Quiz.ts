import Question from './Question';

export default class Quiz {
  private _questions: Array<Question>;

  constructor(questions: Array<Question>) {
    this._questions = questions;
  }

  get questions(): Array<Question> {
    return this._questions;
  }
}