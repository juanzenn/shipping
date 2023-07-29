import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "./supabase.types";

export async function getUser() {
  const supabaseServer = createServerComponentClient<Database>({
    cookies,
  });

  const { data } = await supabaseServer.auth.getUser();

  return data.user;
}
