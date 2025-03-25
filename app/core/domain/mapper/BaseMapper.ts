import { injectable } from 'inversify';
import Mapper from '../../domain/mapper/Mapper';

/**
 * @abstract @class MapperService
 * @implements {Mapper<S, T>}
 * @template S
 * @template T
 * @description Abstract class that defines the methods that a mapper service must implement
 */

@injectable()
export default abstract class BaseMapper<S, T> implements Mapper<S, T> {
  protected abstract transform(entity: S): T;

  execute(entity: S): T;
  execute(array: S[]): T[];
  execute(entityOrArray: S | S[]): T | T[] {
    return Array.isArray(entityOrArray) ? entityOrArray.map((item: S) => this.transform(item)) : this.transform(entityOrArray);
  }
}
