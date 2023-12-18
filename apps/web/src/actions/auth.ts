"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { FormResponse } from "@/types/index";

import { magicLinkSchema } from "@/schema/auth";
import { createClient } from "@/lib/supabase/server";

export const signInWithMagicLink = async (
  prevState: FormResponse,
  formData: FormData,
) => {
  const parse = magicLinkSchema.safeParse({
    email: formData.get("email"),
    // token: formData.get('cf-turnstile-response')
  });

  if (!parse.success) {
    return {
      success: false,
      message: "Something happened. Please try again later",
    };
  }

  const origin = headers().get("origin");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // const { data, error: captchaError } = await supabase.functions.invoke('cloudflare-turnstile', {
  //   body: { token },
  // });

  const { error } = await supabase.auth.signInWithOtp({
    email: parse.data.email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${origin}/dashboard`,
    },
  });

  if (error) {
    console.log(error);
    return { success: false, message: "Could not authenticate user." };
  }

  return redirect("/auth/signin/magic-email-sent");
};

export const signOut = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    await supabase.auth.signOut();
  }

  return redirect("/");
};