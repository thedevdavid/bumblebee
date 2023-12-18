import * as z from "zod";

export const publicationSchema = z.object({
  beehiiv_api_key: z.string().optional(),
  beehiiv_publication_id: z.string().optional(),
  subdomain: z.string().optional(),
  custom_domain: z.string().optional(),
  name: z.string().optional(),
  logo: z.string().optional(),
  template: z.string().optional(),
  font: z.string().optional(),
  theme: z.string().optional(),
});
