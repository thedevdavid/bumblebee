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
