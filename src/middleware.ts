import { NextResponse } from "next/server";
import { getUser } from "./lib/auth";

import type { NextRequest } from "next/server";

export async function middleware(_: NextRequest) {
  const res = NextResponse.next();
  // await getUser();

  return res;
}
