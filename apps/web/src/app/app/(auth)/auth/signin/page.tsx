import { LogoIcon } from "@bumblebee/ui";
import { Metadata } from "next";
import Link from "next/link";

import { HOME_DOMAIN } from "@/lib/constants";
import siteMetadata from "@/lib/metadata";
import { MagicAuthForm } from "./_components/login-form-magic";

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
      <div className="bg-foreground text-background flex h-full w-full flex-col p-10">
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link
            href="/"
            aria-label="Go to Home"
            className="flex text-yellow-400"
          >
            <LogoIcon className="mr-3 h-full w-full" />
            <span className="text-background hidden font-bold lg:inline">
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
      <div className="flex h-full w-full items-center justify-center lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
            <p className="text-muted-foreground text-sm">
              Enter your email below to access your dashboard
            </p>
          </div>
          <div className="flex min-h-[20px] w-full flex-col justify-start space-y-6">
            <MagicAuthForm />
          </div>
          {searchParams?.message && (
            <p className="bg-foreground/10 text-foreground mt-4 p-4 text-center">
              {searchParams.message}
            </p>
          )}
          <p className="text-muted-foreground px-8 text-center text-sm">
            By clicking continue, you agree to our{" "}
            <Link
              href={`${HOME_DOMAIN}/terms`}
              target="_blank"
              className="hover:text-primary underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href={`${HOME_DOMAIN}/privacy`}
              target="_blank"
              className="hover:text-primary underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
