import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bumblebee",
  description: "Those bees deserve a nicer hive.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <>{children}</>;
}
