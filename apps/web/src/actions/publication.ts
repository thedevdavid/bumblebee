"use server";

import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { publicationSchema } from "@/schema/publication";
import { FormResponse } from "@/types/index";
import { customAlphabet } from "nanoid";
import { revalidateTag } from "next/cache";

import {
  addDomainToVercel,
  // getApexDomain,
  removeDomainFromVercelProject,
  // removeDomainFromVercelTeam,
  validDomainRegex,
} from "@/lib/domains";
import { Tables } from "@/types/db";
import { getUserSession } from "./user";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

export const getPublication = async (publicationId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("publications")
    .select("*")
    .eq("id", publicationId)
    .single();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Success",
    data,
  };
};

export const getPublications = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("publications").select("*");

  if (error) {
    console.log("getPublication error");
    console.log(error);
    return null;
  }

  return data;
};

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
    subdomain: formData.get("subdomain"),
    name: formData.get("name"),
    logo_path: formData.get("logo_path"),
    og_image_path: formData.get("og_image_path"),
    template: formData.get("template"),
    theme: formData.get("theme"),
  });

  if (!parse.success) {
    return {
      success: false,
      message: "Something happened. Please try again later",
    };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const session = await getUserSession();

  if (!session) {
    return {
      success: false,
      message: "You must be logged in to create a publication",
    };
  }

  const { data, error } = await supabase
    .from("publications")
    .insert({
      beehiiv_publication_id: parse.data.beehiiv_publication_id,
      subdomain: parse.data.subdomain,
      name: parse.data.name,
      logo_path: "generate logo",
      og_image_path: "generate_OG",
      theme: parse.data.theme,
      template: parse.data.template,
      profile_id: session?.user.id,
    })
    .select();

  await revalidateTag(
    `${parse.data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
  );

  if (error) {
    if (error.code === "P2002") {
      return {
        success: false,
        message: `This subdomain is already taken`,
      };
    }
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Success",
    data,
  };
};

// const updatePublicationWithId = updatePublication.bind(null, publicationId)

export const updatePublication = async (
  publicationId: string,
  prevState: FormResponse,
  formData: FormData,
) => {
  const parse = publicationSchema.safeParse({
    beehiiv_api_key: formData.get("beehiiv_api_key"),
    beehiiv_publication_id: formData.get("beehiiv_publication_id"),
    subdomain: formData.get("subdomain"),
    custom_domain: formData.get("custom_domain"),
    name: formData.get("name"),
    logo_path: formData.get("logo_path"),
    og_image_path: formData.get("og_image_path"),
    template: formData.get("template"),
    theme: formData.get("theme"),
  });

  if (!parse.success) {
    return {
      success: false,
      message: "Something happened. Please try again later",
    };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: site, error } = await supabase
    .from("publications")
    .select("custom_domain, beehiiv_publication_id, subdomain")
    .eq("id", publicationId)
    .returns<Tables<"publications">>();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  try {
    let response;

    if (parse.data.custom_domain) {
      if (parse.data.custom_domain === "trybumblebee.com") {
        return {
          error: "Cannot use trybumblebee.com subdomain as your custom domain",
        };

        // if the custom domain is valid, we need to add it to Vercel
      } else if (validDomainRegex.test(parse.data.custom_domain)) {
        const { data, error } = await supabase
          .from("publications")
          .update({ custom_domain: parse.data.custom_domain })
          .eq("beehiiv_publication_id", parse.data.beehiiv_publication_id!);

        await Promise.all([
          addDomainToVercel(parse.data.custom_domain),
          // Optional: add www subdomain as well and redirect to apex domain
          addDomainToVercel(`www.${parse.data.custom_domain}`),
        ]);

        // empty value means the user wants to remove the custom domain
      } else if (parse.data.custom_domain === "") {
        const { data, error } = await supabase
          .from("publications")
          .update({ custom_domain: null })
          .eq("id", publicationId)
          .select("");
      }

      // if the site had a different customDomain before, we need to remove it from Vercel
      if (
        site?.custom_domain &&
        site?.custom_domain !== parse.data.custom_domain
      ) {
        response = await removeDomainFromVercelProject(site?.custom_domain);

        /* Optional: remove domain from Vercel team

        // first, we need to check if the apex domain is being used by other sites
        const apexDomain = getApexDomain(`https://${site.customDomain}`);
        const domainCount = await prisma.site.count({
          where: {
            OR: [
              {
                customDomain: apexDomain,
              },
              {
                customDomain: {
                  endsWith: `.${apexDomain}`,
                },
              },
            ],
          },
        });

        // if the apex domain is being used by other sites
        // we should only remove it from our Vercel project
        if (domainCount >= 1) {
          await removeDomainFromVercelProject(site.customDomain);
        } else {
          // this is the only site using this apex domain
          // so we can remove it entirely from our Vercel team
          await removeDomainFromVercelTeam(
            site.customDomain
          );
        }

        */
      }
      // } else if (parse.data.logo) {
      //   if (!process.env.BLOB_READ_WRITE_TOKEN) {
      //     return {
      //       error:
      //         "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
      //     };
      //   }

      //   const file = formData.get(key) as File;
      //   const filename = `${nanoid()}.${file.type.split("/")[1]}`;

      //   const { url } = await put(filename, file, {
      //     access: "public",
      //   });

      //   const blurhash = key === "image" ? await getBlurDataURL(url) : null;

      //   response = await prisma.site.update({
      //     where: {
      //       id: site.id,
      //     },
      //     data: {
      //       [key]: url,
      //       ...(blurhash && { imageBlurhash: blurhash }),
      //     },
      //   });
      // } else {
      else {
        const { data, error } = await supabase
          .from("publications")
          .update(parse.data)
          .eq("id", publicationId);

        if (error) {
          return {
            success: false,
            message: error.message,
          };
        }
      }
    }
    console.log(
      "Updated site data! Revalidating tags: ",
      `${site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
      `${site?.custom_domain}-metadata`,
    );
    await revalidateTag(
      `${site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );
    site?.custom_domain &&
      (await revalidateTag(`${site?.custom_domain}-metadata`));

    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This is already taken`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const deletePublication = async (publicationId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("publications")
    .delete()
    .eq("id", publicationId)
    .select("subdomain, custom_domain")
    .returns<Tables<"publications">>();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  await revalidateTag(
    `${data?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
  );
  data?.custom_domain &&
    (await revalidateTag(`${data?.custom_domain}-metadata`));
};

export const getPublicationByPostId = async (postId: string) => {
  return postId;
};
