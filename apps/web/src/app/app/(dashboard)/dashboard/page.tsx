import { getCurrentUserWithProfile } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const res = await getCurrentUserWithProfile();

  console.log(res);
  if (res.data.onboarding_finished) {
    redirect("/app/onboarding");
  }

  return (
    <div>
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </div>
  );
}
