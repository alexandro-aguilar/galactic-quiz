//Inversion
import types from './types';
import { inject, injectable } from 'inversify';
//Logging
import { logMethod } from '@app/core/decorators/logMethod';

//Clean architecture
import Repository from '@app/core/domain/repository/Repository';
import UseCase from '@app/core/application/useCase/UseCase';

//Domain
import Score from './Score';
import ScoreAlreadyExistsError from './ScoreAlreadyExistsError';


@injectable()
export default class SaveScoreUseCase implements UseCase<Score, Promise<boolean>> {
  constructor(
    @inject(types.SaveScoreRepository) private readonly saveScoreRepository: Repository<Score, void>
  ) { }

  @logMethod()
  async execute(score: Score): Promise<boolean> {
    try {
      await this.saveScoreRepository.execute(score);
      return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
      if (error instanceof ScoreAlreadyExistsError) {
        //If the score already exists, we don't want to throw an error
        //We just want to return false
        return false;
      } else {
        throw error;
      }

    }
  }
}