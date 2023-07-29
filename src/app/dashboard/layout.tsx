import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const user = await getUser();

  if (!user) redirect("/login");

  return (
    <div>
      DashboardLayout
      {children}
    </div>
  );
}
