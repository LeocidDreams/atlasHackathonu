import * as z from "zod";
import type { Request, Response } from "express";

interface HttpValidatorOptions {
  createBodySchema?: () => z.ZodType;
  createQuerySchema?: () => z.ZodType;
  createHeadersSchema?: () => z.ZodType;
}

export const createHttpValidator = ({
  createBodySchema,
  createQuerySchema,
  createHeadersSchema,
}: HttpValidatorOptions): ((req: Request, res: Response) => z.ZodType) => {
  return () =>
    z.object({
      body: createBodySchema
        ? createBodySchema().optional()
        : z.object({}).optional(),
      query: createQuerySchema
        ? createQuerySchema().optional()
        : z.object({}).optional(),
      headers: createHeadersSchema
        ? createHeadersSchema().optional()
        : z.object({}).optional(),
    });
};
