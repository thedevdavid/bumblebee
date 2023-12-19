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
import { BeehivePublications, FormResponse } from "../types";
import { SubmitButton } from "./submit-button";

const initialState: FormResponse = {
  success: null,
  message: null,
};

export default function CreatePublicationButton({
  publications,
  userId,
}: {
  publications?: BeehivePublications["data"];
  userId: string;
}) {
  // const addPublicationWithId = addNewPublication.bind(null, userId);
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
        <Button>Import Publication</Button>
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
        >
          <DialogHeader>
            <DialogTitle>Import Beehiiv publication</DialogTitle>
            <DialogDescription>
              Note: This will not create a new publication on Beehiiv.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4 space-y-2">
            <div className="">
              <Label htmlFor="publication">
                Choose from your Beehiiv publications
              </Label>
              <Select
                disabled={!publications}
                value={data.publication}
                onValueChange={(value) =>
                  setData({ ...data, publication: value })
                }
              >
                <SelectTrigger className="w-full rounded">
                  <SelectValue
                    aria-label={data.publication}
                    placeholder="Awesome Newsletter"
                  >
                    {data.publication}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="w-full rounded">
                  {publications?.map((publication) => (
                    <SelectItem value={publication.id}>
                      {publication.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
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
                  disabled={!data.publication}
                  className="w-full rounded-l rounded-r-none border border-r-0"
                />
                <div className="flex items-center rounded-l-none rounded-r border border-l-0 bg-stone-100 px-3 dark:bg-stone-800">
                  .{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                You can change this to your own custom domain later in settings.
              </p>
            </div>
          </div>
          <DialogFooter>
            <SubmitButton>Add Publication</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
