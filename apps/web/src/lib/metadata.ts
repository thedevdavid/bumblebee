export type SiteMetaData = {
  title: {
    template: string;
    default: string;
  };
  description: string;
  defaultTheme: "light" | "dark" | "system";
};

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

export const BASE_URL = getURL();

const defaultTitle = "Bumblebee";
const defaultDescription = "Your bees deserve a nicer hive.";

const siteMetadata: SiteMetaData = {
  title: {
    template: `%s | ${defaultTitle}`,
    default: defaultTitle,
  },
  description: defaultDescription,
  defaultTheme: "system",
};

export default siteMetadata;
