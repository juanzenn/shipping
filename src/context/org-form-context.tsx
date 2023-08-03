"use client";
import React from "react";

type OrganizationFormsContextType = {
  loading: "join" | "create" | null;
  activateLoader: (key: "join" | "create") => void;
  deactivateLoader: () => void;
};

const OrganizationFormsContext =
  React.createContext<OrganizationFormsContextType>(
    {} as OrganizationFormsContextType
  );

export function useOrganizationForms() {
  return React.useContext(OrganizationFormsContext);
}

export function OrganizationFormsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = React.useState<"join" | "create" | null>(null);

  function activateLoader(key: "join" | "create") {
    setLoading(key);
  }

  function deactivateLoader() {
    setLoading(null);
  }

  return (
    <OrganizationFormsContext.Provider
      value={{ loading, activateLoader, deactivateLoader }}
    >
      {children}
    </OrganizationFormsContext.Provider>
  );
}
