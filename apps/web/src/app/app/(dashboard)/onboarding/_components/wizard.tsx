"use client";

import { SubmitButton } from "@/components/submit-button";
import { Button, cn } from "@bumblebee/ui";
import { useCallback } from "react";
import { FormStep } from "./form-step";
import { Step } from "./step";

import {
  addNewPublication,
  getPublicationsByApiKey,
} from "@/actions/publication";
import { FormResponse } from "@/types/index";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";

const pubInitialState: FormResponse = {
  success: null,
  message: null,
};
const initialState: FormResponse = {
  success: null,
  message: null,
};

export function Wizard() {
  const [publicationsState, publicationsFormAction] = useFormState(
    getPublicationsByApiKey,
    pubInitialState,
  );
  const [state, formAction] = useFormState(addNewPublication, initialState);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const currentStep = parseInt(searchParams.get("step")!);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  if (publicationsState?.success) {
    router.push(pathname + "?" + createQueryString("step", "2"));
  }
  console.log("publicationsState");
  console.log(publicationsState);
  return (
    <div className="flex h-screen min-h-full flex-1 flex-col items-center justify-center p-4 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-lg">
        <div className="flex justify-between rounded p-8">
          {[1, 2, 3, 4].map((step) => (
            <Step step={step} currentStep={currentStep} />
          ))}
        </div>
        <div className="space-y-2 px-8">
          <form className="space-y-8" action={publicationsFormAction}>
            {currentStep === 1 && (
              <FormStep
                label="BeeHiiv API Key"
                name="beehiiv_api_key"
                placeholder="*******************************"
                description="Get your API V2 key here: https://app.beehiiv.com/settings/integrations/api"
              />
            )}
            <SubmitButton>Next</SubmitButton>
          </form>
          {currentStep === 2 && (
            <FormStep
              label="Choose your publication"
              type="select"
              options={publicationsState?.data?.data?.map((pub) => ({
                label: pub.name,
                value: pub.id,
              }))}
              name="beehiiv_publication"
              placeholder="Your Awesome Newsletter"
            />
          )}
          {/* <p className='text-sm font-medium text-destructive'>message</p> */}
        </div>

        <div className="px-8 pb-8">
          <div className="mt-10 flex justify-between">
            <Button
              onClick={() =>
                router.push(
                  pathname +
                    "?" +
                    createQueryString(
                      "step",
                      (currentStep < 2
                        ? currentStep
                        : currentStep - 1
                      ).toString(),
                    ),
                )
              }
              variant="secondary"
              disabled={currentStep === 1}
              className={cn(
                currentStep === 1 && "pointer-events-none opacity-50",
              )}
              // className={`${
              //   step === 1 ? "pointer-events-none opacity-50" : ""
              // } duration-350 rounded px-2 py-1 text-neutral-400 transition hover:text-neutral-700`}
            >
              Back
            </Button>
            {currentStep === 4 ? (
              <SubmitButton>Let's get buzzin'</SubmitButton>
            ) : (
              <Button
                onClick={() =>
                  router.push(
                    pathname +
                      "?" +
                      createQueryString(
                        "step",
                        (currentStep === 4
                          ? currentStep
                          : currentStep + 1
                        ).toString(),
                      ),
                  )
                }
                // className={`${
                //   step > 4 ? "pointer-events-none opacity-50" : ""
                // } bg duration-350 flex items-center justify-center rounded-full bg-blue-500 px-3.5 py-1.5 font-medium tracking-tight text-white transition hover:bg-blue-600 active:bg-blue-700`}
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
