{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": "https://stevanveljkovic.com/images/headshot-1200x630.png",
      "@type": "ImageObject",
      "url": "https://stevanveljkovic.com/images/headshot-1200x630.png",
      "contentUrl": "https://stevanveljkovic.com/images/headshot-1200x630.png",
      "width": 1200,
      "height": 630
    },
    {
      "@id": "https://orcid.org/0000-0002-2599-3227",
      "@type": "Person",
      "name": "Stevan Veljkovic",
      "additionalName": "M.",
	  "alternateName": "Stevan M. Veljkovic",
      "url": "https://stevanveljkovic.com/",
      "email": "mailto:hello@stevanveljkovic.com",
      "image": { "@id": "https://stevanveljkovic.com/images/headshot-1200x630.png" },
      "identifier": {
        "@type": "PropertyValue",
        "propertyID": "ORCID",
        "value": "0000-0002-2599-3227",
        "url": "https://orcid.org/0000-0002-2599-3227"
      },
      "sameAs": [
        "https://orcid.org/0000-0002-2599-3227",
        "https://scholar.google.com/citations?user=e42TN4UAAAAJ",
        "https://github.com/smveljkovic"
      ],
      "homeLocation": {
        "@type": "Place",
        "name": "Oxford, England"
      },
      "knowsAbout": [
        "Religious studies",
        "Modern history",
        "Social theory",
        "Secularism",
        "Climate change",
        "Liberalism"
      ]
    },
    {
      "@id": "https://stevanveljkovic.com/#website",
      "@type": "WebSite",
      "url": "https://stevanveljkovic.com/",
      "name": "Dr Stevan Veljkovic – theorist and editor",
	  "alternateName": ["Dr Stevan Veljkovic", "S. Veljkovic – theorist and editor", "Dr S. Veljkovic"],
      "inLanguage": "en-GB",
      "publisher": { "@id": "https://orcid.org/0000-0002-2599-3227" }
    },
    {
      "@id": "https://stevanveljkovic.com/",
      "@type": "AboutPage",
      "url": "https://stevanveljkovic.com/",
      "name": "Stevan Veljkovic",
      "description": "Personal website of Dr Stevan Veljkovic.",
      "inLanguage": "en-GB",
      "isPartOf": { "@id": "https://stevanveljkovic.com/#website" },
      "mainEntity": { "@id": "https://orcid.org/0000-0002-2599-3227" },
      "about": { "@id": "https://orcid.org/0000-0002-2599-3227" },
      "author": { "@id": "https://orcid.org/0000-0002-2599-3227" },
      "primaryImageOfPage": { "@id": "https://stevanveljkovic.com/images/headshot-1200x630.png" },
      "hasPart": [
        {
          "@id": "https://stevanveljkovic.com/cv/",
          "@type": "ProfilePage",
          "url": "https://stevanveljkovic.com/cv/",
          "name": "Curriculum Vitae | Dr Stevan Veljkovic"
        },
        {
          "@id": "https://stevanveljkovic.com/publications/",
          "@type": "CollectionPage",
          "url": "https://stevanveljkovic.com/publications/",
          "name": "Publications | Dr Stevan Veljkovic"
        },
        {
          "@id": "https://seminars.stevanveljkovic.com/",
          "@type": "WebSite",
          "url": "https://seminars.stevanveljkovic.com/",
          "name": "Seminars | Dr Stevan Veljkovic"
        }
      ]
    }
  ]
}