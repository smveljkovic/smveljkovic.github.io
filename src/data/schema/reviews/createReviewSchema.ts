import type {CollectionEntry} from "astro:content";
import {absoluteUrl, nodeId, site, siteId} from "../../site";
import {doiUrl, normalizeDoi} from "../../../lib/doi";

type PersonLike = | string | { name: string; alternateName?: string; url?: string; orcid?: string; sameAs?: string[]; };
type OrganizationLike = | string | { name: string; url?: string };
type ReviewLicense = NonNullable<NonNullable<ReviewData["rights"]>["license"]>;

function uniqueStrings(values: Array<string | undefined>): string[] {
    return [...new Set(values.filter(Boolean) as string[])];
}

function reviewSchemaTypes(
    publishedReview: ReviewData["publishedReview"] | undefined
): string[] {
    return (
        publishedReview?.schemaTypes ??
        (publishedReview?.type
            ? [publishedReview.type, "Review"]
            : ["ScholarlyArticle", "Review"])
    );
}

function localReviewSchemaTypes(review: ReviewData): string[] {
    return uniqueStrings(review.localSchemaTypes ?? ["ScholarlyArticle", "Review"]);
}

function externalNodeId(url: string, fragment: string): string {
    const nodeUrl = new URL(url);
    nodeUrl.hash = fragment;
    return nodeUrl.toString();
}

function blogContainerIds(review: ReviewData) {
    const publishedReview = review.publishedReview;

    return {
        blogId: publishedReview?.blog?.url
            ? externalNodeId(publishedReview.blog.url, "blog")
            : undefined,
        parentSiteId: publishedReview?.blog?.parentSite?.url
            ? externalNodeId(publishedReview.blog.parentSite.url, "website")
            : undefined,
    };
}

function publishedReviewContainerReference(review: ReviewData) {
    const {blogId} = blogContainerIds(review);

    if (blogId) return {"@id": blogId};

    return mostSpecificPublicationContainerReference(review);
}

function createBlogContainerNodes(review: ReviewData) {
    const publishedReview = review.publishedReview;
    const blog = publishedReview?.blog;

    if (!blog) return [];

    const {blogId, parentSiteId} = blogContainerIds(review);

    const blogNode =
        blogId &&
        compactObject({
            "@id": blogId,
            "@type": "Blog",
            name: blog.name,
            url: blog.url,
            isPartOf: parentSiteId ? {"@id": parentSiteId} : undefined,
            publisher: schemaOrganization(publishedReview.publisher),
        });

    const parentSiteNode =
        blog.parentSite &&
        parentSiteId &&
        compactObject({
            "@id": parentSiteId,
            "@type": "WebSite",
            name: blog.parentSite.name,
            url: blog.parentSite.url,
            publisher: schemaOrganization(publishedReview.publisher),
        });

    return compactArray([blogNode, parentSiteNode]);
}

function reviewedWorkIdentifier(review: ReviewData) {
    const normalizedDoi = normalizeDoi(review.reviewedWork.doi);
    if (!normalizedDoi) return undefined;

    return {
        "@type": "PropertyValue",
        propertyID: "DOI",
        value: normalizedDoi,
        url: doiUrl(review.reviewedWork.doi),
    };
}

function schemaPerson(value: PersonLike | undefined) {
    if (!value) return undefined;

    if (typeof value === "string") {
        return {
            "@type": "Person",
            name: value,
        };
    }
    return compactObject({
        "@type": "Person",
        name: value.name,
        alternateName: value.alternateName,
        url: value.url ?? value.orcid,
        sameAs: value.sameAs,
        identifier: value.orcid
            ? {
                "@type": "PropertyValue",
                propertyID: "ORCID",
                value: value.orcid.replace("https://orcid.org/", ""),
                url: value.orcid,
            }
            : undefined,
    });
}

function schemaPeople(input?: PersonLike | PersonLike[]) {
    if (!input) return undefined;

    const people = Array.isArray(input) ? input : [input];
    const nodes = people.map(schemaPerson).filter(Boolean);

    if (nodes.length === 0) return undefined;
    if (nodes.length === 1) return nodes[0];

    return nodes;
}

function schemaOrganization(value: OrganizationLike | undefined) {
    if (!value) return undefined;

    if (typeof value === "string") {
        return {
            "@type": "Organization",
            name: value,
        };
    }

    return compactObject({
        "@type": "Organization",
        name: value.name,
        url: value.url,
    });
}

function schemaCopyrightHolder(
    holder:
        | {
        type?: "Organization" | "Person";
        id?: string,
        name: string;
        url?: string;
        orcid?: string;
    }
        | undefined
) {
    if (!holder) return undefined;

    const id = holder.id ?? holder.orcid;

    if (id) {
        return {"@id": id};
    }

    return compactObject({
        "@type": holder.type ?? "Organization",
        name: holder.name,
        url: holder.url ?? holder.orcid,
        identifier: holder.orcid
            ? {
                "@type": "PropertyValue",
                propertyID: "ORCID",
                value: holder.orcid.replace("https://orcid.org/", ""),
                url: holder.orcid,
            }
            : undefined,
    });
}

type ReviewData = CollectionEntry<"reviews">["data"];


function getReviewPageName(review: ReviewData): string {
    return (
        review.schemaName ??
        review.pageHeading ??
        review.seoTitle ??
        `Review of ${review.reviewedWork.title}`
    );
}

function getReviewPageHeadline(review: ReviewData): string {
    return review.schemaHeadline ?? getReviewPageName(review);
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

function schemaLicense(license: ReviewLicense | undefined) {
    if (!license) return undefined;

    return compactObject({
        "@type": "CreativeWork",
        name: license.fullName ?? license.name,
        alternateName: license.fullName ? license.name : undefined,
        url: license.url,
    });
}

function absoluteUrlIfLocal(url: string): string {
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    return absoluteUrl(url);
}

function compactArray<T>(array: Array<T | undefined | null | false>): T[] {
    return array.filter(Boolean) as T[];
}

function periodicalIssns(
    periodical: NonNullable<NonNullable<ReviewData["publishedReview"]>["periodical"]>
): string[] | undefined {
    const values = uniqueStrings([
        periodical.printIssn,
        periodical.electronicIssn,
        ...(periodical.issn ?? []),
    ]);

    return values.length > 0 ? values : undefined;
}

function publicationContainerIds(review: ReviewData) {
    return {
        periodicalId: nodeId(review.canonicalPath, "periodical"),
        volumeId: nodeId(review.canonicalPath, "volume"),
        issueId: nodeId(review.canonicalPath, "issue"),
    };
}

function mostSpecificPublicationContainerReference(review: ReviewData) {
    const publishedReview = review.publishedReview;
    if (!publishedReview?.periodical) return undefined;

    const {periodicalId, volumeId, issueId} = publicationContainerIds(review);

    if (publishedReview.issue) return {"@id": issueId};
    if (publishedReview.volume) return {"@id": volumeId};

    return {"@id": periodicalId};
}

function createPublicationContainerNodes(review: ReviewData) {
    const publishedReview = review.publishedReview;
    if (!publishedReview?.periodical) return [];

    const {periodicalId, volumeId, issueId} = publicationContainerIds(review);
    const periodical = publishedReview.periodical;

    const periodicalNode = compactObject({
        "@id": periodicalId,
        "@type": "Periodical",
        name: periodical.name,
        url: periodical.url,
        issn: periodicalIssns(periodical),
        image: periodical.image,
        publisher: schemaOrganization(periodical.publisher),
    });

    const volumeNode =
        publishedReview.volume &&
        compactObject({
            "@id": volumeId,
            "@type": "PublicationVolume",
            volumeNumber: publishedReview.volume.number,
            url: publishedReview.volume.url,
            isPartOf: {"@id": periodicalId},
        });

    const issueNode =
        publishedReview.issue &&
        compactObject({
            "@id": issueId,
            "@type": "PublicationIssue",
            name: publishedReview.issue.name,
            issueNumber: publishedReview.issue.number,
            url: publishedReview.issue.url,
            datePublished: dateValue(publishedReview.issue.datePublished),
            image: publishedReview.issue.image
                ? absoluteUrlIfLocal(publishedReview.issue.image)
                : undefined,
            editor: schemaPeople(publishedReview.issue?.editor),
            isPartOf: publishedReview.volume
                ? {"@id": volumeId}
                : {"@id": periodicalId},
        });

    return compactArray([periodicalNode, volumeNode, issueNode]);
}

function publishedReviewIdentifiers(review: ReviewData) {
    const publishedReview = review.publishedReview;
    if (!publishedReview) return undefined;

    const normalizedDoi = normalizeDoi(publishedReview.doi);
    const normalizedDoiUrl = doiUrl(publishedReview.doi);

    const identifiers = compactArray([
        normalizedDoi
            ? {
                "@type": "PropertyValue",
                propertyID: "DOI",
                value: normalizedDoi,
                url: normalizedDoiUrl,
            }
            : undefined,
        publishedReview.articleId
            ? {
                "@type": "PropertyValue",
                propertyID: "Article ID",
                value: publishedReview.articleId,
            }
            : undefined,
    ]);

    if (identifiers.length === 1) return identifiers[0];
    if (identifiers.length > 1) return identifiers;

    return undefined;
}

export function createReviewSchema(review: ReviewData) {
    const reviewPageUrl = absoluteUrl(review.canonicalPath);
    const reviewWebPageId = nodeId(review.canonicalPath, "webpage");
    const localReviewId = nodeId(review.canonicalPath, "review");
    const websiteId = siteId("website");

    const localReviewName = getReviewPageName(review);
    const localReviewHeadline = getReviewPageHeadline(review);

    const reviewedWorkId =
        doiUrl(review.reviewedWork.doi) ??
        review.reviewedWork.url ??
        firstString(review.reviewedWork.sameAs) ??
        nodeId(review.canonicalPath, "reviewed-work");

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
            sameAs: [site.orcid, site.scholar, site.github],
            identifier: {
                "@type": "PropertyValue",
                propertyID: "ORCID",
                value: "0000-0002-2599-3227",
                url: site.orcid,
            },
        }),

        compactObject({
            "@id": websiteId,
            "@type": "WebSite",
            url: absoluteUrl("/"),
            name: site.siteName,
            inLanguage: site.language,
            publisher: {"@id": site.orcid},
        }),

        compactObject({
            "@id": reviewWebPageId,
            "@type": "WebPage",
            url: reviewPageUrl,
            name: localReviewName,
            description: review.description,
            inLanguage: site.language,
            isPartOf: {"@id": websiteId},
            author: {"@id": site.orcid},
            publisher: {"@id": site.orcid},
            about: {"@id": reviewedWorkId},
            mainEntity: {"@id": localReviewId},
        }),

        compactObject({
            "@id": reviewedWorkId,
            "@type": review.reviewedWork.type ?? "Book",
            name: review.reviewedWork.title,
            author: schemaPeople(review.reviewedWork.author),
            editor: schemaPeople(review.reviewedWork.editor),
            contributor: schemaPeople(review.reviewedWork.contributor),
            publisher: schemaOrganization(review.reviewedWork.publisher),
            isbn: review.reviewedWork.isbn,
            url:
                doiUrl(review.reviewedWork.doi) ??
                review.reviewedWork.url ??
                firstString(review.reviewedWork.sameAs),
            sameAs: review.reviewedWork.sameAs,
            image: review.reviewedWork.image
                ? absoluteUrlIfLocal(review.reviewedWork.image)
                : undefined,
            identifier: reviewedWorkIdentifier(review),
        }),

        review.publishedReview &&
        publishedReviewId &&
        compactObject({
            "@id": publishedReviewId,
            "@type": reviewSchemaTypes(review.publishedReview),
            url: doiUrl(review.publishedReview.doi) ?? review.publishedReview.url ?? publishedReviewId,
            sameAs: review.publishedReview.sameAs,
            name: review.publishedReview.title,
            headline: review.publishedReview.title,
            image: review.publishedReview.image
                ? absoluteUrlIfLocal(review.publishedReview.image)
                : undefined,
            author: {"@id": site.orcid},
            publisher: schemaOrganization(review.publishedReview.publisher),
            license: review.rights?.license?.scope === "work"
                ? schemaLicense(review.rights.license)
                : undefined,
            copyrightYear: review.rights?.copyrightYear,
            copyrightHolder: schemaCopyrightHolder(review.rights?.copyrightHolder),
            datePublished: dateValue(
                review.publishedReview.firstPublishedOnline ??
                review.publishedReview.datePublished
            ),
            pagination: review.publishedReview.pagination,
            pageStart: review.publishedReview.pageStart,
            pageEnd: review.publishedReview.pageEnd,
            itemReviewed: {"@id": reviewedWorkId},
            isPartOf: publishedReviewContainerReference(review),
            identifier: publishedReviewIdentifiers(review),
        }),

        ...createPublicationContainerNodes(review),
        ...createBlogContainerNodes(review),

        compactObject({
            "@id": localReviewId,
            "@type": localReviewSchemaTypes(review),
            url: reviewPageUrl,
            mainEntityOfPage: {"@id": reviewWebPageId},
            headline: localReviewHeadline,
            name: localReviewName,
            description: review.description,
            version: reviewVersion,
            inLanguage: site.language,
            author: {"@id": site.orcid},
            itemReviewed: {"@id": reviewedWorkId},
            isBasedOn: publishedReviewId ? {"@id": publishedReviewId} : undefined,
            citation: publishedReviewId ? {"@id": publishedReviewId} : undefined,
            license: schemaLicense(review.rights?.license),
            copyrightYear: review.rights?.copyrightYear,
            copyrightHolder: schemaCopyrightHolder(review.rights?.copyrightHolder),
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