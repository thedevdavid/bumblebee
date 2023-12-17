import { Button, LogoIcon } from "@bumblebee/ui";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10 bg-black">
      <LogoIcon className="w-32 h-32 text-primary-foreground" />
      <h1 className="font-bold text-white">
        Give your <span className="text-yellow-400">bees</span> a nicer{" "}
        <span className="text-yellow-400">hiiv</span>
      </h1>
      <p>Bumblebee</p>
      <Button asChild>
        <Link href="/app">Login</Link>
      </Button>
    </div>
  );
}
