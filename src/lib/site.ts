// All copy on the site lives here.

const WHATSAPP_URL = "https://wa.me/256703103834";

export type ProjectTone = "blue" | "ink" | "yellow" | "mint";

export type Project = {
  title: string;
  categories: [string, string];
  description: string;
  /** Public link. Leave out for internal or private projects. */
  href?: string;
  tone: ProjectTone;
  visual: "browser" | "dashboard" | "phones" | "exam";
  /** Screenshot in /public. When set, it replaces the abstract visual. */
  image?: string;
  /** Two mobile screenshots in /public, shown inside the phone mockups. */
  screens?: [string, string];
};

export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  current?: boolean;
  summary?: string;
};

export type Credential = {
  title: string;
  institution: string;
  period: string;
  status?: string;
};

export type ClientSite = {
  name: string;
  kind: string;
  href: string;
};

export const site = {
  name: "Cedric Ahumuza",
  shortName: "Cedric",
  initials: "CA",
  role: "Full Stack Developer",
  location: "Kampala",
  timeZone: "Africa/Kampala",
  timeZoneLabel: "EAT",
  copyrightYear: 2026,
  available: true,
  email: "ahumuzacedric@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1K5JZkpHVrgJqiZ3X60nDuHBI1YvbOecD/view?usp=sharing",

  hero: {
    notes: ["Currently at Fundi Robotics", "Previously at Picasso Design Agency"],
    headline: [
      "I build",
      "production-grade web platforms, internal tools, and automation systems",
    ],
  },

  about: {
    photo: {
      src: "/cedric.jpg",
      alt: "Portrait of Cedric Ahumuza smiling, wearing a grey polo shirt",
      caption: "that's me!",
    },
    statement:
      "I'm Cedric, a full stack developer in Kampala. I design, build, and operate software end to end, from data models and APIs to the interfaces people use.",
    notes: [
      "Stack: React, Next.js, and TypeScript on the front end. Python, Django, and PostgreSQL on the back end, with Redis for caching and Sentry for error tracking.",
      "Delivery: Docker-based deployments on Azure, GCP, Vercel, and Render, with Firebase or Supabase where a managed backend is the better fit.",
    ],
    skills: ["Frontend Engineering", "Backend & APIs", "Cloud & DevOps", "UI/UX Design"],
  },

  experience: [
    {
      company: "Fundi Robotics Limited",
      title: "Software Engineer",
      period: "Feb 2024 – Present",
      location: "Kampala, Uganda",
      current: true,
      summary:
        "Own the software lifecycle for the organisation's systems: architecture, full-stack implementation, code review, deployment, and monitoring. Shipped the Future Fundi learning platform, a real-time production monitor, and an IT inventory and ticketing system.",
    },
    {
      company: "Picasso Design Agency",
      title: "Graphic Designer / Software Engineer",
      period: "Apr 2024 – Jun 2026",
      location: "Kampala, Uganda",
      summary:
        "Worked across both disciplines: designed brand identities and visual assets, then engineered the web and mobile products that carried them. Built Perception Suite, a multi-client cloud platform on Next.js and Firebase.",
    },
    {
      company: "Mtunda Trading",
      title: "IT Specialist",
      period: "Mar 2022 – Apr 2024",
      location: "Kampala, Uganda",
      summary:
        "Ran the company's IT systems and supported its Uganda and global e-commerce storefronts.",
    },
    {
      company: "Freelance",
      title: "Independent Developer",
      period: "Ongoing",
      location: "Remote",
      current: true,
      summary:
        "Design and build websites and storefronts for law firms, retailers, non-profits, and agencies.",
    },
  ] satisfies Role[],

  education: [
    {
      title: "BSc Computer Science",
      institution: "Makerere University",
      period: "Aug 2022 – May 2025",
      status: "Completed",
    },
    {
      title: "Azure AI Fundamentals",
      institution: "Microsoft",
      period: "Sep 2023",
      status: "Certified",
    },
    {
      title: "Diploma in Computer Science",
      institution: "Makerere University Business School",
      period: "Aug 2019 – Feb 2022",
      status: "First Class Honours",
    },
  ] satisfies Credential[],

  work: {
    blurb: "Selected systems, designed, built, and maintained end to end.",
    allWorkUrl: "https://github.com/Ahumuza24",
    projects: [
      {
        title: "Future Fundi",
        categories: ["E-learning", "Full stack"],
        description:
          "Role-based learning platform with separate dashboards for students, instructors, and administrators. React front end on a Django API, with Redis and Sentry.",
        href: "https://www.futurefundi.org",
        tone: "blue",
        visual: "browser",
        image: "/projects/future-fundi-home.png",
      },
      {
        title: "PutMeOn",
        categories: ["Marketplace", "Full stack"],
        description:
          "Marketplace connecting clients with trusted local service providers, with booking, built-in chat, and secure payments in one place. React Router front end on a Django API.",
        href: "https://www.putmeonug.app",
        tone: "ink",
        visual: "browser",
        image: "/projects/putmeon-home.png",
      },
      {
        title: "AI Exam Generator",
        categories: ["AI", "Education"],
        description:
          "Generates exam questions for educational institutions using custom ML models served through a Django back end.",
        tone: "yellow",
        visual: "exam",
      },
      {
        title: "MaidMatch",
        categories: ["Mobile", "Web"],
        description:
          "Connects homeowners with domestic workers. React Native mobile app and React web client on a Django and PostgreSQL back end.",
        href: "https://maidmatch.netlify.app",
        tone: "mint",
        visual: "phones",
        screens: ["/projects/maidmatch-maid.jpg", "/projects/maidmatch-household.jpg"],
      },
    ] satisfies Project[],
  },

  clients: {
    blurb:
      "Production websites and storefronts shipped for clients in law, retail, construction, and the non-profit sector.",
    sites: [
      { name: "Mtunda Uganda", kind: "E-commerce", href: "https://www.mtunda.ug" },
      { name: "Mtunda Global", kind: "E-commerce", href: "https://www.mtunda.com" },
      { name: "Ortus Advocates", kind: "Law firm", href: "https://www.ortusadvocates.com" },
      { name: "E&E Advocates", kind: "Law firm", href: "https://www.e-eadvocates.com" },
      { name: "KAA Uganda", kind: "Law firm", href: "https://www.kaa.co.ug" },
      { name: "BlueBell Advocates", kind: "Law firm", href: "https://www.bluebell.legal" },
      { name: "WGE", kind: "Construction", href: "https://www.wge.co.ug" },
      { name: "Apex Technologies", kind: "Technology", href: "https://apextechnologies.netlify.app" },
      { name: "Chrona Forge", kind: "Digital agency", href: "https://www.chrona-forge.com" },
      { name: "Vase of Transformation", kind: "Non-profit", href: "https://www.vaseoftransformation.org" },
      { name: "Future Fundi", kind: "E-learning", href: "https://www.futurefundi.org" },
    ] satisfies ClientSite[],
  },

  contact: {
    whatsappUrl: WHATSAPP_URL,
    blurb:
      "Open to full-time roles, contract work, and technical collaborations. WhatsApp is the quickest way to reach me.",
    comment: "Available for full stack builds, internal tooling, and client web platforms.",
  },

  socials: [
    { label: "GitHub", short: "GH", href: "https://github.com/Ahumuza24" },
    { label: "WhatsApp", short: "WA", href: WHATSAPP_URL },
  ],
};
