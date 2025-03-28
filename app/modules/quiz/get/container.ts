import { Container } from 'inversify';
import types from './types';
import GetQuizController from './GetQuizController';
import GetQuizRepository from './GetQuizRepository';
import ResponseMapper from '@app/core/infrastructure/controller/ResponseMapper';

const container = new Container();

container.bind(types.GetQuizController).to(GetQuizController);
container.bind(types.GetQuizRepository).to(GetQuizRepository);
container.bind(types.ResponseMapper).to(ResponseMapper);

export default container;