import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Login to your account.",
};

export default async function MagicSignInConfirmPage() {
  return (
    <div className="flex h-full items-center justify-center">
      Check your email!
    </div>
  );
}
