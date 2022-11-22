import { createClient } from "@supabase/supabase-js";
import { environment } from "../environments/environment";

const supabase = createClient(
  environment.supabaseUrl,
  environment.supabaseKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  }
);

export default supabase;
