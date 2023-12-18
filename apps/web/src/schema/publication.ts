import * as z from "zod";

export const publicationSchema = z.object({
  beehiiv_api_key: z.string().optional(),
  beehiiv_publication_id: z.string().optional(),
});
