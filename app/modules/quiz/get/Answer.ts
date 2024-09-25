export default class Answer {
  private _id: number;
  private _text: string;

  constructor(id: number, text: string) {
    this._id = id;
    this._text = text;
  }

  get id(): number {
    return this._id;
  }

  get text(): string {
    return this._text;
  }

  toJson() {
    return {
      id: this._id,
      text: this._text
    }
  }
}