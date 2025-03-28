import coreTypes from '@app/core/presentation/coreTypes';

const types = {
  ...coreTypes,
  GetQuizController: Symbol.for('GetQuizController'),
  GetQuizRepository: Symbol.for('GetQuizRepository'),
};

export default types;