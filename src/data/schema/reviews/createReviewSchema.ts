import type { CollectionEntry } from "astro:content";
import { site } from "../../site";
import { doiIdentifier, doiUrl } from "../../../lib/doi";

type ReviewData = CollectionEntry<"reviews">["data"];

export function absoluteUrl(path: string) {
    return new URL(path, site.url).toString();
}

function firstString(value: unknown): string | undefined {
    if (typeof value === "string") return value;
    if (Array.isArray(value)) {
        return value.find((item): item is string => typeof item === "string");
    }
    return undefined;
}

function dateValue(date: string | Date | undefined) {
    if (!date) return undefined;
    return date instanceof Date ? date.toISOString() : date;
}

function compactObject(object: Record<string, unknown>) {
    return Object.fromEntries(
        Object.entries(object).filter(([, value]) => {
            if (value === undefined || value === null) return false;
            if (Array.isArray(value) && value.length === 0) return false;
            return true;
        })
    );
}

export function createReviewSchema(review: ReviewData) {
    const pageUrl = absoluteUrl(review.canonicalPath);

    const reviewedWorkId =
        doiUrl(review.reviewedWork.doi) ??
        review.reviewedWork.url ??
        firstString(review.reviewedWork.sameAs) ??
        `${pageUrl}#reviewed-work`;

    const publishedReviewId =
        doiUrl(review.publishedReview?.doi) ??
        review.publishedReview?.url;

    const reviewVersion = (review as { version?: string }).version;

    const graph = [
        compactObject({
            "@id": site.orcid,
            "@type": "Person",
            name: site.author,
            url: absoluteUrl("/"),
            identifier: {
                "@type": "PropertyValue",
                propertyID: "ORCID",
                value: "0000-0002-2599-3227",
                url: site.orcid,
            },
        }),

        compactObject({
            "@id": reviewedWorkId,
            "@type": review.reviewedWork.type ?? "Book",
            name: review.reviewedWork.title,
            author: {
                "@type": "Person",
                name: review.reviewedWork.author,
            },
            isbn: review.reviewedWork.isbn,
            url:
                doiUrl(review.reviewedWork.doi) ??
                review.reviewedWork.url ??
                firstString(review.reviewedWork.sameAs),
            sameAs: review.reviewedWork.sameAs,
            image: review.reviewedWork.image,
            identifier: doiIdentifier(review.reviewedWork.doi),
        }),

        review.publishedReview &&
        publishedReviewId &&
        compactObject({
            "@id": publishedReviewId,
            "@type": ["ScholarlyArticle", "Review"],
            url: doiUrl(review.publishedReview.doi) ?? review.publishedReview.url ?? publishedReviewId,
            sameAs: review.publishedReview.sameAs,
            name: review.publishedReview.title,
            headline: review.publishedReview.title,
            image: review.publishedReview.image,
            author: { "@id": site.orcid },
            datePublished: dateValue(review.publishedReview.datePublished),
            pagination: review.publishedReview.pagination,
            pageStart: review.publishedReview.pageStart,
            pageEnd: review.publishedReview.pageEnd,
            itemReviewed: { "@id": reviewedWorkId },
            identifier: doiIdentifier(review.publishedReview.doi),
        }),

            compactObject({
            "@id": pageUrl,
            "@type": ["ScholarlyArticle", "Review"],
            url: pageUrl,
            headline: review.title,
            name: review.title,
            description: review.description,
            version: reviewVersion,
            inLanguage: "en",
            author: { "@id": site.orcid },
            itemReviewed: { "@id": reviewedWorkId },
            isBasedOn: publishedReviewId ? { "@id": publishedReviewId } : undefined,
            citation: publishedReviewId ? { "@id": publishedReviewId } : undefined,
            datePublished: dateValue(review.datePublished),
            dateCreated: dateValue(review.dateCreated),
            dateModified: dateValue(review.dateModified),
        }),
    ].filter(Boolean);

    return {
        "@context": "https://schema.org",
        "@graph": graph,
    };
}