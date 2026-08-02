// ─────────────────────────────────────────────────────────────
// English résumé content (Western format)
// Work Experience lists companies; each company briefly introduces its
// projects. No per-project icons. Edit the text here to change the defaults.
// ─────────────────────────────────────────────────────────────
import type { BulletNode } from "./resumeData";

export type EnContact = { label: string; href?: string };

export type EnProject = {
  groupLabel?: string; // subheading shown above this project (e.g. "Selected Concurrent Project Assignments")
  name: string;
  role?: string;
  period?: string;
  description?: string;
  bullets?: BulletNode[];
};

export type EnExperience = {
  groupLabel?: string; // subheading shown above this company (e.g. "Earlier Experience")
  company: string;
  role: string;
  period: string;
  summary?: string;
  bullets?: BulletNode[]; // direct bullets for companies without sub-projects
  projects?: EnProject[];
};

export type EnEducation = {
  school: string;
  degree: string;
  period: string;
  note?: string;
};

export type EnSkillGroup = {
  category: string;
  items: string[];
};

export type ResumeEnSections = {
  summary: string;
  capabilities: string;
  experience: string;
  education: string;
  languages: string;
  tools: string;
};

export type ResumeEnData = {
  profile: {
    name: string;
    location: string;
    title: string;
    contacts: EnContact[];
    summary: string[];
    capabilities: string[];
  };
  sections: ResumeEnSections;
  experiences: EnExperience[];
  education: EnEducation[];
  languages: string[];
  tools: EnSkillGroup[];
};

export const defaultEnSections: ResumeEnSections = {
  summary: "Professional Summary",
  capabilities: "Core Capabilities",
  experience: "Professional Experience",
  education: "Education",
  languages: "Languages",
  tools: "Tools",
};

export const resumeEnData: ResumeEnData = {
  profile: {
    name: "Seoyoung Park",
    location: "Seoul, South Korea",
    title:
      "Product Manager  |  App Ecosystem · Cross-functional Partnerships · AI & Global Growth",
    contacts: [
      { label: "soy.xplr@gmail.com", href: "mailto:soy.xplr@gmail.com" },
      { label: "Portfolio: soy-xplr.vercel.app", href: "https://soy-xplr.vercel.app" },
      { label: "LinkedIn: [LinkedIn URL]" },
    ],
    summary: [
      "Product Manager with 5+ years of experience launching and scaling mobile apps, global UGC platforms, education platforms, and AI-enabled products.",
      "Experienced in translating user, business, and stakeholder needs into product strategies, growth initiatives, and executable roadmaps. Collaborated across business, legal, operations, engineering, design, security, and global teams to align priorities and deliver complex product initiatives.",
      "Key experience includes managing a mobile app with 1.5 million monthly active users, launching and localizing a global creator platform, and building the web and platform foundation of an education service serving 400,000 registered users. More recently, led AI initiatives that transformed recurring operational challenges into reusable tools and shared team processes.",
    ],
    capabilities: [
      "App and Platform Strategy",
      "Strategic Stakeholder Management",
      "Growth and Go-to-Market Planning",
      "Cross-functional Program Management",
      "Globalization and Localization",
      "Data-informed Product Insights",
      "AI-enabled Solution Design",
      "Product Policy and Operations",
    ],
  },
  sections: { ...defaultEnSections },
  experiences: [
    {
      company: "NEXON Korea",
      role: "Product Manager",
      period: "Mar 2021 – Present",
      summary:
        "Led cross-functional product initiatives across consumer mobile apps, global platforms, education services, internal enterprise products, and AI-enabled workflows. Aligned product, business, operational, technical, and regional priorities from initial planning through launch and continuous improvement.",
      projects: [
        {
          groupLabel: "Selected Concurrent Project Assignments",
          name: "NDC Official Mobile App",
          role: "Product Lead / Product Manager",
          period: "Dec 2024 – Jun 2025",
          description: "Official mobile app for the Nexon Developers Conference.",
          bullets: [
            "Led the end-to-end launch of a new conference app, from product concept and scope definition through Google Play release and post-launch operations.",
            "Translated attendee and event-operation needs into product requirements, information architecture, and prioritized release plans.",
            "Aligned design, engineering, QA, and conference operations teams around common launch objectives and delivery timelines.",
            "Managed store submission, production deployment, patch releases, and operational handoff to ensure a stable attendee experience.",
          ],
        },
        {
          name: "Nexon Play",
          role: "Product Manager",
          period: "Dec 2022 – Mar 2023",
          description:
            "Consumer mobile app serving 1.5 million monthly active users and ranked No. 1 in the Games category on Google Play Korea in 2022.",
          bullets: [
            "Managed release planning and product improvements for a large-scale mobile app serving 1.5 million monthly active users.",
            "Consolidated requirements from business, advertising, operations, design, and engineering teams into prioritized product initiatives.",
            "Interpreted policy changes from third-party platforms, including Apple and Facebook, and coordinated the required product and operational responses.",
            "Analyzed app reviews and service metrics to identify user pain points and recommend improvements to game discovery, rewards, and engagement journeys.",
            "Managed cross-functional execution across development, QA, release, and ongoing service operations.",
          ],
        },
        {
          name: "MapleStory Worlds",
          role: "Product Manager, Web and Platform",
          period: "May 2021 – Apr 2024",
          description:
            "Global UGC platform that enables users to create, publish, and monetize games and digital content.",
          bullets: [
            "Contributed to the platform from initial concept development through closed alpha testing, open beta testing, and soft launch.",
            "Aligned business, legal, operations, and game development teams on platform requirements, service policies, and launch priorities.",
            "Translated stakeholder and user needs into roadmap initiatives across profiles, resource discovery, content recommendations, moderation, and platform operations.",
            "Used user feedback and service data to identify product opportunities and continuously improve platform usability over a two-year period.",
            "Partnered with the US team to deliver full-site English localization and establish a localization quality assurance process.",
            "Coordinated regional requirements, localization standards, and country-specific content operations to support global service expansion.",
          ],
        },
        {
          name: "HelloMaple",
          role: "Product Lead / Product Manager, Web and Platform",
          period: "Dec 2023 – Feb 2026",
          description:
            "Block-coding education platform adopted in elementary school classrooms across Korea and serving 400,000 registered users.",
          bullets: [
            "Served as the sole Product Manager for the web and platform domain, leading the official website, membership systems, platform policies, and operational tools.",
            "Aligned legal, policy, security, engineering, and operations teams to design an account model suited to teachers, students, and education-service requirements.",
            "Converted complex regulatory and operational requirements into executable product policies covering identity verification, consent, account creation, login, password management, and withdrawal.",
            "Led the planning and launch of the official website, backend systems, and administration tools required for large-scale service operations.",
            "Enabled operations teams to independently manage users, content recommendations, communications, and moderation through scalable back-office systems.",
            "Established GA and GTM measurement structures and used product data to identify post-launch improvement opportunities.",
          ],
        },
        {
          name: "AI Product and Workflow Initiatives",
          role: "Product Manager / Builder",
          period: "Feb 2026 – Jun 2026",
          bullets: [
            "Identified recurring operational challenges across localization, user research, and team documentation and converted them into AI-enabled product opportunities.",
            "Designed and developed a translation and version-management CLI that addressed missing updates, version conflicts, and inefficient cross-functional handoffs.",
            "Standardized the localization workflow as part of the team’s shared product specification and operating process.",
            "Developed an AI-assisted interview-participant screening demo using persona data to test more scalable research workflows.",
            "Built and deployed a Notion AI agent that automated weekly meeting documentation and improved team operating efficiency.",
            "Worked directly across product planning and implementation to validate practical applications of AI within existing workflows.",
          ],
        },
        {
          groupLabel: "Additional Nexon Experience",
          name: "Nexon Group Employee App",
          role: "Product Manager",
          period: "Sep 2021 – May 2023",
          description:
            "Internal mobile app supporting approximately 5,000 employees across Nexon group companies.",
          bullets: [
            "Planned and improved employee-facing services including department search, notifications, leave requests, and engagement features.",
            "Managed product operations, customer-support issues, push notifications, and in-app communications.",
            "Monitored usage and service performance through Firebase and translated findings into product improvements.",
          ],
        },
      ],
    },
    {
      groupLabel: "Earlier Experience",
      company: "Kakao Enterprise",
      role: "Conversational AI Service Planning and Operations Intern",
      period: "Feb 2020 – Aug 2020",
      bullets: [
        "Reviewed and analyzed user-utterance data for the Kakao i conversational AI service using Kibana and Excel.",
        "Created machine-learning training datasets across multiple conversational domains.",
        "Planned and launched a small-talk conversation experience based on recurring user needs and query patterns.",
      ],
    },
    {
      company: "SK Telecom",
      role: "Conversational AI Service Operations Associate",
      period: "Jul 2019 – Jan 2020",
      bullets: [
        "Built and operated knowledge content for SK Telecom’s NUGU conversational AI service.",
        "Structured and maintained knowledge data across multiple information domains.",
        "Supported AI training-data creation, chatbot testing, quality assurance, launch, and ongoing response improvement.",
      ],
    },
  ],
  education: [
    {
      school: "Ewha Womans University",
      degree: "Bachelor’s Degree in Korean Language and Literature and Business Administration",
      period: "Mar 2014 – Feb 2020",
    },
    {
      school: "Hosei University, Tokyo, Japan",
      degree: "Exchange Student, Business Administration",
      period: "Sep 2018 – Feb 2019",
    },
  ],
  languages: [
    "Korean — Native",
    "English — Professional working proficiency  |  TOEIC 930",
    "Japanese — Professional working proficiency  |  JLPT N1",
  ],
  tools: [
    {
      category: "Analytics",
      items: [
        "Google Analytics",
        "Google Tag Manager",
        "Firebase",
        "Snowflake SQL",
        "Power BI",
        "Kibana",
        "Excel",
      ],
    },
    {
      category: "Product & Collaboration",
      items: ["Jira", "Confluence", "Slack", "Figma", "Axure"],
    },
    {
      category: "AI & Development",
      items: ["Cursor", "Notion AI"],
    },
  ],
};
