"use client";

import { signOut } from "@/actions/auth";
import { Button } from "@bumblebee/ui";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <Button
      onClick={async () => await signOut()}
      variant="secondary"
      size="icon"
    >
      <LogOut width={18} />
    </Button>
  );
}
