import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { createMiddlewareClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  let cleanResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  let { supabase, response } = createMiddlewareClient(request, cleanResponse);

  const { data } = await supabase.auth.getUser(); // refresh session token

  response = NextResponse.rewrite(new URL(`/home`, request.url));
  return response;

  const url = request.nextUrl;

  let hostname = request.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // special case for Vercel preview deployment URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${
      process.env.NEXT_PUBLIC_ROOT_DOMAIN
    }`;
  }

  const searchParams = url.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // rewrites for app pages
  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    if (!data.user && !path.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    } else if (data.user) {
      if (path.startsWith("/auth")) {
        return NextResponse.rewrite(new URL("/", request.url));
      }
    }
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, request.url),
      {
        headers: {
          "x-pathname": path,
          "x-project": path.split("/")[1],
        },
      },
    );
  }

  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, request.url),
      {
        headers: {
          "x-pathname": path,
          "x-project": path.split("/")[1],
        },
      },
    );
  }

  // todo: check supabase middleware res
  console.log("supabase response");
  console.log(response);
  console.log("next response");
  console.log(NextResponse);

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, request.url), {
    headers: {
      "x-pathname": path,
      "x-project": hostname.split(".")[0],
      "x-powered-by": "Bumblebee",
    },
  });

  // return response;
}

export const config = {
  matcher: [
    "/((?!_next|_static|_vercel|favicon.ico|sitemap.xml|robots.txt|[\\w-]+\\.\\w+).*)",
  ],
};
