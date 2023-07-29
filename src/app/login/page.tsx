import LoginForm from "@/components/login-form";
import { getUser } from "@/lib/auth";
import React from "react";

export default async function LoginPage() {
  const user = await getUser();

  return (
    <main className="flex w-full h-full items-center justify-center bg-primary">
      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>

      <LoginForm />
    </main>
  );
}
