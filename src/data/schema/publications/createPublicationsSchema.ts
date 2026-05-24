import { site } from "../../site";

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
}

function absoluteUrl(pathOrUrl: string) {
    return new URL(pathOrUrl, site.url).toString();
}

function doiUrl(doi: string | undefined) {
    if (!doi) return undefined;
    return doi.startsWith("http") ? doi : `https://doi.org/${doi}`;
}

function cleanDoi(doi: string | undefined) {
    if (!doi) return undefined;
    return doi.replace(/^https?:\/\/(?:dx\.)?doi\.org\//, "");
}

function doiIdentifier(doi: string | undefined) {
    const value = cleanDoi(doi);

    if (!value) return undefined;

    return {
        "@type": "PropertyValue",
        propertyID: "DOI",
        value,
    };
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
        (item.url ? absoluteUrl(item.url) : undefined) ??
        doiUrl(item.doi) ??
        (item.localPath ? absoluteUrl(item.localPath) : undefined)
    );
}

export function createPublicationsSchema(items: PublicationSchemaItem[]) {
    const pageUrl = absoluteUrl("/publications/");
    const websiteId = absoluteUrl("/#website");
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
            datePublished: dateValue(item.datePublished ?? item.sortDate),
            inLanguage: site.language,
            identifier: doiIdentifier(item.doi),
        });
    });

    const graph = [
        {
            "@id": websiteId,
            "@type": "WebSite",
            url: absoluteUrl("/"),
            name: site.name,
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
    ];

    return {
        "@context": "https://schema.org",
        "@graph": graph,
    };
}