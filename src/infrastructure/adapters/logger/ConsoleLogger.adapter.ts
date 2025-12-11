import { Logger } from '@application/ports/output';
import { environment } from '../../config/environment';

export class ConsoleLoggerAdapter implements Logger {
  private readonly enabled: boolean;

  constructor() {
    this.enabled = environment.enableLogger;
  }

  info(message: string, ...args: unknown[]): void {
    if (this.enabled) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.enabled) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  error(message: string, ...args: unknown[]): void {
    if (this.enabled) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.enabled) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
}

