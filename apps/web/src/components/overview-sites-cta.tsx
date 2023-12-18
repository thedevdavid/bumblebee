import { getPublications } from "@/actions/publication";
import { getCurrentUserWithProfile } from "@/actions/user";
import { getBeehiivPublications } from "@/lib/fetchers";
import { Button } from "@bumblebee/ui";
import Link from "next/link";
import CreatePublicationButton from "./create-publication-button";

export default async function OverviewSitesCTA() {
  const currentUser = await getCurrentUserWithProfile();
  const publications = await getPublications();

  if (!currentUser?.userData?.id) {
    return null;
  }

  if (!currentUser?.data?.beehiiv_api_key) {
    return (
      <Button asChild>
        <Link href="/settings">Link your Beehiiv account</Link>
      </Button>
    );
  }

  const beehiivPublications = await getBeehiivPublications(
    currentUser?.data.beehiiv_api_key,
  );

  return publications && publications.length > 0 ? (
    <Link
      href="/publications"
      className="rounded-lg border border-black bg-black px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800"
    >
      View All Sites
    </Link>
  ) : (
    <CreatePublicationButton
      userId={currentUser.userData?.id}
      publications={beehiivPublications?.data}
    />
  );
}
