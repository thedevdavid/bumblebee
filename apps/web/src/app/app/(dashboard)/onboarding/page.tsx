import { getUserSession } from "@/actions/user";
import { Wizard } from "./_components/wizard";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: { step: "1" | "2" | "3" | "4" };
}) {
  const session = await getUserSession();

  if (!session) {
    return null;
  }

  return <Wizard userId={session?.user.id} />;
}
