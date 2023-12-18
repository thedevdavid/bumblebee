import { generateGradient } from "@/lib/utils";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const publication = url.searchParams.get("publication");
  const text = url.searchParams.get("text");
  const size = Number(url.searchParams.get("size") || "120");
  const [publicationName, type] = publication?.split(".") || [];
  const fileType = type?.includes("png") ? "png" : "svg";

  const gradient = generateGradient(publicationName || Math.random() + "");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 40,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={gradient.fromColor} />
                <stop offset="100%" stopColor={gradient.toColor} />
              </linearGradient>
            </defs>
            <rect
              fill="url(#gradient)"
              x="0"
              y="0"
              width={size}
              height={size}
            />
            {fileType === "svg" && text && (
              <text
                x="50%"
                y="50%"
                alignmentBaseline="central"
                dominantBaseline="central"
                textAnchor="middle"
                fill="#fff"
                fontFamily="sans-serif"
                fontSize={(size * 0.9) / text.length}
              >
                {text}
              </text>
            )}
          </g>
        </svg>
      </div>
    ),
    {
      width: size,
      height: size,
    },
  );
}
