import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ??
  (() => {
    throw Error(`VITE_SUPABASE_URL is not defined`);
  })();

const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  (() => {
    throw Error(`VITE_SUPABASE_PUBLISHABLE_KEY is not defined`);
  })();

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
