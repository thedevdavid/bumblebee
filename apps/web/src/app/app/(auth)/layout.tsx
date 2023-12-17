export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen w-screen flex-wrap content-center items-center justify-center">
      {children}
    </main>
  );
}
