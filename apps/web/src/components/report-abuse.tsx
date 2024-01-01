"use client";

import { SubmitButton } from "@/components/submit-button";
import { Input, Label } from "@bumblebee/ui";
import { AlertTriangle } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function ReportAbuse() {
  const [open, setOpen] = useState(false);
  const { domain, slug } = useParams() as { domain: string; slug?: string };
  const url = slug ? `https://${domain}/${slug}` : `https://${domain}`;

  return (
    <div className="fixed bottom-5 right-5">
      <button
        className="rounded-full bg-black p-4 text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 active:shadow-sm"
        onClick={() => setOpen(!open)}
      >
        <AlertTriangle size={24} />
      </button>
      {open && (
        <form
          action={async (formData) => {
            const url = formData.get("url") as string;
            // TODO: report abuse action
            // va.track("Reported Abuse", { url });
            // artificial 1s delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setOpen(false);
            toast.success(
              "Successfully reported abuse – thank you for helping us keep the internet safe!",
            );
          }}
          className="animate-in slide-in-from-bottom-5 absolute bottom-20 right-2 flex w-96 flex-col space-y-6 rounded-lg border border-stone-200 bg-white p-8 shadow-lg"
        >
          <div>
            <h2 className="font-cal text-xl leading-7 text-stone-900">
              Report Abuse
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Found a site with abusive content? Let us know!
            </p>
          </div>

          <div>
            <Label htmlFor="domain">URL to report</Label>
            <div className="mt-2">
              <Input type="text" name="url" id="url" readOnly value={url} />
            </div>
          </div>

          <SubmitButton>Report abuse</SubmitButton>
        </form>
      )}
    </div>
  );
}
