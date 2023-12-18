"use client";

// import { Turnstile } from '@marsidev/react-turnstile';
import { signInWithMagicLink } from "@/actions/auth";
import { FormResponse } from "@/types/index";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import { SubmitButton } from "@/components/submit-button";
import { Input, Label, cn } from "@bumblebee/ui";

const initialState: FormResponse = {
  success: null,
  message: null,
};

export function MagicAuthForm() {
  const [state, formAction] = useFormState(signInWithMagicLink, initialState);

  return (
    <form action={formAction} className={cn("grid gap-6")}>
      <div className="grid gap-2">
        <Label>Email</Label>
        <Input
          name="email"
          required
          placeholder="yourname@email.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
        />
        {/* <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || 'You forgot to set Turnstile Site Key'} /> */}
        <SubmitButton>Get Login Link</SubmitButton>
        {state?.message
          ? state.success
            ? toast.success(state.message)
            : toast.error(state.message)
          : null}
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </div>
    </form>
  );
}
