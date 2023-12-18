"use server";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";

import { unstable_cache } from "next/cache";

export async function getPublicationData(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return await unstable_cache(
    async () => {
      return supabase
        .from("publications")
        .select("*, profiles(*)")
        .or(`subdomain.eq${subdomain},custom_domain.eq.${domain}`);
    },
    [`${domain}-metadata`],
    {
      revalidate: 900,
      tags: [`${domain}-metadata`],
    },
  )();
}

export async function getBeehiivPublications(beehiiv_api_key: string) {
  const beehiivPublications = await fetch(
    `https://api.beehiiv.com/v2/publications`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${beehiiv_api_key}`,
      },
      cache: "no-store",
    },
  );
  if (!beehiivPublications.ok) {
    console.log(beehiivPublications.status);
    console.log(beehiivPublications.statusText);
    return null;
  }
  return await beehiivPublications.json();
}
