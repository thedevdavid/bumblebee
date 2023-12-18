"use client";

import { getPublication } from "@/actions/publication";
import { LogoIcon } from "@bumblebee/ui";
import {
  ArrowLeft,
  BarChart3,
  CableIcon,
  Edit3,
  Github,
  Globe,
  Layout,
  LayoutDashboard,
  Menu,
  Newspaper,
  Settings,
} from "lucide-react";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";

const externalLinks = [
  {
    name: "BeeHiiv API Settings",
    href: "https://app.beehiiv.com/settings/integrations/api",
    icon: <CableIcon width={18} />,
  },
  {
    name: "Star on GitHub",
    href: "https://github.com/thedevdavid/bumblebee",
    icon: <Github width={18} />,
  },
  // {
  //   name: "Read the guide",
  //   href: "https://vercel.com/guides/nextjs-multi-tenant-application",
  //   icon: <FileCode width={18} />,
  // },
  {
    name: "View demo site",
    href: "https://developreneur.trybumblebee.com",
    icon: <Layout width={18} />,
  },
  // {
  //   name: "Deploy your own",
  //   href: "https://vercel.com/templates/next.js/platforms-starter-kit",
  //   icon: (
  //     <svg
  //       width={18}
  //       viewBox="0 0 76 76"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //       className="py-1 text-black dark:text-white"
  //     >
  //       <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
  //     </svg>
  //   ),
  // },
];

export default function Nav({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };

  const [siteId, setSiteId] = useState<string | null>();

  useEffect(() => {
    if (segments[0] === "publication" && id) {
      getPublication(id).then((data) => {
        setSiteId(data.data?.id);
      });
    }
  }, [segments, id]);

  const tabs = useMemo(() => {
    if (segments[0] === "publication" && id) {
      return [
        {
          name: "Back to All Publications",
          href: "/publications",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Publication",
          href: `/publication/${id}`,
          isActive: segments.length === 2,
          icon: <Newspaper width={18} />,
        },
        {
          name: "Analytics",
          href: `/publications/${id}/analytics`,
          isActive: segments.includes("analytics"),
          icon: <BarChart3 width={18} />,
        },
        {
          name: "Settings",
          href: `/publications/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
      ];
    } else if (segments[0] === "publication" && id) {
      return [
        {
          name: "Back to All Publications",
          href: siteId ? `/publications/${siteId}` : "/publications",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editor",
          href: `/publication/${id}`,
          isActive: segments.length === 2,
          icon: <Edit3 width={18} />,
        },
        {
          name: "Settings",
          href: `/publication/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
      ];
    }
    return [
      {
        name: "Overview",
        href: "/",
        isActive: segments.length === 0,
        icon: <LayoutDashboard width={18} />,
      },
      {
        name: "Publications",
        href: "/publications",
        isActive: segments[0] === "sites",
        icon: <Globe width={18} />,
      },
      {
        name: "Settings",
        href: "/settings",
        isActive: segments[0] === "settings",
        icon: <Settings width={18} />,
      },
    ];
  }, [segments, id, siteId]);

  const [showSidebar, setShowSidebar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    <>
      <button
        className={`fixed z-20 ${
          // left align for Editor, right align for other pages
          segments[0] === "publication" && segments.length === 2 && !showSidebar
            ? "left-5 top-5"
            : "right-5 top-7"
        } sm:hidden`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </button>
      <div
        className={`transform ${
          showSidebar ? "w-full translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all dark:border-stone-700 dark:bg-stone-900 sm:w-60 sm:translate-x-0`}
      >
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded px-2 py-1.5">
            <a
              href="https://vercel.com/templates/next.js/platforms-starter-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded p-1.5 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              <svg
                width="26"
                viewBox="0 0 76 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black dark:text-white"
              >
                <path
                  d="M37.5274 0L75.0548 65H0L37.5274 0Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <div className="h-6 rotate-[30deg] border-l border-stone-400 dark:border-stone-500" />
            <Link
              href="/"
              className="rounded p-2 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              <LogoIcon className="h-6 w-6 dark:scale-110 dark:rounded dark:border dark:border-stone-400" />
            </Link>
          </div>
          <div className="grid gap-1">
            {tabs.map(({ name, href, isActive, icon }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center space-x-3 ${
                  isActive ? "bg-stone-200 text-black dark:bg-stone-700" : ""
                } rounded px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="grid gap-1">
            {externalLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
              >
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <p>↗</p>
              </a>
            ))}
          </div>
          <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
          {children}
        </div>
      </div>
    </>
  );
}
