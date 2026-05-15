import { site } from "../../data/site";

export function siteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function doiUrl(doi: string) {
  return `https://doi.org/${doi}`;
}

export function reviewPageId(path: string) {
  return siteUrl(path);
}

export function websiteId() {
  return `${site.url}/#website`;
}

export function personId() {
  return "https://orcid.org/0000-0002-2599-3227";
}