import { z } from "zod";

export const magicLinkSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});
