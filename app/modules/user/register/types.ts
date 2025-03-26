import coreTypes from '@app/core/presentation/coreTypes';

const types = {
  ...coreTypes,
  RegisterUserController: Symbol.for('RegisterUserController'),
  RegisterUserRepository: Symbol.for('RegisterUserRepository'),
};

export default types;