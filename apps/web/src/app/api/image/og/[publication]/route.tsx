import { generateGradient } from "@/lib/utils";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const publication = url.searchParams.get("publication");
  const [publicationName, type] = publication?.split(".") || [];

  const gradient = generateGradient(publicationName || Math.random() + "");

  const clashData = await fetch(
    new URL("@/styles/CalSans-SemiBold.otf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div tw="flex flex-col items-center w-full h-full bg-white">
        <div tw="flex flex-col items-center justify-center mt-8">
          <h1 tw="text-6xl font-bold text-gray-900 leading-none tracking-tight">
            Bumblebee
          </h1>
          <p tw="mt-4 text-xl text-gray-600 max-w-xl text-center">
            A nicer hive for your bees
          </p>
          <div tw="flex items-center justify-center">
            {/* <img
              tw="w-12 h-12 rounded-full mr-4"
              src="{data.authorImage}"
              alt={data.authorName}
            /> */}
            <p tw="text-xl font-medium text-gray-900">by @thedevdavid</p>
          </div>
          {/* <img
            tw="mt-4 w-5/6 rounded-2xl border border-gray-200 shadow-md"
            src={data.image}
            alt={data.title}
          /> */}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Clash",
          data: clashData,
        },
      ],
      emoji: "blobmoji",
    },
  );
}
