import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bumblebee",
  description: "Those bees deserve a nicer hive.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <Toaster className="dark:hidden" />
      <Toaster theme="dark" className="hidden dark:block" />
      <body
        className={`min-h-screen overflow-x-hidden bg-background font-sans text-foreground antialiased w-screen ${inter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
