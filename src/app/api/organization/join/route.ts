import { db } from "@/lib/db";
import { handlePrismaError } from "@/lib/error";
import { generateRandomCode } from "@/lib/org";
import { getCurrentUser } from "@/lib/user";
import { NextResponse } from "next/server";

type IPostBody = {
  code: string;
};

export async function POST(req: Request) {
  const { code } = (await req.json()) as IPostBody;
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return NextResponse.json(
      { error: "You need an account to access this route." },
      { status: 401 }
    );

  try {
    const org = await db.organization.findFirst({
      where: { code },
    });

    if (!org) {
      return NextResponse.json(
        { message: "Organization not found.", cause: "org-not-found" },
        { status: 404 }
      );
    }

    await db.user.update({
      where: { id: currentUser.id },
      data: { organizationId: org.id, role: "WORKER" },
    });

    return NextResponse.json(org, { status: 200 });
  } catch (error) {
    const prismaError = handlePrismaError(error);

    if (prismaError) {
      return NextResponse.json(prismaError, { status: 400 });
    }

    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
