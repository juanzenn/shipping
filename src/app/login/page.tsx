import LoginForm from "@/components/login-form";
import { getCurrentUser } from "@/lib/user";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Shipping - Login",
};

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) redirect("/dashboard");

  return (
    <main className="flex w-full h-full items-center justify-center bg-primary">
      <LoginForm />
    </main>
  );
}
