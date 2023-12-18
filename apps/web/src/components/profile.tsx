import { getCurrentUserWithProfile, getUserSession } from "@/actions/user";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./logout-button";

export default async function Profile() {
  const session = await getUserSession();
  const user = await getCurrentUserWithProfile();

  if (!session || !user) {
    null;
  }

  return (
    <div className="flex w-full items-center justify-between">
      <Link
        href="/settings"
        className="flex w-full flex-1 items-center space-x-3 rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
      >
        <Image
          src={
            session?.user.user_metadata?.avatar ??
            `https://avatar.vercel.sh/${session?.user.email}`
          }
          width={40}
          height={40}
          alt={session?.user.email ?? "User avatar"}
          className="h-6 w-6 rounded-full"
        />
        <span className="truncate text-sm font-medium">
          {session?.user.email}
        </span>
      </Link>
      <LogoutButton />
    </div>
  );
}
