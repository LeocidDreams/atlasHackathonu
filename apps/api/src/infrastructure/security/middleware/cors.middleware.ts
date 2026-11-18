import cors from "cors";
import type { RequestHandler } from "express";

export const corsMiddleware = (): RequestHandler => {
  return cors();
};
