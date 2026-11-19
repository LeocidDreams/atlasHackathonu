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
      body: createBodySchema ? createBodySchema() : z.object({}),
      query: createQuerySchema ? createQuerySchema() : z.object({}),
      headers: createHeadersSchema ? createHeadersSchema() : z.object({}),
    });
};
