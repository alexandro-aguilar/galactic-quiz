import Types from '../../../utils/types';

export default class User {
  private _email: string;
  private _name: string;
  private _profile: Types;

  constructor(email: string, profile: Types, name: string) {
    this._email = email;
    this._profile = profile;
    this._name = name;
  }

  get email(): string {
    return this._email;
  }

  get profile(): Types {
    return this._profile;
  }

  get name(): string {
    return this._name;
  }

  toJSON(): object {
    return {
      email: this._email,
      profile: this._profile,
      name: this._name
    }
  }
}