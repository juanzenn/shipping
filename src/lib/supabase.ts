import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./supabase.types";

export const supabaseClient = createClientComponentClient<Database>();
