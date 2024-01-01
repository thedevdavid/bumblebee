import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import color from "tinycolor2";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const response = await fetch(input, { ...init, cache: "no-store" });

  return response.json();
}

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export function djb2(str: string) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
  }
  return hash;
}

export function generateGradient(publicationName: string) {
  const c1 = color({ h: djb2(publicationName) % 360, s: 0.95, l: 0.5 });
  const second = c1.triad()[1].toHexString();

  return {
    fromColor: c1.toHexString(),
    toColor: second,
  };
}

export const truncate = (str: string, num: number) => {
  if (!str) return "";
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

export const getBlurDataURL = async (url: string | null) => {
  if (!url) {
    return "data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  }
  try {
    const response = await fetch(
      `https://wsrv.nl/?url=${url}&w=50&h=50&blur=5`,
    );
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return `data:image/png;base64,${base64}`;
  } catch (error) {
    return "data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  }
};

export const placeholderBlurhash =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAoJJREFUWEfFl4lu4zAMRO3cx/9/au6reMaOdkxTTl0grQFCRoqaT+SQotq2bV9N8rRt28xms87m83l553eZ/9vr9Wpkz+ezkT0ej+6dv1X81AFw7M4FBACPVn2c1Z3zLgDeJwHgeLFYdAARYioAEAKJEG2WAjl3gCwNYymQQ9b7/V4spmIAwO6Wy2VnAMikBWlDURBELf8CuN1uHQSrPwMAHK5WqwFELQ01AIXdAa7XawfAb3p6AOwK5+v1ugAoEq4FRSFLgavfQ49jAGQpAE5wjgGCeRrGdBArwHOPcwFcLpcGU1X0IsBuN5tNgYhaiFFwHTiAwq8I+O5xfj6fOz38K+X/fYAdb7fbAgFAjIJ6Aav3AYlQ6nfnDoDz0+lUxNiLALvf7XaDNGQ6GANQBKR85V27B4D3QQRw7hGIYlQKWGM79hSweyCUe1blXhEAogfABwHAXAcqSYkxCtHLUK3XBajSc4Dj8dilAeiSAgD2+30BAEKV4GKcAuDqB4TdYwBgPQByCgApUBoE4EJUGvxUjF3Q69/zLw3g/HA45ABKgdIQu+JPIyDnisCfAxAFNFM0EFNQ64gfS0EUoQP8ighrZSjn3oziZEQpauyKbfjbZchHUL/3AS/Dd30gAkxuRACgfO+EWQW8qwI1o+wseNuKcQiESjALvwNoMI0TcRzD4lFcPYwIM+JTF5x6HOs8yI7jeB5oKhpMRFH9UwaSCDB2Jmg4rc6E2TT0biIaG0rQhNqyhpHBcayTTSXH6vcDL7/sdqRK8LkwTsU499E8vRcAojHcZ4AxABdilgrp4lsXk8oVqgwh7+6H3phqd8J0Kk4vbx/+sZqCD/vNLya/5dT9fAH8g1WdNGgwbQAAAABJRU5ErkJggg==";

export const toDateString = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/* eslint-disable */
// TODO: Fix eslint-disable
export const formatHtmlToMd = (htmlString: string): string => {
  // Replace <strong> with ** for bold text
  htmlString = htmlString.replace(/<strong>(.*?)<\/strong>/g, "**$1**");

  // Replace <em> with * for italic text
  htmlString = htmlString.replace(/<em>(.*?)<\/em>/g, "*$1*");

  // Replace <a> with [text](url) for links
  htmlString = htmlString.replace(/<a href="(.*?)">(.*?)<\/a>/g, "[$2]($1)");

  // Replace <ul> and <li> with dashes for unordered lists
  htmlString = htmlString.replace(/<ul>(.*?)<\/ul>/gs, (match, p1) => {
    const listItems = p1.trim().replace(/<li>(.*?)<\/li>/g, "- $1");
    return listItems;
  });

  // Replace <ol> and <li> with numbers for ordered lists
  htmlString = htmlString.replace(/<ol>(.*?)<\/ol>/gs, (match, p1) => {
    const listItems = p1
      .trim()
      .replace(/<li>(.*?)<\/li>/g, (_: string, item: string) => `1. ${item}`);
    return listItems;
  });

  // Replace <p> tags with two spaces and a newline character
  htmlString = htmlString.replace(/<p>(.*?)<\/p>/gs, "$1  \n");

  // Replace <code> with backticks for inline code
  htmlString = htmlString.replace(/<code>(.*?)<\/code>/g, "`$1`");

  // Replace <pre> and <code> with triple backticks for code blocks
  htmlString = htmlString.replace(
    /<pre><code>(.*?)<\/code><\/pre>/gs,
    "```\n$1\n```",
  );

  // Handle line breaks
  htmlString = htmlString.replace(/<br\s*\/?>/g, "  \n");

  return htmlString;
};
/* eslint-enable */
