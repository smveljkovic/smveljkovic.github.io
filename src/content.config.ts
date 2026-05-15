import { defineCollection, z } from "astro:content";

const reviews = defineCollection({
  type: "content",
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
      orcid: z.string().url(),
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
      url: z.string().url().optional(),
      image: z.string().url().optional(),
    }),

    publishedReview: z
      .object({
        title: z.string(),
        journal: z.string(),
        journalUrl: z.string().url().optional(),
        doi: z.string(),
        url: z.string().url(),
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

    originalSubmissionNote: z.string().optional(),

    searchMeta: z
      .object({
        reviewers: z.string().optional(),
        authors: z.string().optional(),
        title: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  reviews,
};