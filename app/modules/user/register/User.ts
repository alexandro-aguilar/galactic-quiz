export default class User {
  private _email: string;
  private _profile: number;
  private _score?: number;

  constructor(email: string, profile: number) {
    this._email = email;
    this._profile = profile;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get profile(): number {
    return this._profile;
  }

  set profile(profile: number) {
    this._profile = profile;
  }

  toJSON(): object {
    return {
      email: this._email,
      profile: this._profile
    }
  }
}