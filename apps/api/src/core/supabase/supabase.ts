import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL ??
  (() => {
    throw Error(`SUPABASE_URL is not defined`);
  })();

const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY ??
  (() => {
    throw Error(`SUPABASE_SECRET_KEY is not defined`);
  })();

export const supabase = createClient(supabaseUrl, supabaseSecretKey);
