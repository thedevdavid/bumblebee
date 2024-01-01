import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";

export const getUserSession = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.log("getUserSession error");
    console.log(error);
    return null;
  }

  return session;
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

export const getCurrentUserWithProfile = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData } = await supabase.auth.getUser();

  const { data, error } = await supabase.from("profiles").select("*").single();

  if (error) {
    console.log("getCurrentUserWithProfile error");
    console.log(error);
    return null;
  }

  return { data, userData: userData.user };
};

export const getCurrentUserPublications = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const userRes = await getCurrentUserWithProfile();

  if (userRes?.userData?.id) {
    if (userRes.data.beehiiv_api_key) {
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .eq("profile_id", userRes?.userData?.id);
      if (error) {
        console.log("getCurrentUserWithProfileAndPublications error");
        console.log(error);
        return null;
      }
      return { data, beehiivApiKey: userRes.data.beehiiv_api_key };
    }
  }
};
