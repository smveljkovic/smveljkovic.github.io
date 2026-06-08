export interface NavItem {
    label: string;
    href: string;
    match?: string[];
}

export const primaryNav: NavItem[] = [
    {
        label: "CV",
        href: "/cv/",
        match: ["/cv/"],
    },
    {
        label: "Publications",
        href: "/publications/",
        match: ["/publications/"],
    },
    /* awaiting implementation
        {
            label: "Research",
            href: "/research/",
            match: ["/research/"],
        },*/
];

export const footerLinks: NavItem[] = [
    {
        label: "Contact",
        href: "mailto:stevan@stevanveljkovic.com",
    },
    {
        label: "ORCID",
        href: "https://orcid.org/0000-0002-2599-3227",
    },
    {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?user=e42TN4UAAAAJ",
    },
    {
        label: "GitHub",
        href: "https://github.com/smveljkovic",
    },
    {
        label: "Pronunciation",
        href: "/pronunciation/",
    },
    {
        label: "Seminars",
        href: "https://seminars.stevanveljkovic.com/",
    },
];