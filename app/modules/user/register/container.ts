import { Container } from 'inversify';
import types from './types';
import RegisterUserController from './RegisterUserController';
import RegisterUserRepository from './RegisterUserRepository';
import RegisterUserUseCase from './RegisterUserUseCase';
import ResponseMapper from '@app/core/infrastructure/controller/ResponseMapper';

const container = new Container();

container.bind(types.RegisterUserController).to(RegisterUserController);
container.bind(types.RegisterUserUseCase).to(RegisterUserUseCase);
container.bind(types.RegisterUserRepository).to(RegisterUserRepository);
container.bind(types.ResponseMapper).to(ResponseMapper);

export default container;