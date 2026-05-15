import { site } from "../../data/site";
import { doiUrl, personId, reviewPageId, siteUrl } from "./ids";
import { personNode } from "./person";

export function buildReviewSchema(review: any) {
  const reviewedWorkId = review.reviewedWork.doi
    ? doiUrl(review.reviewedWork.doi)
    : `${reviewPageId(review.canonicalPath)}#reviewed-work`;

  const localReviewId = reviewPageId(review.canonicalPath);

  const graph: any[] = [
    personNode(),

    {
      "@id": reviewedWorkId,
      "@type": review.reviewedWork.type,
      name: review.reviewedWork.title,
      author: {
        "@type": "Person",
        name: review.reviewedWork.author,
      },
      ...(review.reviewedWork.isbn && { isbn: review.reviewedWork.isbn }),
      ...(review.reviewedWork.url && { sameAs: review.reviewedWork.url }),
      ...(review.reviewedWork.doi && {
        identifier: {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: review.reviewedWork.doi,
        },
      }),
    },
  ];

  if (review.publishedReview) {
    graph.push({
      "@id": doiUrl(review.publishedReview.doi),
      "@type": ["ScholarlyArticle", "Review"],
      url: doiUrl(review.publishedReview.doi),
      sameAs: review.publishedReview.url,
      name: review.publishedReview.title,
      headline: review.publishedReview.title,
      isPartOf: {
        "@type": "Periodical",
        name: review.publishedReview.journal,
        ...(review.publishedReview.journalUrl && {
          url: review.publishedReview.journalUrl,
        }),
      },
      author: { "@id": personId() },
      datePublished: review.publishedReview.datePublished,
      ...(review.publishedReview.pages && {
        pagination: review.publishedReview.pages,
      }),
      ...(review.publishedReview.pageStart && {
        pageStart: review.publishedReview.pageStart,
      }),
      ...(review.publishedReview.pageEnd && {
        pageEnd: review.publishedReview.pageEnd,
      }),
      itemReviewed: { "@id": reviewedWorkId },
      identifier: {
        "@type": "PropertyValue",
        propertyID: "DOI",
        value: review.publishedReview.doi,
      },
    });
  }

  graph.push({
    "@id": localReviewId,
    "@type": ["ScholarlyArticle", "Review"],
    url: siteUrl(review.canonicalPath),
    headline: review.title,
    name: review.title,
    description: review.description,
    version: "Author Manuscript",
    inLanguage: "en",
    author: { "@id": personId() },
    itemReviewed: { "@id": reviewedWorkId },
    datePublished: review.datePublished,
    dateCreated: review.dateCreated,
    ...(review.dateModified && { dateModified: review.dateModified }),
    ...(review.reviewedWork.image && { image: review.reviewedWork.image }),
    ...(review.publishedReview && {
      isBasedOn: { "@id": doiUrl(review.publishedReview.doi) },
      citation: { "@id": doiUrl(review.publishedReview.doi) },
    }),
    isPartOf: {
      "@id": `${site.url}/#website`,
    },
  });

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}