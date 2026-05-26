import { absoluteUrl, site, siteId } from "../site";

const imageUrl = absoluteUrl("/images/headshot-1200x630.png");

export const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": imageUrl,
      "@type": "ImageObject",
      url: imageUrl,
      contentUrl: imageUrl,
      width: 1200,
      height: 630,
    },
    {
      "@id": site.orcid,
      "@type": "Person",
      name: "Stevan Veljkovic",
      additionalName: "M.",
      alternateName: "Stevan M. Veljkovic",
      url: absoluteUrl("/"),
      email: `mailto:${site.email}`,
      image: { "@id": imageUrl },
      identifier: {
        "@type": "PropertyValue",
        propertyID: "ORCID",
        value: "0000-0002-2599-3227",
        url: site.orcid,
      },
      sameAs: [site.orcid, site.scholar, site.github],
      homeLocation: {
        "@type": "Place",
        name: "Oxford, England",
      },
      knowsAbout: [
        "Religious studies",
        "Modern history",
        "Social theory",
        "Secularism",
        "Climate change",
        "Liberalism",
      ],
    },
    {
      "@id": siteId("website"),
      "@type": "WebSite",
      url: absoluteUrl("/"),
      name: site.siteName,
      alternateName: "Dr Stevan M. Veljkovic",
      inLanguage: site.language,
      publisher: { "@id": site.orcid },
    },
    {
      "@id": siteId("homepage"),
      "@type": "AboutPage",
      url: absoluteUrl("/"),
      name: "Stevan Veljkovic",
      description: "Personal website of Dr Stevan Veljkovic.",
      inLanguage: site.language,
      isPartOf: { "@id": siteId("website") },
      mainEntity: { "@id": site.orcid },
      about: { "@id": site.orcid },
      author: { "@id": site.orcid },
      primaryImageOfPage: { "@id": imageUrl },
      hasPart: [
        {
          "@id": absoluteUrl("/cv/"),
          "@type": "ProfilePage",
          url: absoluteUrl("/cv/"),
          name: "CV",
        },
        {
          "@id": absoluteUrl("/publications/"),
          "@type": "CollectionPage",
          url: absoluteUrl("/publications/"),
          name: "Publications",
        },
        {
          "@id": "https://seminars.stevanveljkovic.com/",
          "@type": "WebSite",
          url: "https://seminars.stevanveljkovic.com/",
          name: "Seminars",
        },
      ],
    },
  ],
};