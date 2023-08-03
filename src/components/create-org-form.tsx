"use client";
import { useOrganizationForms } from "@/context/org-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
  name: z
    .string()
    .min(2, "El nombre debe tener más de 2 caracteres.")
    .max(50, "El nombre debe tener menos de 50 caracteres."),
});

export default function CreateOrgForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { loading, activateLoader, deactivateLoader } = useOrganizationForms();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    activateLoader("create");
    const res = await fetch("/api/organization", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (res.ok) {
      router.refresh();
      router.push("/dashboard");
      toast({
        title: "¡Organización creada!",
        description:
          "Puedes empezar a registrar paquetes, o invitar a otros miembros a tu organización.",
      });

      deactivateLoader();
      return;
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Casht" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                El nombre debe ser entre 2 y 50 caracteres.
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={Boolean(loading)}>
          {loading === "create" ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Crear"
          )}
        </Button>
      </form>
    </Form>
  );
}
