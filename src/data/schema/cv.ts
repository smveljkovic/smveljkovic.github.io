import {absoluteUrl} from "../site";

const imageUrl = absoluteUrl("/images/headshot-1200x630.jpg");
const thesisUrl = absoluteUrl("/thesis/religious-atavism-climate-crisis/");
const cvPdfUrl = absoluteUrl("/cv/veljkovic-cv.pdf");
const cvUrl = absoluteUrl("/cv/");

export const cvSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@id": "https://www.ox.ac.uk/",
            "@type": "CollegeOrUniversity",
            "name": "University of Oxford",
            "url": "https://www.ox.ac.uk/"
        },
        {
            "@id": "https://www.theology.ox.ac.uk/",
            "@type": "Organization",
            "name": "Faculty of Theology and Religion, University of Oxford",
            "url": "https://www.theology.ox.ac.uk/",
            "parentOrganization": {"@id": "https://www.ox.ac.uk/"}
        },
        {
            "@id": "https://www.stx.ox.ac.uk/",
            "@type": "CollegeOrUniversity",
            "name": "St Cross College, University of Oxford",
            "url": "https://www.stx.ox.ac.uk/",
            "parentOrganization": {"@id": "https://www.ox.ac.uk/"}
        },
        {
            "@id": "https://www.cam.ac.uk/",
            "@type": "CollegeOrUniversity",
            "name": "University of Cambridge",
            "url": "https://www.cam.ac.uk/"
        },
        {
            "@id": "https://www.peterhouse.cam.ac.uk/",
            "@type": "CollegeOrUniversity",
            "name": "Peterhouse, University of Cambridge",
            "url": "https://www.peterhouse.cam.ac.uk/",
            "parentOrganization": {"@id": "https://www.cam.ac.uk/"}
        },
        {
            "@id": "https://www.hist.cam.ac.uk/",
            "@type": "Organization",
            "name": "Faculty of History, University of Cambridge",
            "url": "https://www.hist.cam.ac.uk/",
            "parentOrganization": {"@id": "https://www.cam.ac.uk/"}
        },
        {
            "@id": "https://www.divinity.cam.ac.uk/",
            "@type": "Organization",
            "name": "Faculty of Divinity, University of Cambridge",
            "url": "https://www.divinity.cam.ac.uk/",
            "parentOrganization": {"@id": "https://www.cam.ac.uk/"}
        },
        {
            "@id": "https://www.rochester.edu/",
            "@type": "CollegeOrUniversity",
            "name": "University of Rochester",
            "url": "https://www.rochester.edu/"
        },
        {
            "@id": thesisUrl,
            "@type": "Thesis",
            "url": thesisUrl,
            "name": "Religious atavism and the climate crisis, with reference to Taylor and Rorty on liberalism",
            "datePublished": "2024-02",
            "sameAs": [
                "https://doi.org/10.5287/ora-4rjoobkvk",
                "https://ora.ox.ac.uk/objects/uuid:7aff13dc-075e-4c17-bee9-5adfc1b2fcf4"
            ],
            "identifier": {
                "@type": "PropertyValue",
                "propertyID": "DOI",
                "value": "10.5287/ora-4rjoobkvk"
            },
            "publisher": {"@id": "https://www.ox.ac.uk/"},
            "author": {"@id": "https://orcid.org/0000-0002-2599-3227"}
        },
        {
            "@id": `${cvUrl}#cambridge-mphil-program`,
            "@type": "EducationalOccupationalProgram",
            "name": "MPhil in Early Modern History",
            "provider": {"@id": "https://www.cam.ac.uk/"}
        },
        {
            "@id": `${cvUrl}#cambridge-pgdip-program`,
            "@type": "EducationalOccupationalProgram",
            "name": "PGDip in Divinity",
            "provider": {"@id": "https://www.cam.ac.uk/"}
        },
        {
            "@id": `${cvUrl}#rochester-ba-program`,
            "@type": "EducationalOccupationalProgram",
            "name": "BA in History",
            "provider": {"@id": "https://www.rochester.edu/"}
        },
        {
            "@id": "https://orcid.org/0000-0002-2599-3227",
            "@type": "Person",
            "name": "Stevan Veljkovic",
            "url": absoluteUrl("/"),
            "image": imageUrl,
            "identifier": {
                "@type": "PropertyValue",
                "propertyID": "ORCID",
                "value": "0000-0002-2599-3227",
                "url": "https://orcid.org/0000-0002-2599-3227"
            },
            "knowsAbout": [
                "Religious studies",
                "Modern history",
                "Social theory",
                "Secularism",
                "Climate change",
                "Liberalism"
            ],
            "alumniOf": [
                {"@id": "https://www.ox.ac.uk/"},
                {"@id": "https://www.cam.ac.uk/"},
                {"@id": "https://www.rochester.edu/"}
            ],
            "hasCredential": [
                {
                    "@id": `${cvUrl}#dphil`,
                    "@type": "EducationalOccupationalCredential",
                    "name": "DPhil",
                    "credentialCategory": "Doctor of Philosophy",
                    "educationalLevel": "Doctoral",
                    "recognizedBy": {"@id": "https://www.ox.ac.uk/"},
                    "about": {"@id": thesisUrl}
                },
                {
                    "@id": `${cvUrl}#mphil-cambridge-history`,
                    "@type": "EducationalOccupationalCredential",
                    "name": "MPhil in Early Modern History",
                    "credentialCategory": "MPhil",
                    "recognizedBy": {"@id": "https://www.cam.ac.uk/"},
                    "about": [
                        {"@id": "https://www.hist.cam.ac.uk/"},
                        {"@id": "https://www.peterhouse.cam.ac.uk/"}
                    ]
                },
                {
                    "@id": `${cvUrl}#pgdip-cambridge-divinity`,
                    "@type": "EducationalOccupationalCredential",
                    "name": "PGDip in Divinity",
                    "credentialCategory": "Postgraduate Diploma",
                    "recognizedBy": {"@id": "https://www.cam.ac.uk/"},
                    "about": [
                        {"@id": "https://www.divinity.cam.ac.uk/"},
                        {"@id": "https://www.peterhouse.cam.ac.uk/"}
                    ]
                },
                {
                    "@id": `${cvUrl}#ba-rochester-history`,
                    "@type": "EducationalOccupationalCredential",
                    "name": "BA in History",
                    "credentialCategory": "BA",
                    "recognizedBy": {"@id": "https://www.rochester.edu/"}
                }
            ],
            "subjectOf": [
                {"@id": thesisUrl}
            ],
            "affiliation": [
                {
                    "@id": `${cvUrl}#oxford-dphil-candidate`,
                    "@type": "Role",
                    "roleName": "DPhil candidate",
                    "startDate": "2016-10",
                    "endDate": "2024-02",
                    "description": "DPhil candidate, Faculty of Theology and Religion, University of Oxford; member of St Cross College.",
                    "affiliation": [
                        {"@id": "https://www.ox.ac.uk/"},
                        {"@id": "https://www.theology.ox.ac.uk/"},
                        {"@id": "https://www.stx.ox.ac.uk/"}
                    ]
                },
                {
                    "@id": `${cvUrl}#cambridge-mphil-role`,
                    "@type": "Role",
                    "roleName": "Graduate student",
                    "startDate": "2013",
                    "endDate": "2014",
                    "description": "MPhil in Early Modern History.",
                    "affiliation": [
                        {"@id": "https://www.cam.ac.uk/"},
                        {"@id": "https://www.hist.cam.ac.uk/"},
                        {"@id": "https://www.peterhouse.cam.ac.uk/"}
                    ]
                },
                {
                    "@id": `${cvUrl}#cambridge-pgdip-role`,
                    "@type": "Role",
                    "roleName": "Graduate student",
                    "startDate": "2014",
                    "endDate": "2015",
                    "description": "PGDip in Divinity.",
                    "affiliation": [
                        {"@id": "https://www.cam.ac.uk/"},
                        {"@id": "https://www.divinity.cam.ac.uk/"},
                        {"@id": "https://www.peterhouse.cam.ac.uk/"}
                    ]
                },
                {
                    "@id": `${cvUrl}#rochester-ba-role`,
                    "@type": "Role",
                    "roleName": "Undergraduate student",
                    "startDate": "2009",
                    "endDate": "2013",
                    "description": "BA in History.",
                    "affiliation": [
                        {"@id": "https://www.rochester.edu/"}
                    ]
                },
                {
                    "@id": `${cvUrl}#rochester-zen-center-role`,
                    "@type": "OrganizationRole",
                    "roleName": "Residential trainee",
                    "startDate": "2002-11",
                    "endDate": "2008-11",
                    "description": "Residential religious training in a semi-monastic vocation; additionally worked in a range of trades, especially carpentry.",
                    "affiliation": {
                        "@type": "Organization",
                        "name": "Rochester Zen Center",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Rochester",
                            "addressRegion": "NY",
                            "addressCountry": "US"
                        }
                    }
                }
            ]
        },
        {
            "@id": cvPdfUrl,
            "@type": "MediaObject",
            "name": "Curriculum Vitae (PDF) — Stevan Veljkovic",
            "encodingFormat": "application/pdf",
            "contentUrl": cvPdfUrl,
            "about": {"@id": "https://orcid.org/0000-0002-2599-3227"}
        },
        {
            "@id": cvUrl,
            "@type": "ProfilePage",
            "url": cvUrl,
            "name": "Curriculum Vitae — Stevan Veljkovic",
            "about": {"@id": "https://orcid.org/0000-0002-2599-3227"},
            "mainEntity": {"@id": "https://orcid.org/0000-0002-2599-3227"},
            "subjectOf": {"@id": cvPdfUrl}
        }
    ]
};