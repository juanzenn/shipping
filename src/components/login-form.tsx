"use client";
import { useToast } from "@/components/ui/use-toast";
import { Chrome } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui";

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  async function handleSignInGoogle() {
    function handleError(error: string) {
      toast({
        title: "Oops! Something went wrong.",
        description: error,
        variant: "destructive",
      });
    }

    function handleSuccess() {
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
      });

      router.refresh();
      router.push("/dashboard");

      return;
    }

    const res = await signIn("google", {});

    if (res?.error) return handleError(res.error);

    handleSuccess();
  }

  return (
    <Card className="w-full max-w-md mx-6">
      <CardHeader className="text-center">
        <CardTitle className="font-bold">Inicio de sesión</CardTitle>
        <CardDescription>
          Registra tus paquetes en nuestro sistema
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button onClick={handleSignInGoogle} className="w-full">
          <Chrome size={24} className="mr-2" />
          Iniciar sesión con Google
        </Button>
      </CardContent>
    </Card>
  );
}
