// DUMMY DATA TO TEST ON THUNDERCLIENT
{
    "userId": "684738d25bcc5eb4606dd87a",
        "title": "Lead Front-end Engineer",
            "template": {
        "colorPalette": ["#0D3B66", "#FAF0CA", "#F4D35E", "#EE964B", "#F95738"]
    },
    "profileInfo": {
        "fullName": "John Smith",
            "designation": "Senior Front-End Engineer",
                "summary": "Passionate about crafting pixel-perfect UIs and optimizing performance. Over 8 years of experience building scalable React and Vue applications."
    },
    "contactInfo": {
        "email": "john.smith@example.com",
            "phone": "+1 (555) 987-6543",
                "location": "Austin, TX",
                    "linkedin": "https://linkedin.com/in/johnsmith",
                        "github": "https://github.com/johnsmith",
                            "website": "https://johnsmith.dev"
    },
    "workExperience": [
        {
            "_id": "684738f05bcc5eb4606dd87f",
            "company": "TechCorp Inc.",
            "role": "Front-end Team Lead",
            "startDate": "2019-04-01",
            "endDate": "2025-05-31",
            "description": "Led a team of 5 engineers to rebuild the customer dashboard in React + TypeScript, improving load times by 60% and increasing user retention by 25%."
        }
    ],
        "education": [
            {
                "_id": "684738f05bcc5eb4606dd880",
                "degree": "B.S. in Computer Science",
                "institution": "University of Texas at Austin",
                "startDate": "2011-08-15",
                "endDate": "2015-05-20"
            }
        ],
            "skills": [
                {
                    "_id": "684738f05bcc5eb4606dd881",
                    "name": "React",
                    "progress": 95
                },
                {
                    "name": "TypeScript",
                    "progress": 90
                },
                {
                    "name": "GraphQL",
                    "progress": 80
                }
            ],
                "projects": [
                    {
                        "_id": "684738f05bcc5eb4606dd882",
                        "title": "Real-time Chat App",
                        "description": "Built with Socket.io and React Hooks; supports 10k+ concurrent users.",
                        "github": "https://github.com/johnsmith/chat-app",
                        "liveDemo": "https://chat.johnsmith.dev"
                    }
                ],
                    "certifications": [
                        {
                            "_id": "684738f05bcc5eb4606dd883",
                            "title": "AWS Certified Solutions Architect",
                            "issuer": "Amazon Web Services",
                            "year": "2023"
                        }
                    ],
                        "languages": [
                            {
                                "_id": "684738f05bcc5eb4606dd884",
                                "name": "English",
                                "progress": 100
                            },
                            {
                                "name": "Spanish",
                                "progress": 80
                            }
                        ],
                            "interests": [
                                "Open-source Contributions",
                                "Mountain Biking",
                                "Landscape Photography"
                            ]
}



// DATA FOR CREATEREMUNE CONTROLLER
export const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        // Default template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };
