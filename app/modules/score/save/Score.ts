export default class Score {
  private _email: string;
  private _score: number;

  constructor(email: string, score: number) {
    this._email = email;
    this._score = score;
  }

  get email(): string {
    return this._email;
  }

  get score(): number {
    return this._score;
  }

  toJson() {
    return {
      email: this._email,
      score: this._score
    }
  }
}