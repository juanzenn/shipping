"use client";
import { useToast } from "@/components/ui/use-toast";
import { supabaseClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "./ui";

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp() {
    const res = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (res.error) {
      toast({
        title: "Oops! Something went wrong.",
        description: res.error.message,
        variant: "destructive",
      });

      return;
    }

    router.refresh();
  }

  async function handleSignIn() {
    const res = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (res.error) {
      toast({
        title: "Oops! Something went wrong.",
        description: res.error.message,
        variant: "destructive",
      });

      return;
    }

    router.refresh();
  }

  return (
    <Card className="w-full max-w-md mx-6">
      <CardHeader className="text-center">
        <CardTitle>Inicio de sesión</CardTitle>
        <CardDescription>Ingresa con tu correo y contraseña</CardDescription>
      </CardHeader>

      <CardContent>
        <section className="mb-6 space-y-2">
          <Input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </section>

        <section className="flex flex-col gap-2">
          <Button onClick={handleSignIn}>Iniciar sesión</Button>
          <Button onClick={handleSignUp} variant="outline">
            Crear cuenta
          </Button>
        </section>
      </CardContent>
    </Card>
  );
}
