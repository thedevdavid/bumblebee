// organize-imports-ignore
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";

// import "@bumblebee/ui/dist/index.css";
import { cn } from "@/lib/utils";
import siteMetadata from "@/lib/metadata";
import { BackTopButton } from "@/components/back-to-top";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export const viewport: Viewport = {
  themeColor: "hsl(var(--primary))",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          "bg-background text-foreground min-h-screen overflow-x-hidden font-sans antialiased",
        )}
      >
        <Providers>
          <Toaster richColors position="top-right" theme="light" />
          {children}

          <BackTopButton />
        </Providers>
      </body>
    </html>
  );
}
