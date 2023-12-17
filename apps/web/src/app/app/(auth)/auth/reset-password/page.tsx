import { cookies } from "next/headers";

import { Input, Label } from "@bumblebee/ui";
import { createClient } from "@/lib/supabase/server";

// TODO: Server actions, form state, etc.
export default async function ResetPasswordPage() {
  const changePassword = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "/me/update-password",
    });

    if (error) {
      console.log(error);
      return;
    }
    return;
  };
  return (
    <form action={changePassword}>
      <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-muted-foreground">
          <Label>What&apos;s your email?</Label>
        </dt>
        <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
          <Input
            className="inline-block bg-transparent"
            type="email"
            name="email"
            placeholder="yourmail@company.com"
          />
        </dd>
      </div>
    </form>
  );
}
