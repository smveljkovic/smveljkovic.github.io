import { site } from "../site";

const siteUrl = site.url;
const imageUrl = `${siteUrl}/images/headshot-1200x630.png`;

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
      url: `${siteUrl}/`,
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
      "@id": `${siteUrl}/#website`,
      "@type": "WebSite",
      url: `${siteUrl}/`,
      name: site.name,
      alternateName: [
        "Dr Stevan Veljkovic",
        "S. Veljkovic – theorist and editor",
        "Dr S. Veljkovic",
      ],
      inLanguage: site.language,
      publisher: { "@id": site.orcid },
    },
    {
      "@id": `${siteUrl}/`,
      "@type": "AboutPage",
      url: `${siteUrl}/`,
      name: "Stevan Veljkovic",
      description: "Personal website of Dr Stevan Veljkovic.",
      inLanguage: site.language,
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": site.orcid },
      about: { "@id": site.orcid },
      author: { "@id": site.orcid },
      primaryImageOfPage: { "@id": imageUrl },
      hasPart: [
        {
          "@id": `${siteUrl}/cv/`,
          "@type": "ProfilePage",
          url: `${siteUrl}/cv/`,
          name: "Curriculum Vitae | Dr Stevan Veljkovic",
        },
        {
          "@id": `${siteUrl}/publications/`,
          "@type": "CollectionPage",
          url: `${siteUrl}/publications/`,
          name: "Publications | Dr Stevan Veljkovic",
        },
        {
          "@id": "https://seminars.stevanveljkovic.com/",
          "@type": "WebSite",
          url: "https://seminars.stevanveljkovic.com/",
          name: "Seminars | Dr Stevan Veljkovic",
        },
      ],
    },
  ],
};