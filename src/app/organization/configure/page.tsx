import CreateOrgForm from "@/components/create-org-form";
import JoinOrgForm from "@/components/join-org-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrganizationFormsProvider } from "@/context/org-form-context";
import React from "react";

export const metadata = {
  title: "Shipping - Configurar Organización",
};

export default function ConfigureOrganizationPage() {
  return (
    <main className="w-full h-full flex justify-center items-center">
      <Card className="w-full max-w-2xl mx-6">
        <CardHeader className="mb-8">
          <CardTitle>
            Parece que no tienes una organización configurada
          </CardTitle>
          <CardDescription>
            Crea una organización o únete a una existente para continuar.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex h-full gap-6">
          <OrganizationFormsProvider>
            <CreateOrgForm />
            <div className="border-l border-border" />
            <JoinOrgForm />
          </OrganizationFormsProvider>
        </CardContent>
      </Card>
    </main>
  );
}
