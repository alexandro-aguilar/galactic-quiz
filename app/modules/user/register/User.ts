import Types from '../../../utils/types';

export default class User {
  private _email: string;
  private _profile: Types;

  constructor(email: string, profile: Types) {
    this._email = email;
    this._profile = profile;
  }

  get email(): string {
    return this._email;
  }

  get profile(): Types {
    return this._profile;
  }

  toJSON(): object {
    return {
      email: this._email,
      profile: this._profile
    }
  }
}