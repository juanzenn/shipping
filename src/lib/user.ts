import { getServerSession } from "next-auth";
import { auth } from "./auth";

export async function getCurrentUser() {
  const session = await getServerSession(auth);
  if (!session || !session?.user) return null;

  const { user } = session;

  return user;
}
