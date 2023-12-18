"use client";

import { ThemeProvider } from "@/components/theme-provider";
import siteMetadata from "@/lib/metadata";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={siteMetadata.defaultTheme}
      storageKey="bumblebee-theme"
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  );
}
