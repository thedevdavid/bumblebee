import { getPublications } from "@/actions/publication";
import { getUserSession } from "@/actions/user";
import Image from "next/image";
import PublicationCard from "./publication-card";

export default async function Publications({ limit }: { limit?: number }) {
  const session = await getUserSession();
  const publications = await getPublications();

  if (!session || !publications) {
    return null;
  }

  return publications.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {publications.map((publication) => (
        <PublicationCard key={publication.id} data={publication} />
      ))}
    </div>
  ) : (
    <div className="mt-20 flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">No Publications Yet</h1>
      <Image
        alt="missing site"
        src="https://illustrations.popsy.co/gray/web-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        You do not have any publications yet. Create one to get started.
      </p>
    </div>
  );
}
