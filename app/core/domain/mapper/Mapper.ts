/**
 * @interface Mapper
 * @template S
 * @template T
 * @description interface that defines the methods that a mapper service must implement
 */

export default interface Mapper<S, T> {
  execute(entity: S): T;
  execute(array: S[]): T[];
  execute(entityOrArray: S | S[]): T | T[];
}