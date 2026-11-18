import type { Request, Response, NextFunction } from "express";
import { AppError } from "@core/errors/app-error.js";
import { ApiResponse, HttpStatusCode } from "@atlas/shared";

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    if (err.isOperational) {
      req.logger.warn("Business error", {
        context: "BusinessError",
        code: err.code,
        message: err.message,
      });
      res.status(err.statusCode).json(
        ApiResponse.from({
          httpStatusCode: err.statusCode,
          message: err.message,
        }),
      );
    } else {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(
        ApiResponse.from({
          httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
          message: "Internal server error",
        }),
      );
    }
    return;
  }

  const error =
    err instanceof Error
      ? err
      : new Error(typeof err === "string" ? err : "Unknown error");

  req.logger.error("Unhandled application error", {
    context: "ExpressError",
    method: req.method,
    path: req.originalUrl,
    error: error.message,
    stack: error.stack,
  });

  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(
    ApiResponse.from({
      httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
    }),
  );
}
