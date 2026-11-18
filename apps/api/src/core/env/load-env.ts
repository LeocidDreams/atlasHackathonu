import dotenv from "dotenv";
import path from "node:path";

if (process.env.NODE_ENV === "development") {
  dotenv.config({
    path: [
      path.resolve(import.meta.dirname, "../../../.env.dev"),
      path.resolve(import.meta.dirname, "../../../.env"),
    ],
    override: true,
  });
}
