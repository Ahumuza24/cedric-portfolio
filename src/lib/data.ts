export const experience = [
    {
        id: 1,
        company: 'Picasso Design Agency',
        role: 'Creative Director / Software Developer',
        period: 'April 2024 – Present',
        location: 'Kampala, Uganda',
        current: true,
        bullets: [
            'Led cross-functional teams of designers and developers to deliver brand platforms and digital products.',
            'Built full-stack web solutions integrating modern UI design with scalable backend systems.',
            'Mentored designers and developers improving delivery speed and solution quality.',
            'Implemented client-facing digital systems improving engagement and digital presence.',
        ],
    },
    {
        id: 2,
        company: 'Fundi Robotics Limited',
        role: 'IT Officer',
        period: 'Feb 2024 – Present',
        location: 'Kampala, Uganda',
        current: true,
        bullets: [
            'Built and deployed internal software tools automating workflows reducing manual processing by 40%.',
            'Led development of enterprise web applications using React JS, Next JS and Django.',
            'Optimized workstation configurations improving device reliability.',
            'Managed server infrastructure and network operations.',
            'Translated technical issues into structured solutions for non-technical teams.',
            'Implemented structured troubleshooting and monitoring routines.',
        ],
    },
    {
        id: 3,
        company: 'Mtunda Trading',
        role: 'IT Specialist',
        period: 'March 2022 – April 2024',
        location: 'Kampala, Uganda',
        current: false,
        bullets: [
            'Built multi-country e-commerce platforms serving Uganda, Kenya and Rwanda.',
            'Managed SEO and web analytics tracking.',
            'Designed and implemented network infrastructure.',
            'Delivered distributed technical support.',
        ],
    },
    {
        id: 4,
        company: 'Saad Computer Store LTD',
        role: 'IT Manager',
        period: 'August 2022 – Dec 2023',
        location: 'Kampala, Uganda',
        current: false,
        bullets: [
            'Built and launched company website.',
            'Designed network and surveillance systems.',
            'Configured systems supporting organizational growth.',
        ],
    },
    {
        id: 5,
        company: 'Buhimba SS',
        role: 'IT Instructor',
        period: 'August 2015 – December 2018',
        location: 'Hoima, Uganda',
        current: false,
        bullets: [
            'Delivered IT training in programming and networking.',
            'Built and maintained computer lab infrastructure.',
        ],
    },
    {
        id: 6,
        company: 'Freelance Projects',
        role: 'Independent Developer',
        period: 'Ongoing',
        location: 'Remote',
        current: true,
        bullets: [
            'Hostel Booking App built in React Native.',
            'Company website for Apex Technologies LTD in React JS.',
            'Network infrastructure setup at Mabale SS Kagadi.',
        ],
    },
]

export const education = [
    {
        id: 1,
        institution: 'Makerere University',
        degree: 'Bachelor of Science in Computer Science',
        period: 'Aug 2022 – May 2025',
        current: true,
    },
    {
        id: 2,
        institution: 'Microsoft Student Learn',
        degree: 'Microsoft Azure AI Fundamentals',
        period: 'September 2023',
        current: false,
    },
    {
        id: 3,
        institution: 'Makerere University Business School',
        degree: 'Diploma in Computer Science (First Class Hons)',
        period: 'Aug 2019 – Feb 2022',
        current: false,
    },
]

export const projects = [
    {
        id: 1,
        title: 'Future Fundi Application',
        description: 'Full-stack e-learning platform with role-based dashboards for students, instructors, and administrators.',
        tech: ['React JS', 'Django', 'Redis', 'Sentry'],
        color: '#E4572E',
    },
    {
        id: 2,
        title: 'Fundi Production Monitor',
        description: 'Real-time internal monitoring system for tracking production department metrics and workflows.',
        tech: ['Next JS', 'Firebase', 'Redis', 'Sentry'],
        color: '#C6A75E',
    },
    {
        id: 3,
        title: 'IT Inventory & Ticketing System',
        description: 'Enterprise asset tracking and IT support platform for the Fundi IT Department.',
        tech: ['React JS', 'Vite', 'Supabase', 'Redis', 'Sentry'],
        color: '#7A8F7A',
    },
    {
        id: 4,
        title: 'Perception Suite',
        description: 'Web and Mobile Cloud Platform built for Picasso Design Agency serving multiple clients.',
        tech: ['Next JS', 'Firebase'],
        color: '#E4572E',
    },
    {
        id: 5,
        title: 'AI Exam Question Generator',
        description: 'AI-powered question generation platform leveraging custom ML models for educational institutions.',
        tech: ['Python', 'Django', 'Custom ML Models'],
        color: '#C6A75E',
    },
]

export const websites = [
    { id: 1, name: 'Mtunda Uganda', url: 'https://www.mtunda.ug', description: 'E-commerce platform' },
    { id: 2, name: 'Mtunda Global', url: 'https://www.mtunda.com', description: 'Multi-country trading platform' },
    { id: 3, name: 'Ortus Advocates', url: 'https://www.ortusadvocates.com', description: 'Legal services firm' },
    { id: 4, name: 'E&E Advocates', url: 'https://www.e-eadvocates.com', description: 'Legal firm website' },
    { id: 5, name: 'KAA Uganda', url: 'https://www.kaa.co.ug', description: 'Association website' },
    { id: 6, name: 'WGE', url: 'https://www.wge.com', description: 'Corporate platform' },
    { id: 7, name: 'Apex Technologies', url: 'https://apextechnologies.netlify.app', description: 'Tech company site' },
    { id: 8, name: 'Chrona Forge', url: 'https://www.chrona-forge.com', description: 'Digital product' },
    { id: 9, name: 'Vase of Transformation', url: 'https://www.vaseoftransformation.org', description: 'Non-profit organization' },
]

export const skills = [
    {
        category: 'Backend',
        icon: '⚙️',
        items: ['Python', 'Django', 'Flask', 'Authentication Systems', 'Database Design', 'REST APIs'],
    },
    {
        category: 'Frontend',
        icon: '🎨',
        items: ['React JS', 'Next JS', 'TypeScript', 'HTML5', 'CSS3', 'Responsive Design', 'State Management'],
    },
    {
        category: 'Cloud & DevOps',
        icon: '☁️',
        items: ['Docker', 'Render', 'Azure', 'GCP', 'Vercel', 'Netlify', 'Server Administration'],
    },
    {
        category: 'Database',
        icon: '🗄️',
        items: ['SQL', 'PostgreSQL', 'Supabase', 'Firebase', 'Redis'],
    },
    {
        category: 'AI & Systems',
        icon: '🧠',
        items: ['Machine Learning Fundamentals', 'Document Processing', 'AI Integration', 'Azure AI'],
    },
    {
        category: 'Infrastructure',
        icon: '🔧',
        items: ['Network Setup', 'System Monitoring', 'Hardware Configuration', 'IT Support'],
    },
    {
        category: 'Design & Tools',
        icon: '🛠️',
        items: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Framer', 'Shopify', 'Git', 'WordPress'],
    },
    {
        category: 'Soft Skills',
        icon: '💡',
        items: ['Communication', 'Teamwork', 'Adaptability', 'Problem Solving', 'Mentoring', 'Leadership'],
    },
]
