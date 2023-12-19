import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { createMiddlewareClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  let cleanResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  const { supabase, response } = createMiddlewareClient(request, cleanResponse);

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

  const { data } = await supabase.auth.getSession(); // refresh session token

  // rewrites for app pages
  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    if (!data.session && !path.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    } else if (data.session) {
      if (path.startsWith("/auth")) {
        return NextResponse.rewrite(new URL("/", request.url));
      }
    }
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, request.url),
    );
  }

  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, request.url),
    );
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, request.url));

  // todo: check supabase middleware res
  // return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|_vercel|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
