import { Container } from 'inversify';
import types from './types';
import GetQuizController from './GetQuizController';

const container = new Container();

container.bind(types.GetQuizController).to(GetQuizController);