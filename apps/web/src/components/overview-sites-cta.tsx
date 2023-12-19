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
    <Button asChild>
      <Link href="/publications">View All Sites</Link>
    </Button>
  ) : (
    <CreatePublicationButton
      userId={currentUser.userData?.id}
      publications={beehiivPublications?.data}
    />
  );
}
