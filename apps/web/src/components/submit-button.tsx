"use client";

import { HTMLAttributes } from "react";

import { CircleDashedIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button, cn } from "@bumblebee/ui";

export function SubmitButton({
  children,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className={cn(props.className)}
      {...props}
    >
      {pending ? (
        <CircleDashedIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        children
      )}
    </Button>
  );
}
