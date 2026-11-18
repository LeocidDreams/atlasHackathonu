import type { ILogger } from "@core/logging/ILogger.ts";

declare global {
  namespace Express {
    interface Request {
      logger: ILogger;
    }
  }
}
