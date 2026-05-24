export function normalizeDoi(value: string | undefined): string | undefined {
    if (!value) return undefined;

    const trimmed = value.trim();

    return trimmed
        .replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "")
        .replace(/^doi:\s*/i, "");
}

export function doiUrl(value: string | undefined): string | undefined {
    const doi = normalizeDoi(value);

    if (!doi) return undefined;

    return `https://doi.org/${doi}`;
}

export function doiIdentifier(value: string | undefined) {
    const doi = normalizeDoi(value);

    if (!doi) return undefined;

    return {
        "@type": "PropertyValue",
        propertyID: "DOI",
        value: doi,
    };
}