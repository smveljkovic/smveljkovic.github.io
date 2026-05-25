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

const publicationListSchema = z.object({
    year: z.number(),
    sortDate: z.string().optional(),
    order: z.number().optional(),
    noteHtml: z.string().optional(),
    noteId: z.string().optional(),
})

const reviews = defineCollection({
  loader: glob({
    base: "./src/content/reviews",
    pattern: "**/*.md",
  }),

  schema: z.object({
    draft: z.boolean().default(false),

    title: z.string(),
    shortTitle: z.string(),
    seoTitle: z.string().optional(),
    version: z.string().optional(),
    slug: z.string(),

    description: z.string(),
    pageHeading: z.string().optional(),

    dateCreated: z.string(),
    datePublished: z.string(),
    dateModified: z.string().optional(),

    canonicalPath: z.string(),

    pdf: z.string().optional(),

    image: z.string().optional(),

    reviewer: z.object({
      name: z.string(),
      orcid: z.url(),
    }),

    reviewDek: z
      .object({
          workTitle: z.string(),
          creatorRole: z.enum(["author", "editor"]).default("author"),
          creatorName: z.string(),
      })
      .optional(),

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

    publishedReview: z.object({
        title: z.string(),
        doi: z.string().optional(),
        url: z.url().optional(),
        sameAs: z.array(z.url()).optional(),
        // journal: z.string(),
        // journalUrl: z.url().optional(),
        image: z.url().optional(),
        // volume: z.string().optional(),
        // issue: z.string().optional(),
        // year: z.string().optional(),
        pagination: z.string().optional(),
        pageStart: z.string().optional(),
        pageEnd: z.string().optional(),
        datePublished: z.string(),
      })
      .optional(),

    citationHtml: z.string(),

    publicationList: publicationListSchema.optional(),

    originalSubmissionNote: z.array(inlineNotePartSchema),

    openingVersionNote: z.string().optional(),

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

const publicationItems = defineCollection({
    loader: glob({
        base: "./src/content/publication-items",
        pattern: "**/*.md",
    }),

    schema: z.object({
        draft: z.boolean().default(false),

        title: z.string(),
        itemType: z
            .enum(["article", "bookReview", "thesis", "chapter", "other"])
            .default("other"),

        citationHtml: z.string(),

        publicationList: publicationListSchema,

        doi: z.string().optional(),
        url: hrefSchema.optional(),
    }),
});

export const collections = {
    reviews,
    publicationItems,
};