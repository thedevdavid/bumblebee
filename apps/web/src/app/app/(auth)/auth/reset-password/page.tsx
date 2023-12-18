import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { Input, Label } from "@bumblebee/ui";

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
      <div className="px-4 py-5">
        <dt className="text-muted-foreground text-sm font-medium">
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
