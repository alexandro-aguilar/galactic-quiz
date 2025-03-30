import { inject, injectable } from 'inversify';
import types from './types';
import Repository from '@app/core/domain/repository/Repository';
import User from './User';
import UserAlreadyExistsError from './UserAlreadyExistsError';
import UseCase from '@app/core/application/useCase/UseCase';
import { logMethod } from '@app/core/decorators/logMethod';

@injectable()
export default class RegisterUserUseCase implements UseCase<User, Promise<boolean>> {
  constructor(
    @inject(types.RegisterUserRepository) private readonly registerUserRepository: Repository<User, User>
  ) {}

  @logMethod()
  async execute(user: User): Promise<boolean> {
    try {
      await this.registerUserRepository.execute(user);
      return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
      if (error instanceof UserAlreadyExistsError) {
        return false;
      } else {
        throw error;
      }
    }
  }
}