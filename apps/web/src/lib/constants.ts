export const HOME_DOMAIN = `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

export const APP_HOSTNAMES = new Set([
  `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
  `preview.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
  "localhost:3000",
  "localhost",
]);
export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://preview.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
      : `http://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

export const PROSE_CN =
  "prose dark:prose-invert prose-p:font-extralight prose-zinc text-foreground/70 font-light prose-headings:font-medium prose-headings:text-foreground/80 prose-strong:text-foreground/80 prose-strong:font-normal prose-code:text-foreground/70 prose-code:font-light prose-code:font-monospace prose-blockquote:text-foreground/80 prose-blockquote:font-normal";
