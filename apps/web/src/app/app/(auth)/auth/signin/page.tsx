import { Button, LogoIcon } from "@bumblebee/ui";
import { Metadata } from "next";
import Link from "next/link";

import { MagicAuthForm } from "./_components/login-form-magic";
import siteMetadata from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Login to your account.",
};

export default async function AuthenticationSignInPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <>
      <div className="grid h-full items-stretch justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="h-full flex-col bg-zinc-900 p-10 text-white dark:border-r lg:flex">
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link
              href="/"
              aria-label="Go to Home"
              className="flex text-[#ed9c22]"
            >
              <LogoIcon className="mr-3 h-full w-full" />
              <span className="hidden font-bold uppercase text-white lg:inline">
                {siteMetadata.title.default}
              </span>
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">&ldquo;Looks good.&rdquo;</p>
              <footer className="text-sm">J. Doe</footer>
            </blockquote>
          </div>
        </div>
        <div className="relative flex h-full items-center justify-center lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to access your dashboard
              </p>
            </div>
            <MagicAuthForm />
            {searchParams?.message && (
              <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
                {searchParams.message}
              </p>
            )}
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
