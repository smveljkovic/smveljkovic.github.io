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
            "Publications, reviews, and academic writing by Stevan Veljkovic, with citation details, DOI and publisher links, and local HTML reproductions where available.",
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
        description: "A short guide to pronouncing the name Stevan Veljkovic in English, with practical phonetic guidance, IPA transcription, and notes on common mispronunciations.",
        path: "/pronunciation/",
        ogType: "website",
    },

    research: {
        title: "Research",
        description: "Research by Stevan Veljkovic: Oxford DPhil thesis, review essays, seminars, and work on religion, secularity, liberalism, high theory, and ecological thought.",
        path: "/research/",
        ogType: "website",
    },

    thesis: {
        title: "Religious atavism and the climate crisis",
        description:
            "Stevan Veljkovic’s Oxford DPhil thesis argues that the idea of climate crisis takes shape within the postsecular anxieties of Western civilizational malaise.",
        path: "/research/doctoral-thesis/religious-atavism-climate-crisis/",
        ogType: "article",
    },
} as const;
