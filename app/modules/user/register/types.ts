import coreTypes from '@app/core/presentation/coreTypes';

const types = {
  ...coreTypes,
  RegisterUserController: Symbol.for('RegisterUserController'),
  RegisterUserUseCase: Symbol.for('RegisterUserUseCase'),
  RegisterUserRepository: Symbol.for('RegisterUserRepository'),
};

export default types;