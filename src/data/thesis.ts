import {doiUrl} from "../lib/doi";

const path = "/research/doctoral-thesis/religious-atavism-climate-crisis/";
const title = "Religious atavism and the climate crisis, with reference to Taylor and Rorty on liberalism";
const doi = "10.5287/ora-4rjoobkvk";
const pdfPath = `${path}veljkovic-dphil-thesis.pdf`;

export const thesis = {
    title,
    shortTitle: "Religious atavism and the climate crisis",
    path,
    doi,
    doiUrl: doiUrl(doi),
    pdfPath,

    author: {
        name: "Stevan Veljkovic",
        orcid: "https://orcid.org/0000-0002-2599-3227",
    },
    institution: {
        name: "University of Oxford",
        url: "https://www.ox.ac.uk/",
    },
    degree: "DPhil",
    dates: {
        submitted: "2023-04-21",
        viva: "2023-09-28",
        leaveToSupplicate: "2024-02-01",
        deposited: "2024-02-11",
        copyrightYear: 2023,
        citationYear: 2023,
        graduation: "2024-07",
    },

    abstract: [
        "Climate change is often seen as the basis for new grand narratives of Western modernity, but grand narratives in themselves are unstable under the conditions of postsecularity in liberal democracies. By a widely accepted form of deflationary critique through analogy to religion, nominally secular worldviews are susceptible to genealogical redescription in terms of pre-liberal, theological antecedents in Western history. This thesis finds critical resources in theorists of liberalism for reading accounts of climate crisis – that put climate at the centre of contemporary Western self-understanding – as expressions of religious atavism.",
        "Charles Taylor’s genealogical account of secular liberalism provides a framework for understanding climatological claims of transcendental significance. On a Taylorian reading, the reality of climate crisis is perceived, phenomenologically, to repudiate the principle of ‘mutual benefit’ on which the modern moral order of liberal societies depends. Through its ontic validation of liberal-democratic malaise, climate crisis becomes a quasi-transcendental source of guidance and impetus for radical ideas in politics, theory, and culture.",
        "The concept of atavism is suggested in particular by Richard Rorty’s postsecular and historicist view of philosophy as cultural politics. On Rorty’s quietist account, the world-historical magnitude of climate crisis is felt to be a cultural ‘skyhook’ – a foundational source that may be critically redescribed as a vestige of monotheistic dependency. The Rortyan view finds no need of more-than-human validation for utopian speculation, bringing into question the tendency of climate crisis to be invoked as a warrant for broadscale intellectual, social, and political radicalism.",
        "The concurrent conception of climate crisis from both impartial scientific reason and highly conditional ‘malaises of modernity’ is linked to long-standing tensions in the Enlightenment legacy of liberal democracies. Revisionary programmes from climate crisis are thus both powerful and limited: while credible and moving, they nevertheless remain open to Nietzschean critiques of cultural nihilism.",
    ],

    citation: {
        author: "Veljkovic, Stevan",
        title,
        type: "DPhil thesis",
        institution: "University of Oxford",
        year: 2023,
        doi,
    },
    supervisors: [
        {name: "Johannes Zachhuber"},
        {name: "Friederike Otto"},
    ],
    examiners: [
        {name: "Gavin Flood"},
        {name: "Douglas Hedley"},
    ],

    identifiers: [
        {
            propertyID: "DOI",
            label: "DOI",
            value: doi,
            href: doiUrl(doi),
        },
        {
            propertyID: "ARK",
            label: "ARK",
            value: "ark:/29072/ora_7aff13dc075e4c17bee95adfc1b2fcf4",
        },
        {
            propertyID: "Oxford University Research Archive pubs id",
            label: "ORA pubs ID",
            value: "1624720",
        },
        {
            propertyID: "Oxford University Research Archive local pid",
            label: "ORA local PID",
            value: "pubs:1624720",
        },
    ],
    rights: {
        licence: "CC BY 4.0",
        licenceUrl: "https://creativecommons.org/licenses/by/4.0/",
    },

    repository: {
        name: "Oxford University Research Archive",
        shortName: "ORA",
        url: "https://ora.ox.ac.uk/",
        recordUrl: "https://ora.ox.ac.uk/objects/uuid:7aff13dc-075e-4c17-bee9-5adfc1b2fcf4",
    },
    textualNotes: [],
} as const;