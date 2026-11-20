import * as z from "zod";

export function createAskQuerySchema() {
  const schema = z.object({
    university: z.string().min(1).max(200),
    query: z.string().min(1).max(2000),
  });
  return schema;
}

export type AskQueryDto = z.infer<ReturnType<typeof createAskQuerySchema>>;
