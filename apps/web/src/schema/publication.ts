import * as z from "zod";

export const publicationSchema = z.object({
  beehiiv_api_key: z.string(),
  beehiiv_publication_id: z.string().regex(/^(pub_)/),
  name: z.string(),
  subdomain: z.string(),
  custom_domain: z.string().nullable(),
  about_content: z.string().nullable(),
  not_found_content: z
    .string()
    .default(
      "Whoops! Looks like this page buzzed away, just like a bumblebee.",
    ),
  logo_path: z.string().default(""),
  og_image_path: z.string().default(""),
  template: z.enum(["default", "modern", "brutalist"]).default("default"),
  theme: z.object({
    primary: z.string().default("24 9.8% 10%"),
    accent: z.string().default("60 4.8% 95.9%"),
    background: z.string().default("0 0% 100%"),
    text: z.string().default("20 14.3% 4.1%"),
    font: z.enum(["inter", "cal", "lora", "work"]).default("inter"),
  }),
});
