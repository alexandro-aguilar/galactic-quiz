import { Container } from 'inversify';
import types from './types';
import SaveScoreController from './SaveScoreController';
import SaveScoreRepository from './SaveScoreRepository';
import SaveScoreUseCase from './SaveScoreUseCase';
import ResponseMapper from '@app/core/infrastructure/controller/ResponseMapper';

const container = new Container();

container.bind(types.SaveScoreController).to(SaveScoreController);
container.bind(types.SaveScoreUseCase).to(SaveScoreUseCase);
container.bind(types.SaveScoreRepository).to(SaveScoreRepository);
container.bind(types.ResponseMapper).to(ResponseMapper);

export default container;