import Answer from './Answer';

export default class Question {
  private _id: number;
  private _type: number;
  private _text: string;
  private _answers: Array<Answer>;
  private _rightAnswer: number;

  constructor(id: number, type: number, text: string, answers: Array<Answer>, rightAnswer: number) {
    this._id = id;
    this._text = text;
    this._type = type;
    this._answers = answers;
    this._rightAnswer = rightAnswer;
  }

  get id(): number {
    return this._id;
  }
  
  get type(): number {
    return this._type;
  }
  
  get text(): string {
    return this._text;
  }

  get answers(): Array<Answer> {
    return this._answers;
  }

  get rightAnswer(): number {
    return this._rightAnswer;
  }
}