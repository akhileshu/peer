"use client";
import { Toaster } from "sonner";

export const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        duration: 10000, // Adjust duration (10 seconds by default)
      }}
      richColors
    />
  );
};
