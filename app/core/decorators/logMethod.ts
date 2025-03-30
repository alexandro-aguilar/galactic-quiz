import { logger } from '../utils/Logger';

export function logMethod(): MethodDecorator {
  return (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      const methodName = propertyKey.toString();
      logger.info(`→ Entering ${methodName}`, { arguments: args });

      try {
        const result = await originalMethod.apply(this, args);
        logger.info(`← Exiting ${methodName}`, { result });
        return result;
      } catch (error) {
        logger.error(`✖ Error in ${methodName}`, { error });
        throw error;
      }
    };

    return descriptor;
  };
}