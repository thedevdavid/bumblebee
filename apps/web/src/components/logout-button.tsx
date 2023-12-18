"use client";

import { signOut } from "@/actions/auth";
import { Button } from "@bumblebee/ui";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <Button
      formAction={signOut}
      className="rounded-lg p-1.5 text-stone-700 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
    >
      <LogOut width={18} />
    </Button>
  );
}
