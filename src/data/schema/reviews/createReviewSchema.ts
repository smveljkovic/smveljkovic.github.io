import type { CollectionEntry } from "astro:content";
import { site } from "../../site";

type ReviewData = CollectionEntry<"reviews">["data"];

function absoluteUrl(path: string) {
    return new URL(path, site.url).toString();
}

function dateValue(date: string | Date | undefined) {
    if (!date) return undefined;
    return date instanceof Date ? date.toISOString() : date;
}

export function createReviewSchema(review: ReviewData) {
    const pageUrl = absoluteUrl(review.canonicalPath);

    const reviewedWorkId =
        review.reviewedWork.url ??
        review.reviewedWork.sameAs ??
        `${pageUrl}#reviewed-work`;

    const graph = [
        {
            "@id": site.orcid,
            "@type": "Person",
            name: site.author,
            url: `${site.url}/`,
            identifier: {
                "@type": "PropertyValue",
                propertyID: "ORCID",
                value: "0000-0002-2599-3227",
                url: site.orcid,
            },
        },

        {
            "@id": reviewedWorkId,
            "@type": review.reviewedWork.type ?? "Book",
            name: review.reviewedWork.title,
            author: review.reviewedWork.author,
            isbn: review.reviewedWork.isbn,
            sameAs: review.reviewedWork.sameAs,
            url: review.reviewedWork.url,
        },

        {
            "@id": pageUrl,
            "@type": ["ScholarlyArticle", "Review"],
            url: pageUrl,
            headline: review.title,
            name: review.title,
            description: review.description,
            inLanguage: "en",
            author: { "@id": site.orcid },
            itemReviewed: { "@id": reviewedWorkId },
            datePublished: dateValue(review.datePublished),
            dateCreated: dateValue(review.dateCreated),
            dateModified: dateValue(review.dateModified),
        },
    ];

    return {
        "@context": "https://schema.org",
        "@graph": graph,
    };
}