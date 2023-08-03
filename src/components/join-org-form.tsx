"use client";
import { useOrganizationForms } from "@/context/org-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  code: z
    .string()
    .regex(
      /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/,
      "Código inválido."
    ),
});

export default function JoinOrgForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { loading, activateLoader, deactivateLoader } = useOrganizationForms();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    activateLoader("join");
    const res = await fetch("/api/organization/join", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (res.ok) {
      router.refresh();
      router.push("/dashboard");
      toast({
        title: "¡Te has unido a una organización!",
        description:
          "Ahora podrás ver acceder a los paquetes de tu organización.",
      });

      return deactivateLoader();
    }

    const { message, cause } = await res.json();
    toast({
      title: "Oops! Something went wrong.",
      description: `${message} (${cause})`,
      variant: "destructive",
    });
    deactivateLoader();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código de organización</FormLabel>
              <FormControl>
                <Input
                  placeholder="N9TT-9G0A-B7FQ-RANC"
                  {...field}
                  value={field.value.toUpperCase()}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Este es un código de 16 caracteres que te proporciona el
                administrador de tu organización.
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={Boolean(loading)}>
          {loading === "join" ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Unirse a organización"
          )}
        </Button>
      </form>
    </Form>
  );
}
