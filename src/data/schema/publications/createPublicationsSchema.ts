import { absoluteUrl, site, siteId } from "../../site";
import { doiUrl, normalizeDoi } from "../../../lib/doi";

export type PublicationSchemaItemType =
    | "article"
    | "bookReview"
    | "thesis"
    | "chapter"
    | "other";

export interface PublicationSchemaItem {
    id: string;
    title: string;
    itemType: PublicationSchemaItemType;
    year: number;
    sortDate: string;
    position?: number;
    doi?: string;
    url?: string;
    localPath?: string;
    datePublished?: string;
    firstPublishedOnline?: string;
    periodical?: {
        name: string;
        issn?: string[];
        printIssn?: string;
        electronicIssn?: string;
        url?: string;
        publisher?: string;
    };
    volume?: {
        number: string;
        url?: string;
    };
    issue?: {
        number: string;
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

function compactArray<T>(array: Array<T | undefined | null | false>): T[] {
    return array.filter(Boolean) as T[];
}

function slugify(value: string) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function schemaTypeForItem(itemType: PublicationSchemaItemType) {
    switch (itemType) {
                case "article":
                    return "ScholarlyArticle";
                case "bookReview":
                    return "ScholarlyArticle";
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

    const values = compactArray([
        ...(item.periodical.issn ?? []),
        item.periodical.printIssn,
        item.periodical.electronicIssn,
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
        publisher: item.periodical.publisher
            ? {
                "@type": "Organization",
                name: item.periodical.publisher,
            }
            : undefined,
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
            issueNumber: item.issue.number,
            url: item.issue.url,
            datePublished: dateValue(item.issue.datePublished),
            image: item.issue.image,
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
            "@type": schemaTypeForItem(item.itemType),
            name: item.title,
            headline: item.title,
            url,
            sameAs:
                doiBasedId && url && url !== doiBasedId
                    ? url
                    : undefined,
            author: { "@id": site.orcid },
            datePublished: dateValue(
                item.firstPublishedOnline ??
                item.datePublished ??
                item.sortDate),
            inLanguage: site.language,
            identifier: publicationIdentifiers(item),
            isPartOf: mostSpecificPublicationContainerReference(item),
            pagination: item.pagination,
            pageStart: item.pageStart,
            pageEnd: item.pageEnd,
        });
    });

    const publicationContainerNodes = items.flatMap((item) =>
        createPublicationContainerNodes(item)
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
            name: "Publications | Dr Stevan Veljkovic",
            description: "Publications of Dr Stevan Veljkovic.",
            inLanguage: site.language,
            isPartOf: { "@id": websiteId },
            author: { "@id": site.orcid },
            about: { "@id": site.orcid },
            mainEntity: { "@id": itemListId },
        },
        {
            "@id": itemListId,
            "@type": "ItemList",
            name: "Publications of Dr Stevan Veljkovic",
            numberOfItems: items.length,
            itemListOrder: "https://schema.org/ItemListOrderDescending",
            itemListElement: itemListElements,
        },
        ...publicationNodes,
        ...publicationContainerNodes,
    ];

    return {
        "@context": "https://schema.org",
        "@graph": graph,
    };
}