import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";

export const getUserSession = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
};

export const getCurrentUserWithProfile = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user?.id)
    .single();

  return { data, userData };
};

export const getUserProfile = async (userId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  return data;
};
