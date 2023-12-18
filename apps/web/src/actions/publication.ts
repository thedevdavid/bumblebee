"use server";

import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { publicationSchema } from "@/schema/publication";
import { FormResponse } from "@/types/index";

export const getPublicationsByApiKey = async (
  prevState: FormResponse,
  formData: FormData,
) => {
  const parse = publicationSchema.safeParse({
    beehiiv_api_key: formData.get("beehiiv_api_key"),
  });

  if (!parse.success) {
    return {
      success: false,
      message: "Something happened. Please try again later",
    };
  }
  const beehiivPublications = await fetch(
    `https://api.beehiiv.com/v2/publications`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parse.data.beehiiv_api_key}`,
      },
    },
  );
  if (!beehiivPublications.ok) {
    return {
      success: false,
      message: "Failed to fetch publications from Beehiiv.",
    };
  }
  const beehiivPublicationsData = await beehiivPublications.json();
  return { success: true, message: "Success", data: beehiivPublicationsData };
};

export const addNewPublication = async (
  prevState: FormResponse,
  formData: FormData,
) => {
  const parse = publicationSchema.safeParse({
    beehiiv_api_key: formData.get("beehiiv_api_key"),
    beehiiv_publication_id: formData.get("beehiiv_publication_id"),
  });

  if (!parse.success) {
    return {
      success: false,
      message: "Something happened. Please try again later",
    };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.from("publications").insert([
    {
      beehiiv_api_key: parse.data.beehiiv_api_key,
      beehiiv_publication_id: parse.data.beehiiv_publication_id,
    },
  ]);

  return data;
};
