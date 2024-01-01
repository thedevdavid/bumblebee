import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CTA } from "@/components/cta";
import { ReportAbuse } from "@/components/report-abuse";
import { getPublicationData } from "@/lib/fetchers";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata | null> {
  const domain = decodeURIComponent(params.domain);
  const { data } = await getPublicationData(domain);

  if (!data) {
    return null;
  }

  const {
    name: title,
    about_content: description,
    og_image_path: image,
    logo_path: logo,
  } = data;

  const ogDescription = description
    ? description.substring(0, 60)
    : "Default description";

  return {
    title,
    description,
    openGraph: {
      title,
      description: ogDescription,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: ogDescription,
      images: [image],
      creator: "@thedevdavid", // TODO: set creator for subdomains
    },
    icons: [logo],
    metadataBase: new URL(`https://${domain}`),
    // Set canonical URL to custom domain if it exists
    ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
      data.custom_domain && {
        alternates: {
          canonical: `https://${data.custom_domain}`,
        },
      }),
  };
}

export default async function PublicationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const { data } = await getPublicationData(domain);

  if (!data) {
    notFound();
  }

  // Optional: Redirect to custom domain if it exists
  if (
    domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    data.custom_domain &&
    process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === "true"
  ) {
    return redirect(`https://${data.custom_domain}`);
  }

  return (
    // Add custom theme as className here
    <div>
      <div className="ease left-0 right-0 top-0 z-30 flex h-16 bg-white transition-all duration-150 dark:bg-black dark:text-white">
        <div className="mx-auto flex h-full max-w-screen-xl items-center justify-center space-x-5 px-10 sm:px-20">
          <Link href="/" className="flex items-center justify-center">
            <div className="inline-block h-8 w-8 overflow-hidden rounded-full align-middle">
              <Image
                alt={data.name || ""}
                height={40}
                src={data.logo_path || ""}
                width={40}
              />
            </div>
            <span className="font-title ml-3 inline-block truncate font-medium">
              {data.name}
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-20">{children}</div>

      {/* TODO: real demo site domains */}
      {domain == `developreneur.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
      domain == `developreneur.com` ? (
        <CTA />
      ) : (
        <ReportAbuse />
      )}
    </div>
  );
}
