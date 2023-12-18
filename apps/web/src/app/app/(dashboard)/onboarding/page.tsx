import { Wizard } from "./_components/wizard";

export default function OnboardingPage({
  searchParams,
}: {
  searchParams: { step: "1" | "2" | "3" | "4" };
}) {
  // TODO: if user hasn't completed onboarding, redirect to step 1
  // if (searchParams.step !== "1") {
  //   return redirect("/onboarding?step=1");
  // }

  return <Wizard />;
}
