import { cookies } from "next/headers";

import { type EmailOtpType } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      return Response.redirect(new URL(next, request.url));
    }
    console.log(error);
  }

  // return the user to an error page with some instructions
  return Response.redirect(
    new URL(
      "/auth/signin?message=Something went wrong. Please try again.",
      request.url,
    ),
  );
}
