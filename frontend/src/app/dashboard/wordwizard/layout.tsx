import React from "react";

export default function WordWizardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative w-full h-full">{children}</section>
  );
}
