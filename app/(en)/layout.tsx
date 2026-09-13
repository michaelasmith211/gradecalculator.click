import React from "react";
import AppShell from "@/components/AppShell";
import { enTranslations } from "@/lib/i18n/translations";

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell locale="en" translations={enTranslations}>
      {children}
    </AppShell>
  );
}
