"use client";

import { addNewPublication } from "@/actions/publication";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bumblebee/ui";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { FormResponse } from "../types";
import { SubmitButton } from "./submit-button";

const initialState: FormResponse = {
  success: null,
  message: null,
};

export default function CreatePublicationButton({
  beehiiv_api_key,
}: {
  beehiiv_api_key: string;
}) {
  const [state, formAction] = useFormState(addNewPublication, initialState);
  const [data, setData] = useState({
    publication: "",
    subdomain: "",
    description: "",
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      subdomain: prev.publication
        .toLowerCase()
        .trim()
        .replace(/[\W_]+/g, "-"),
    }));
  }, [data.publication]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-lg border border-black bg-black px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800">
          Add Publication
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          action={
            async (data: FormData) => null
            // createSite(data).then((res: any) => {
            //   if (res.error) {
            //     toast.error(res.error);
            //   } else {
            //     va.track("Created Site");
            //     const { id } = res;
            //     router.refresh();
            //     router.push(`/site/${id}`);
            //     modal?.hide();
            //     toast.success(`Successfully created site!`);
            //   }
            // })
          }
          className="w-full rounded-md bg-white dark:bg-black md:max-w-md md:border md:border-stone-200 md:shadow dark:md:border-stone-700"
        >
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Choose from your Beehiiv publications
                </Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Your Awesome Newsletter" />
                  </SelectTrigger>
                  <SelectContent>
                    {options?.map((option) => (
                      <SelectItem value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subdomain" className="text-right">
                  Subdomain
                </Label>
                <div className="flex w-full max-w-md">
                  <Input
                    name="subdomain"
                    id="subdomain"
                    type="text"
                    placeholder="subdomain"
                    value={data.subdomain}
                    onChange={(e) =>
                      setData({ ...data, subdomain: e.target.value })
                    }
                    autoCapitalize="off"
                    pattern="[a-zA-Z0-9\-]+" // only allow lowercase letters, numbers, and dashes
                    maxLength={32}
                    required
                    defaultValue="@peduarte"
                    className="col-span-3"
                  />
                  <div className="flex items-center rounded-r-lg border border-l-0 border-stone-200 bg-stone-100 px-3 text-sm dark:border-stone-600 dark:bg-stone-800 dark:text-stone-400">
                    .{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <SubmitButton>Add Publication</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
