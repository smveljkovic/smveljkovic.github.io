import { absoluteUrl, site, siteId } from "../../site";
import { doiUrl, normalizeDoi } from "../../../lib/doi";

export type PublicationSchemaItemType =
    | "article"
    | "bookReview"
    | "thesis"
    | "chapter"
    | "other";

type OrganizationLike =
    | string
    | {
    name: string;
    url?: string;
};

type BlogLike = {
    name: string;
    url: string;
    parentSite?: {
        name: string;
        url: string;
    };
};

export interface PublicationIdentifier {
    propertyID: string;
    value: string;
    url?: string;
}

export interface PublicationSchemaItem {
    id: string;
    title: string;
    itemType: PublicationSchemaItemType;
    schemaTypes?: string[];
    year: number;
    sortDate: string;
    position?: number;
    doi?: string;
    url?: string;
    localPath?: string;
    datePublished?: string;
    firstPublishedOnline?: string;
    publisher?: OrganizationLike;
    blog?: BlogLike;
    identifiers?: PublicationIdentifier[];
    periodical?: {
        name: string;
        issn?: string[];
        printIssn?: string;
        electronicIssn?: string;
        url?: string;
        publisher?: OrganizationLike;
        image?: string;
    };
    volume?: {
        number: string;
        url?: string;
    };
    issue?: {
        number?: string;
        name?: string;
        url?: string;
        datePublished?: string;
        dateLabel?: string;
        image?: string;
    };
    articleId?: string;
    pagination?: string;
    pageStart?: string;
    pageEnd?: string;
}

function uniqueStrings(values: Array<string | undefined>): string[] {
    return [...new Set(values.filter(Boolean) as string[])];
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

function createBlogContainerNodes(item: PublicationSchemaItem) {
    if (!item.blog?.url) return [];

    const blogId = externalNodeId(item.blog.url, "blog");
    const parentSiteId = item.blog.parentSite?.url
        ? externalNodeId(item.blog.parentSite.url, "website")
        : undefined;

    const blogNode = compactObject({
        "@id": blogId,
        "@type": "Blog",
        name: item.blog.name,
        url: item.blog.url,
        isPartOf: parentSiteId ? { "@id": parentSiteId } : undefined,
        publisher: schemaOrganization(item.publisher),
    });

    const parentSiteNode =
        item.blog.parentSite &&
        parentSiteId &&
        compactObject({
            "@id": parentSiteId,
            "@type": "WebSite",
            name: item.blog.parentSite.name,
            url: item.blog.parentSite.url,
            publisher: schemaOrganization(item.publisher),
        });

    return compactArray([blogNode, parentSiteNode]);
}

function compactArray<T>(array: Array<T | undefined | null | false>): T[] {
    return array.filter(Boolean) as T[];
}

function absoluteUrlIfLocal(url: string): string {
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    return absoluteUrl(url);
}

function externalNodeId(url: string, fragment: string): string {
    const nodeUrl = new URL(url);
    nodeUrl.hash = fragment;
    return nodeUrl.toString();
}

function publicationContainerReference(item: PublicationSchemaItem) {
    if (item.blog?.url) {
        return { "@id": externalNodeId(item.blog.url, "blog") };
    }

    return mostSpecificPublicationContainerReference(item);
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

function slugify(value: string) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function schemaTypesForItem(item: PublicationSchemaItem) {
    if (item.schemaTypes?.length) {
        return uniqueStrings(item.schemaTypes);
    }

    switch (item.itemType) {
                case "article":
                    return "ScholarlyArticle";
                case "bookReview":
                    return ["ScholarlyArticle", "Review"];
                case "thesis":
                    return "Thesis";
                case "chapter":
                    return "Chapter";
                default:
                    return "CreativeWork";
    }
}

function publicationId(item: PublicationSchemaItem) {
    return (
        doiUrl(item.doi) ??
        (item.url ? absoluteUrl(item.url) : undefined) ??
        (item.localPath ? absoluteUrl(item.localPath) : undefined) ??
        `${absoluteUrl("/publications/")}#${slugify(item.id)}`
    );
}

function publicationUrl(item: PublicationSchemaItem) {
    return (
        doiUrl(item.doi) ??
        (item.url ? absoluteUrl(item.url) : undefined) ??
        (item.localPath ? absoluteUrl(item.localPath) : undefined)
    );
}

function publicationContainerBaseId(item: PublicationSchemaItem) {
    return `${absoluteUrl("/publications/")}#${slugify(item.id)}`;
}

function publicationContainerIds(item: PublicationSchemaItem) {
    const baseId = publicationContainerBaseId(item);

    return {
        periodicalId: `${baseId}-periodical`,
        volumeId: `${baseId}-volume`,
        issueId: `${baseId}-issue`,
    };
}

function periodicalIssns(item: PublicationSchemaItem): string[] | undefined {
    if (!item.periodical) return undefined;

    const values = uniqueStrings([
        item.periodical.printIssn,
        item.periodical.electronicIssn,
        ...(item.periodical.issn ?? []),
    ]);

    return values.length > 0 ? values : undefined;
}

function mostSpecificPublicationContainerReference(item: PublicationSchemaItem) {
    if (!item.periodical) return undefined;

    const { periodicalId, volumeId, issueId } = publicationContainerIds(item);

    if (item.issue) return { "@id": issueId };
    if (item.volume) return { "@id": volumeId };

    return { "@id": periodicalId };
}

function publicationIdentifiers(item: PublicationSchemaItem) {
    const normalizedDoi = normalizeDoi(item.doi);
    const normalizedDoiUrl = doiUrl(item.doi);

    const identifiers = compactArray([
        normalizedDoi
            ? {
                "@type": "PropertyValue",
                propertyID: "DOI",
                value: normalizedDoi,
                url: normalizedDoiUrl,
            }
            : undefined,
        item.articleId
            ? {
                "@type": "PropertyValue",
                propertyID: "Article ID",
                value: item.articleId,
            }
            : undefined,
        ...(item.identifiers ?? []).map((identifier) =>
            compactObject({
                "@type": "PropertyValue",
                propertyID: identifier.propertyID,
                value: identifier.value,
                url: identifier.url,
            })
        ),
    ]);

    if (identifiers.length === 1) return identifiers[0];
    if (identifiers.length > 1) return identifiers;

    return undefined;
}

function createPublicationContainerNodes(item: PublicationSchemaItem) {
    if (!item.periodical) return [];

    const { periodicalId, volumeId, issueId } = publicationContainerIds(item);

    const periodicalNode = compactObject({
        "@id": periodicalId,
        "@type": "Periodical",
        name: item.periodical.name,
        url: item.periodical.url,
        issn: periodicalIssns(item),
        image: item.periodical.image
            ? absoluteUrlIfLocal(item.periodical.image)
            : undefined,
        publisher: schemaOrganization(item.periodical.publisher),
    });

    const volumeNode =
        item.volume &&
        compactObject({
            "@id": volumeId,
            "@type": "PublicationVolume",
            volumeNumber: item.volume.number,
            url: item.volume.url,
            isPartOf: { "@id": periodicalId },
        });

    const issueNode =
        item.issue &&
        compactObject({
            "@id": issueId,
            "@type": "PublicationIssue",
            name: item.issue.name,
            issueNumber: item.issue.number,
            url: item.issue.url,
            datePublished: dateValue(item.issue.datePublished),
            image: item.issue.image
                ? absoluteUrlIfLocal(item.issue.image)
                : undefined,
            isPartOf: item.volume
                ? { "@id": volumeId }
                : { "@id": periodicalId },
        });


    return compactArray([periodicalNode, volumeNode, issueNode]);
}

export function createPublicationsSchema(items: PublicationSchemaItem[]) {
    const pageUrl = absoluteUrl("/publications/");
    const websiteId = siteId("website");
    const itemListId = `${pageUrl}#publication-list`;

    const itemListElements = items.map((item, index) => ({
        "@type": "ListItem",
        position: item.position ?? index + 1,
        item: {
            "@id": publicationId(item),
        },
    }));

    const publicationNodes = items.map((item) => {
        const id = publicationId(item);
        const url = publicationUrl(item);
        const doiBasedId = doiUrl(item.doi);

        return compactObject({
            "@id": id,
            "@type": schemaTypesForItem(item),
            name: item.title,
            headline: item.title,
            url,
            sameAs:
                doiBasedId && url && url !== doiBasedId
                    ? url
                    : undefined,
            author: { "@id": site.orcid },
            publisher: schemaOrganization(item.publisher),
            datePublished: dateValue(
                item.firstPublishedOnline ??
                item.datePublished
            ),
            inLanguage: site.language,
            identifier: publicationIdentifiers(item),
            isPartOf: publicationContainerReference(item),
            pagination: item.pagination,
            pageStart: item.pageStart,
            pageEnd: item.pageEnd,
        });
    });

    const publicationContainerNodes = items.flatMap((item) =>
        createPublicationContainerNodes(item)
    );

    const blogContainerNodes = items.flatMap((item) =>
        createBlogContainerNodes(item)
    );

    const graph = [
        {
            "@id": websiteId,
            "@type": "WebSite",
            url: absoluteUrl("/"),
            name: site.siteName,
            inLanguage: site.language,
            publisher: { "@id": site.orcid },
        },
        {
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
            sameAs: [site.orcid, site.scholar, site.github],
        },
        {
            "@id": pageUrl,
            "@type": "CollectionPage",
            url: pageUrl,
            name: "Publications | Stevan Veljkovic",
            description: "Publications of Stevan Veljkovic.",
            inLanguage: site.language,
            isPartOf: { "@id": websiteId },
            author: { "@id": site.orcid },
            about: { "@id": site.orcid },
            mainEntity: { "@id": itemListId },
        },
        {
            "@id": itemListId,
            "@type": "ItemList",
            name: "Publications of Stevan Veljkovic",
            numberOfItems: items.length,
            itemListOrder: "https://schema.org/ItemListOrderDescending",
            itemListElement: itemListElements,
        },
        ...publicationNodes,
        ...publicationContainerNodes,
        ...blogContainerNodes,
    ];

    return {
        "@context": "https://schema.org",
        "@graph": graph,
    };
}