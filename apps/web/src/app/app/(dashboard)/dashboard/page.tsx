import { signOut } from "@/actions/auth";
import { getCurrentUserWithProfile } from "@/actions/user";
import { Button } from "@bumblebee/ui";

export default async function DashboardPage() {
  const res = await getCurrentUserWithProfile();

  console.log(res);
  // if (res.data.onboarding_finished) {
  //   redirect("/app/onboarding");
  // }

  return (
    <div>
      <pre>{JSON.stringify(res, null, 2)}</pre>
      <Button formAction={signOut}>sign out</Button>
    </div>
  );
}
