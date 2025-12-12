"use client";

import { Toaster } from "sonner";

export default function ToasterProvider() {
  return (
    <Toaster
      richColors
      position="top-center"
      closeButton
      toastOptions={{
        duration: 3000,
      }}
    />
  );
}
