import coreTypes from '@app/core/presentation/coreTypes';

const types = {
  ...coreTypes,
  SaveScoreController: Symbol.for('SaveScoreController'),
  SaveScoreUseCase: Symbol.for('SaveScoreUseCase'),
  SaveScoreRepository: Symbol.for('SaveScoreRepository'),
};

export default types;