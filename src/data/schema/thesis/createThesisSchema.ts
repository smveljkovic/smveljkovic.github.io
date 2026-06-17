import {absoluteUrl, nodeId, site, siteId} from "../../site";

type ThesisData = typeof import("../../thesis").thesis;

function compactObject(object: Record<string, unknown>) {
    return Object.fromEntries(
        Object.entries(object).filter(([, value]) => {
            if (value === undefined || value === null) return false;
            if (Array.isArray(value) && value.length === 0) return false;
            return true;
        })
    );
}

function citationText(thesis: ThesisData) {
    const citation = thesis.citation;

    return `${citation.author}. \u2018${citation.title}.\u2019 ${citation.type}, ${citation.institution}, ${citation.year}. ${thesis.doiUrl}.`;
}

function identifierNodes(thesis: ThesisData) {
    return thesis.identifiers.map((identifier) =>
        compactObject({
            "@type": "PropertyValue",
            propertyID: identifier.propertyID,
            value: identifier.value,
            url: "href" in identifier ? identifier.href : undefined,
        })
    );
}

type ThesisPageMeta = typeof import("../../pageMeta").pageMeta.thesis;

export function createThesisSchema(thesis: ThesisData, meta: ThesisPageMeta) {
    const pageUrl = absoluteUrl(meta.path);
    const webpageId = nodeId(meta.path, "webpage");
    const pdfUrl = absoluteUrl(thesis.pdfPath);

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@id": siteId("website"),
                "@type": "WebSite",
                url: absoluteUrl("/"),
                name: site.siteName,
                inLanguage: site.language,
                publisher: {"@id": site.orcid},
            },
            {
                "@id": site.orcid,
                "@type": "Person",
                name: thesis.author.name,
                url: absoluteUrl("/"),
                identifier: {
                    "@type": "PropertyValue",
                    propertyID: "ORCID",
                    value: thesis.author.orcid.replace("https://orcid.org/", ""),
                    url: thesis.author.orcid,
                },
                sameAs: [site.orcid, site.scholar, site.github],
            },
            {
                "@id": thesis.institution.url,
                "@type": "CollegeOrUniversity",
                name: thesis.institution.name,
                url: thesis.institution.url,
            },
            {
                "@id": webpageId,
                "@type": "WebPage",
                url: pageUrl,
                name: thesis.shortTitle,
                description: meta.description,
                inLanguage: site.language,
                isPartOf: {"@id": siteId("website")},
                author: {"@id": site.orcid},
                mainEntity: {"@id": thesis.doiUrl},
            },
            compactObject({
                "@id": thesis.doiUrl,
                "@type": "Thesis",
                name: thesis.title,
                headline: thesis.title,
                alternativeHeadline: thesis.shortTitle,
                abstract: thesis.abstract.join("\n\n"),
                author: {"@id": site.orcid},
                sourceOrganization: {"@id": thesis.institution.url},
                publisher: {"@id": thesis.institution.url},
                inSupportOf: thesis.degree,
                dateCreated: String(thesis.dates.citationYear),
                datePublished: thesis.dates.deposited,
                copyrightYear: thesis.dates.copyrightYear,
                inLanguage: site.language,
                isAccessibleForFree: true,
                url: thesis.doiUrl,
                sameAs: [thesis.repository.recordUrl],
                identifier: identifierNodes(thesis),
                citation: citationText(thesis),
                license: thesis.rights.licenceUrl,
                encoding: {
                    "@type": "MediaObject",
                    encodingFormat: "application/pdf",
                    contentUrl: pdfUrl,
                    isAccessibleForFree: true,
                    license: thesis.rights.licenceUrl,
                },
                mainEntityOfPage: {"@id": webpageId},
            }),
        ],
    };
}