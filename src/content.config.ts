import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const hrefSchema = z.string().refine(
  (value) =>
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://"),
  {
    message: "Expected a root-relative path or an absolute http(s) URL",
  }
);

const inlineNotePartSchema = z.union([
  z.string(),
  z.object({
    text: z.string(),
    href: hrefSchema,
  }),
]);

const reviews = defineCollection({
  loader: glob({
    base: "./src/content/reviews",
    pattern: "**/*.md",
  }),

  schema: z.object({
    draft: z.boolean().default(false),

    title: z.string(),
    shortTitle: z.string(),
    slug: z.string(),

    description: z.string(),

    dateCreated: z.string(),
    datePublished: z.string(),
    dateModified: z.string().optional(),

    canonicalPath: z.string(),

    pdf: z.string().optional(),

    reviewer: z.object({
      name: z.string(),
      orcid: z.url(),
    }),

    reviewedWork: z.object({
      type: z.literal("Book"),
      title: z.string(),
      author: z.string(),
      publisher: z.string().optional(),
      place: z.string().optional(),
      year: z.string().optional(),
      isbn: z.array(z.string()).optional(),
      doi: z.string().optional(),
      url: z.url().optional(),
      sameAs: z.array(z.url()).optional(),
      image: z.string().optional(),
    }),

    publishedReview: z
      .object({
        title: z.string(),
        journal: z.string(),
        journalUrl: z.url().optional(),
        doi: z.string(),
        url: z.url(),
        volume: z.string().optional(),
        issue: z.string().optional(),
        year: z.string().optional(),
        pages: z.string().optional(),
        pageStart: z.string().optional(),
        pageEnd: z.string().optional(),
        datePublished: z.string(),
      })
      .optional(),

    citationHtml: z.string(),

    originalSubmissionNote: z.array(inlineNotePartSchema),

    openingVersionNote: z.string(),

    searchMeta: z
      .object({
        reviewers: z.string().optional(),
        authors: z.string().optional(),
        title: z.string().optional(),
      })
      .optional(),

    bylineHtml: z.string().optional(),
  }),
});

export const collections = {
  reviews,
};