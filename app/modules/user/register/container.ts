import { Container } from 'inversify';
import types from './types';
import RegisterUserController from './RegisterUserController';
import RegisterUserRepository from './RegisterUserRepository';
import RegisterUserUseCase from './RegisterUserUseCase';

const container = new Container();

container.bind(types.RegisterUserController).to(RegisterUserController);
container.bind(types.RegisterUserUseCase).to(RegisterUserUseCase);
container.bind(types.RegisterUserRepository).to(RegisterUserRepository);

export default container;