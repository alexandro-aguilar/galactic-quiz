import { Container } from 'inversify';
import types from './types';
import GetQuizController from './GetQuizController';
import GetQuizRepository from './GetQuizRepository';

const container = new Container();

container.bind(types.GetQuizController).to(GetQuizController);
container.bind(types.GetQuizRepository).to(GetQuizRepository);

export default container;