// utils/logger.ts
import Environment from '../../../utils/Environment';
import { Logger } from '@aws-lambda-powertools/logger';

export default class LoggerSingleton {
  private static instance: Logger;

  private constructor() {}

  static getInstance(): Logger {
    if (!LoggerSingleton.instance) {
      LoggerSingleton.instance = new Logger({
        serviceName: Environment.PowertoolsServiceName,
        logLevel: Environment.LogLevel,
      });
    }

    return LoggerSingleton.instance;
  }
}

export const logger = LoggerSingleton.getInstance();