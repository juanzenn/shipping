import { db } from "@/lib/db";
import { handlePrismaError } from "@/lib/error";
import { generateRandomCode } from "@/lib/org";
import { getCurrentUser } from "@/lib/user";
import { NextResponse } from "next/server";

type IPostBody = {
  name: string;
};

export async function POST(req: Request) {
  const { name } = (await req.json()) as IPostBody;
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return NextResponse.json(
      { error: "You need an account to access this route." },
      { status: 401 }
    );

  try {
    // Generate a random code and check if it already exists
    let code = generateRandomCode();
    while (await db.organization.findFirst({ where: { code } })) {
      code = generateRandomCode();
    }

    const org = await db.organization.create({
      data: { name, code: generateRandomCode() },
    });

    await db.user.update({
      where: { id: currentUser.id },
      data: { organizationId: org.id, role: "ADMIN" },
    });

    return NextResponse.json(org, { status: 201 });
  } catch (error) {
    const prismaError = handlePrismaError(error);

    if (prismaError) {
      return NextResponse.json(prismaError, { status: 400 });
    }

    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
