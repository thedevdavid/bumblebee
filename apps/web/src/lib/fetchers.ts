"use server";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";

import { getCurrentUserPublications } from "@/actions/user";
import {
  BeehivePublicationPost,
  BeehivePublicationPosts,
  BeehivePublications,
} from "@/types/index";
import { unstable_cache } from "next/cache";

export async function getBeehiivPostsByPublication(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  const userPublicationsRes = await getCurrentUserPublications();

  // TODO: query this with SQL from supabase directly instead???
  const res = userPublicationsRes?.data.filter(
    (pub) => pub.subdomain === subdomain,
  );
  if (!res || res.length === 0) {
    return null;
  }

  const { beehiiv_publication_id } = res[0];

  return await unstable_cache(
    async () => {
      return getBeehiivPublicationPosts(
        beehiiv_publication_id,
        userPublicationsRes?.beehiivApiKey || "error no api key",
      );
    },
    [`${domain}-posts`],
    {
      revalidate: 900,
      tags: [`${domain}-posts`],
    },
  )();
}

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
        .or(`subdomain.eq${subdomain},custom_domain.eq.${domain}`)
        .single();
    },
    [`${domain}-metadata`],
    {
      revalidate: 900,
      tags: [`${domain}-metadata`],
    },
  )();
}

export async function getBeehiivPublications(
  beehiiv_api_key: string,
): Promise<BeehivePublications | null> {
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

export async function getBeehiivPublicationPosts(
  beehiiv_publication_id: string,
  beehiiv_api_key: string,
): Promise<BeehivePublicationPosts[] | null> {
  const beehiivPublicationPosts = await fetch(
    `https://api.beehiiv.com/v2/publications/${beehiiv_publication_id}/posts`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${beehiiv_api_key}`,
      },
      cache: "no-store",
    },
  );
  if (!beehiivPublicationPosts.ok) {
    console.log(beehiivPublicationPosts.status);
    console.log(beehiivPublicationPosts.statusText);
    return null;
  }
  return await beehiivPublicationPosts.json();
}

export async function getBeehiivPublicationPostData(
  beehiiv_publication_id: string,
  beehiiv_api_key: string,
  beehiiv_post_id: string,
): Promise<BeehivePublicationPost | null> {
  const beehiivPublicationPosts = await fetch(
    `https://api.beehiiv.com/v2/publications/${beehiiv_publication_id}/post/${beehiiv_post_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${beehiiv_api_key}`,
      },
      cache: "no-store",
    },
  );
  if (!beehiivPublicationPosts.ok) {
    console.log(beehiivPublicationPosts.status);
    console.log(beehiivPublicationPosts.statusText);
    return null;
  }
  return await beehiivPublicationPosts.json();
}
