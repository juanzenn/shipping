import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { auth } from "./auth";

export type ExtendedUser = {
  name?: string;
  email?: string;
  image?: string;
  id: User["id"];
  emailVerified?: User["emailVerified"];
  organizationId?: User["organizationId"];
  role?: User["role"];
};

export async function getCurrentUser() {
  const session = await getServerSession(auth);
  if (!session || !session?.user) return null;

  const { user } = session;

  return user as ExtendedUser;
}
