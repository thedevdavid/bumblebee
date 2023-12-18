export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen flex-col items-center justify-center md:flex-row">
      {children}
    </main>
  );
}
