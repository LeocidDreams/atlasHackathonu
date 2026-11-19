import { ApiResponse, HttpStatusCode } from "@atlas/shared";
import type { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

export const validateRequest = (
  createSchema: (req: Request, res: Response) => ZodType,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = createSchema(req, res);
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues;
        issues.forEach((issue) => {
          console.log(
            `Validation issue: ${issue.path.join(".")} - ${issue.message}`,
          );
        });

        return res.status(HttpStatusCode.BAD_REQUEST).json(
          ApiResponse.badRequest(
            "Validation failed",
            error.issues.map((issue) => issue.message),
          ),
        );
      }
      return next(error);
    }
  };
};
