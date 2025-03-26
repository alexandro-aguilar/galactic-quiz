import { Container } from 'inversify';
import types from './types';
import RegisterUserController from './RegisterUserController';
import RegisterUserRepository from './RegisterUserRepository';

const container = new Container();

container.bind(types.RegisterUserController).to(RegisterUserController);
container.bind(types.RegisterUserRepository).to(RegisterUserRepository);

export default container;