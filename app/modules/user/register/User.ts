import Practices from './Practices';
import UserDto from './UserDto';

export default class User {
  private email: string;
  private name: string;
  private practice: Practices;

  constructor(email: string, profile: Practices, name: string) {
    this.email = email;
    this.practice = profile;
    this.name = name;
  }

  get Email(): string {
    return this.email;
  }

  get Profile(): Practices {
    return this.practice;
  }

  get Name(): string {
    return this.name;
  }

  toJSON(): UserDto {
    return {
      email: this.email,
      practice: this.practice,
      name: this.name
    }
  }
}