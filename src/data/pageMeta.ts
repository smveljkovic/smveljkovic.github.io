import {site} from "./site";

export const pageMeta = {
    home: {
        title: site.siteName,
        description: site.description,
        path: "/",
        ogType: "website",
    },

    publications: {
        title: "Publications",
        description:
            "Publications, reviews, and academic writing by Stevan Veljkovic.",
        path: "/publications/",
        ogType: "website",
    },

    cv: {
        title: "CV",
        description: "Curriculum vitae of Stevan Veljkovic.",
        path: "/cv/",
        ogType: "website",
    },

    pronunciation: {
        title: "Pronunciation",
        description: "Pronunciation of Stevan Veljkovic.",
        path: "/pronunciation/",
        ogType: "website",
    },

    research: {
        title: "Research",
        description: "Research by Stevan Veljkovic.",
        path: "/research/",
        ogType: "website",
    },
} as const;
