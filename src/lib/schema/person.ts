import { site } from "../../data/site";
import { personId, siteUrl } from "./ids";

export function personNode() {
  return {
    "@id": personId(),
    "@type": "Person",
    name: "Stevan Veljkovic",
    additionalName: "M.",
    alternateName: "Stevan M. Veljkovic",
    url: siteUrl("/"),
    email: `mailto:${site.email}`,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "ORCID",
      value: "0000-0002-2599-3227",
      url: personId(),
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
  };
}