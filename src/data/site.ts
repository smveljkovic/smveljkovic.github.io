export const site = {
  url: "https://stevanveljkovic.com",
  siteName: "Stevan Veljkovic",
  personName: "Stevan Veljkovic",
  displayname: "Dr Stevan M. Veljkovic",
  tagline: "Theory and design",
  description:
      "Online home of Dr Stevan M. Veljkovic, Oxford-based scholar, builder, and editor. Publications, résumé, contact. Verve and sangfroid. Nor is this all.",

  // Backwards-compatible aliases for existing code.
  name: "Stevan Veljkovic",
  shortName: "SM Veljkovic",
  author: "Stevan Veljkovic",

  email: "contact@stevanveljkovic.com",
  analyticsId: "G-7VMGXMNZZ0",
  language: "en-GB",
  image: "/images/headshot-1200x630.png",
  orcid: "https://orcid.org/0000-0002-2599-3227",
  scholar: "https://scholar.google.com/citations?user=e42TN4UAAAAJ",
  github: "https://github.com/smveljkovic",
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

export function siteId(fragment: string): string {
  return `${absoluteUrl("/")}#${fragment}`;
}

export function nodeId(path: string, fragment: string): string {
  return `${absoluteUrl(path)}#${fragment}`;
}

export function formatTitle(pageTitle?: string): string {
  if (!pageTitle || pageTitle === site.siteName) {
    return site.siteName;
  }

  return `${pageTitle} | ${site.siteName}`;
}