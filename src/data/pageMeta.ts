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

    thesis: {
        title: "Religious atavism and the climate crisis",
        description:
            "Stevan Veljkovic’s Oxford DPhil thesis, arguing that the climate crisis paradigm emerges from Western civilizational malaise, with full text and citation details.",
        path: "/research/doctoral-thesis/religious-atavism-climate-crisis/",
        ogType: "article",
    },
} as const;
