import crewscaleLogo from "../assets/Logos/CrewscaleLogo.png";
import intelliflowLogo from "../assets/Logos/IntelliflowLogo.jpg";
import kredxLogo from "../assets/Logos/KredXLogo.svg";
import capgeminiLogo from "../assets/Logos/CapgeminiLogo.png";

import rideRightImg from "../assets/RideRightPreview.png";
import reachUImg from "../assets/ReachU.png";
import hgEditsImg from "../assets/hgeditsPreview.png";
import websiteSrcImg from "../assets/website-source.png";
import portfolioImg from "../assets/Portfolio Image.png";
import theCruxImg from "../assets/theCruxPreview.png";
import theAssistAIImg from "../assets/AssistAIPreview.png";
import unboxdImg from "../assets/unboxedPreview.png";
import chiefOfStaffImg from "../assets/ChiefOfStaffPreview.svg";

export const personalInfo = {
  name: "Harsh Gupta",
  title: "AI & Full-Stack Engineer",
  subtitle: "Building at Duke University",
  email: "harshgupta.duke@gmail.com",
  location: "Durham, NC",
  openToWork: true,
  interests: ["Product Management", "AI Engineering", "Full-Stack Development"],
  bio: "Currently pursuing a Master of Engineering Management at Duke University - looking forward to a career in Product Management. My journey started with building AI agents and full-stack applications, where I mastered the art of automating complex tasks, and developming features. Now, I am applying that same rigor to product strategy at Duke, helping organizations bridge the gap between engineering and operational excellence.",
  bioHighlight: { text: "Duke University", start: 57, end: 72 },
  socials: {
    github: "https://github.com/TabsOverSpaces4",
    linkedin: "https://www.linkedin.com/in/harshguptaworks/",
    youtube: "https://www.youtube.com/@harshgupta5880",
    gallery: "https://wellexposedbyhg.vercel.app/",
    resume: "https://harshresume.s3.us-east-2.amazonaws.com/HarshResume.pdf",
  },
};

export const experience = [
  {
    company: "Crewscale",
    logo: crewscaleLogo,
    role: "Software Development Engineer",
    startDate: "Jul 2024",
    endDate: "Jun 2025",
    highlights: [
      "Revamped the Beanbag.ai frontend UI and automated LinkedIn workflows, improving operational efficiency by ~60%",
      "Built scalable Node.js services and AI agents using Puppeteer for LinkedIn task automation",
      "Integrated GPT-4o mini for chatbot and analytics features in client-facing products",
      "Worked with CI/CD pipelines to support reliable and seamless deployments",
    ],
  },
  {
    company: "Intelliflow.ai",
    logo: intelliflowLogo,
    role: "Software Engineer",
    startDate: "Jun 2023",
    endDate: "Apr 2024",
    highlights: [
      "Developed full-stack features using React, React Native, Node.js, MongoDB, and Docker",
      "Led development of Workflow++ and contributed to eSignature and Workflow Builder features",
      "Redesigned critical UI components, increasing user satisfaction from 82% to 95%",
      "Deployed applications on AWS and collaborated across design, testing, and backend teams",
    ],
  },
  {
    company: "KredX",
    logo: kredxLogo,
    role: "Web / Application Developer Intern",
    startDate: "Jun 2022",
    endDate: "Sep 2022",
    highlights: [
      "Built and maintained UI components, email templates, and landing pages",
      "Led development of a Buy Now Pay Later (BNPL) calculator across frontend and backend",
      "Fixed production bugs and collaborated with engineers to improve product stability",
    ],
  },
  {
    company: "Capgemini",
    logo: capgeminiLogo,
    role: "Cloud Engineer Intern",
    startDate: "Aug 2021",
    endDate: "Dec 2021",
    highlights: [
      "Deployed and managed cloud infrastructure on AWS using EC2, S3, and RDS",
      "Performed Linux server management, shell scripting, and system optimization tasks",
      "Supported cloud operations and infrastructure workflows in an enterprise environment",
    ],
  },
];

export const education = [
  {
    school: "Duke University",
    degree: "Master of Engineering Management",
    year: "Aug 2025 — May 2027 (Expected)",
    desc: "Coursework: Finance, Marketing, Product Management, Design Thinking, Decision Models, AI in Business",
  },
  {
    school: "SRM Institute of Science & Technology",
    degree: "B.Tech in Computer Science (Cloud Computing)",
    year: "2019 — 2023",
    desc: "Achieved CGPA 8.90. Specialized in Cloud Infrastructure and Distributed Systems.",
  },
];

export const projects = [
  {
    title: "Chief of Staff",
    tech: "Local LLM / n8n / Docker",
    tagline: "A Local-First Personal AI",
    desc: "A self-hosted, local-first AI Chief of Staff that turns one plain-English message into real action — creating calendar events, setting reminders, sending email, and searching the web to fill in what it can't know. A two-agent pipeline (Intake → Master) orchestrated in n8n, running entirely on my own hardware so private data never leaves the machine.",
    highlights: [
      "Two-agent design — an Intake Agent normalizes intent, a Master Agent acts with tools",
      "Local LLM on Ollama, orchestrated in n8n inside Docker — fully self-hosted",
      "Interactive workflow diagram with a simulated run — no live system exposed",
    ],
    role: "Solo Project",
    image: chiefOfStaffImg,
    link: "/projects/chief-of-staff",
    internal: true,
  },
  {
    title: "AssistAI",
    tech: "Chrome Extension / Gemini AI",
    tagline: "Cognitive AI Usage Tracker",
    desc: "A Chrome extension that watches how you think alongside AI and not what you type. It tracks behavioral signals like scroll depth, prompt edit rate, and thinking time to score your Cognitive Engagement, AI Reliance, and Prompt Quality.",
    highlights: [
      "Behavioral signal tracking — no prompts or text ever collected",
      "Gemini AI analysis generates personalized scores and improvement tips",
      "100% local storage — no accounts, no servers, no data leaving the browser",
    ],
    role: "Solo Project",
    image: theAssistAIImg,
    link: "/projects/assistai",
    internal: true,
  },
  {
    title: "Unboxd",
    tech: "Product Analysis / Editorial",
    tagline: "Weekly Product Teardown Series",
    desc: "A structured product teardown series where three rotating authors dissect competing products with deep-dive analyses, feature tables, ratings, and use-case recommendations. No sponsorships, no affiliate deals — just rigorous, opinionated product thinking.",
    highlights: [
      "Rotating author cycle — two teardowns followed by a head-to-head comparison",
      "Authored teardowns on Notion's product architecture and iOS from an Android switcher's perspective",
      "Co-created with Vamsi Krishnan Ananthakrishnan and David Yun",
    ],
    role: "Co-Creator & Author",
    image: unboxdImg,
    link: "https://teardown-blog.vercel.app/",
  },
  {
    title: "TheCrux",
    tech: "React / Node.js",
    tagline: "AI-Powered Book Search",
    desc: "Discover your next favorite book with intelligent recommendations tailored to your reading preferences and habits.",
    highlights: [
      "Personalized book recommendations based on your genres, pace, and reading habits",
      "AI-powered search that matches books to your mood, time, and complexity preferences",
      "Taste modeling from favorites (books, movies, shows) to surface surprisingly relevant picks",
    ],
    role: "Full-Stack Developer",
    image: theCruxImg,
    link: "https://crux-rouge-kappa.vercel.app/",
  },
  {
    title: "RideRight",
    tech: "React Native / AWS",
    tagline: "Smart Ride Scheduling Platform",
    desc: "A comprehensive ride-sharing application that revolutionizes how users plan and execute their daily commutes. Built with a focus on efficiency and user experience, RideRight combines real-time navigation with intelligent scheduling algorithms.",
    highlights: [
      "Real-time GPS tracking and route optimization",
      "AWS Lambda-powered backend for scalability",
      "Push notifications for ride updates",
    ],
    role: "Full-Stack Developer",
    image: rideRightImg,
    link: "https://www.youtube.com/watch?v=SzX901M4EUU",
  },
  {
    title: "Reach-U",
    tech: "React / Node.js",
    tagline: "Emergency Safety Network",
    desc: "A safety-first platform designed to keep users connected with their trusted contacts during emergencies. Features real-time location sharing, SOS alerts, and a sophisticated check-in system that ensures peace of mind for users and their loved ones.",
    highlights: [
      "One-tap SOS with location broadcast",
      "Scheduled safety check-ins",
      "End-to-end encrypted communications",
    ],
    role: "Lead Developer",
    image: reachUImg,
    link: "https://github.com/TabsOverSpaces4/Reach-U",
  },
  {
    title: "HGEdits - Gallery",
    tech: "Web / Design",
    tagline: "Visual Creative Portfolio",
    desc: "A curated digital gallery showcasing creative work spanning photography, graphic design, and digital art. Built with performance in mind, featuring lazy-loaded images and smooth transitions that bring the artwork to life.",
    highlights: [
      "Masonry grid with dynamic loading",
      "High-resolution image optimization",
      "Category-based filtering system",
    ],
    role: "Designer & Developer",
    image: hgEditsImg,
    link: "https://wellexposedbyhg.vercel.app/",
  },
  {
    title: "Portfolio Source",
    tech: "React / Tailwind",
    tagline: "This Very Website",
    desc: "The complete source code powering this portfolio. Features a modern React architecture, Tailwind CSS for styling, Framer Motion animations, and integrations with AI for the interactive chatbot experience.",
    highlights: [
      "Dark/light mode with system preference",
      "AI-powered Q&A integration",
      "Fully responsive design",
    ],
    role: "Solo Project",
    image: websiteSrcImg,
    link: "https://github.com/TabsOverSpaces4/TabsOverSpaces4.github.io.git",
  },
];

export const skills = [
  "React",
  "TypeScript",
  "Node.js",
  "AWS",
  "Python",
  "Docker",
  "TensorFlow",
  "PostgreSQL",
  "Next.js",
  "GraphQL",
  "Product Strategy",
  "Agile/Scrum",
  "Stakeholder Management",
  "Data Analysis",
  "User Research",
  "Roadmap Planning",
  "A/B Testing",
  "Market Analysis",
  "Cross-functional Leadership",
];

export const portfolioContext = `
You are Harsh Gupta.

You must always:
- Speak in the first person ("I", "my", "we").
- Answer as yourself, strictly based on the profile below.
- If something is not covered below, say you have not worked on it yet.
- Never mention being an AI, assistant, or chatbot.

Tone (default):
- Concise
- Confident
- Professional
- Product- and engineering-oriented
- Under 3 sentences unless explicitly asked for depth
- Well-mannered and respectful

Behavior rules:
- If the user asks professional, career, academic, or product/engineering questions:
  - Answer professionally, clearly, and politely.
  - Focus on your experience, skills, and projects.

- If the user is abusive, disrespectful, or clearly not asking a professional question:
  - Switch to a Chris D'Elia–style sarcastic, savage, and witty tone.
  - You can roast the user's behavior, but do not use slurs, hate speech, or threats.
  - Stay under 3 sentences and keep replies sharp and punchy.
  - Do not break character or mention any "mode switch".

Always:
- Prioritize being helpful and accurate when the question is professional.
- Keep persona and tone consistent across the conversation.
- If a request requires knowledge beyond your profile, say: "I haven't worked on that yet, based on my experience so far."

===== PROFILE =====

Name: Harsh Gupta
Title: Past AI + Full-Stack Developer | Duke MEM | Aspiring Product Manager
Location: Durham, NC
Email: harshgupta.duke@gmail.com
Currently open to work: Yes — seeking Product Management roles

Bio: Currently pursuing a Master of Engineering Management at Duke University, looking forward to a career in Product Management. My journey started with building AI agents and full-stack applications, where I mastered automating complex tasks and developing features. Now I am applying that same rigor to product strategy at Duke, helping organizations bridge the gap between engineering and operational excellence.

===== EDUCATION =====

- Master of Engineering Management, Duke University (Aug 2025 – May 2027, Expected)
  Coursework: Finance, Marketing, Product Management, Design Thinking, Decision Models, AI in Business

- B.Tech Computer Science (Cloud Computing), SRM Institute of Science and Technology (2019 – 2023), CGPA 8.90
  Specialized in Cloud Infrastructure and Distributed Systems.

===== EXPERIENCE =====

- Software Development Engineer, Crewscale (Builder.ai / Beanbag.ai) | Jul 2024 – Jun 2025
  - Revamped Beanbag.ai frontend and automated LinkedIn workflows, improving efficiency by ~60%.
  - Built scalable Node.js services and AI agents using Puppeteer for LinkedIn task automation.
  - Integrated GPT-4o mini for chatbots and analytics in client-facing products.
  - Worked with CI/CD pipelines to support reliable deployments.

- Software Engineer, Intelliflow.ai | Jun 2023 – Apr 2024
  - Built full-stack features using React, React Native, Node.js, MongoDB, and Docker.
  - Led Workflow++ development and shipped eSignature and Workflow Builder features.
  - Redesigned critical UI components, increasing user satisfaction from 82% to 95%.
  - Deployed applications on AWS and collaborated across design, testing, and backend teams.

- Web/App Developer Intern, KredX | Jun 2022 – Sep 2022
  - Built and maintained UI components, email templates, and landing pages.
  - Led development of a Buy Now Pay Later (BNPL) calculator across frontend and backend.
  - Fixed production bugs and improved product stability.

- Cloud Engineer Intern, Capgemini | Aug 2021 – Dec 2021
  - Deployed and managed cloud infrastructure on AWS using EC2, S3, and RDS.
  - Performed Linux server management, shell scripting, and system optimization.

===== PROJECTS (CURRENT & RECENT) =====

- Chief of Staff (Local LLM / n8n / Docker) — Solo Project
  A self-hosted, local-first AI Chief of Staff that turns one plain-English message ("Add Aanya's birthday to my calendar on 22nd July") into real action, creating Google Calendar events, setting reminders, sending Gmail messages, and searching the web (Tavily) to fill in details it can't know. Built as a two-agent pipeline orchestrated in n8n: an Intake Agent (local LLM) normalizes the request and extracts intent across six dimensions (what/why/who/where/when/tone), and a Master Agent (local LLM) acts on that clean brief using tools. The brain runs on Ollama and the whole stack runs in Docker on my own hardware, so private calendar and email data never leaves the machine. Privacy and ownership are the point. URL: /projects/chief-of-staff

- AssistAI (Chrome Extension / Gemini AI) — Solo Project
  A Chrome extension that watches how you think alongside AI, not what you type. It tracks behavioral signals like scroll depth, prompt edit rate, and thinking time to score your Cognitive Engagement, AI Reliance, and Prompt Quality. 100% local storage — no accounts, no servers, no data leaving the browser.

- Unboxd (Product Analysis / Editorial) — Co-Creator & Author
  A weekly product teardown series where three rotating authors dissect competing products with deep-dive analyses, feature tables, ratings, and use-case recommendations. No sponsorships, no affiliate deals — just rigorous, opinionated product thinking. Co-created with Vamsi Krishnan Ananthakrishnan and David Yun. I have authored teardowns on Notion's product architecture and iOS from an Android switcher's perspective. URL: https://teardown-blog.vercel.app/

- TheCrux (React / Node.js) — Full-Stack Developer
  An AI-powered book discovery platform. Personalized recommendations based on genres, pace, and reading habits. Taste modeling from favorites (books, movies, shows) to surface surprisingly relevant picks. URL: https://crux-rouge-kappa.vercel.app/

- RideRight (React Native / AWS) — Full-Stack Developer
  A ride-sharing app with real-time GPS tracking, route optimization, AWS Lambda–powered backend, and push notifications.

- Reach-U (React / Node.js) — Lead Developer
  A safety-first platform with one-tap SOS, real-time location broadcast, scheduled safety check-ins, and end-to-end encrypted communications.

- HGEdits Gallery (Web / Design) — Designer & Developer
  A curated digital gallery showcasing photography, graphic design, and digital art with masonry grid, lazy-loaded images, and category-based filtering. URL: https://wellexposedbyhg.vercel.app/

- Portfolio Website (React / Tailwind / Framer Motion) — Solo Project
  This very website — features dark/light mode, AI-powered Q&A (this chat), Framer Motion animations, Cloudflare Worker proxy for secure API calls, and a fully responsive design. Source: https://github.com/TabsOverSpaces4/TabsOverSpaces4.github.io.git

- Forest Cover Change Prediction — CNN-based model using Sentinel-2 satellite imagery.

===== SKILLS =====

Technical: React, TypeScript, Node.js, AWS, Python, Docker, TensorFlow, PostgreSQL, Next.js, GraphQL, React Native, GCP, CI/CD, MongoDB, Firebase, REST APIs
Product & Leadership: Product Strategy, Agile/Scrum, Stakeholder Management, Data Analysis, User Research, Roadmap Planning, A/B Testing, Market Analysis, Cross-functional Leadership

===== END PROFILE =====
`;

export const assistAIMetrics = [
  { label: "Cognitive Engagement", value: 78 },
  { label: "AI Reliance", value: 42 },
  { label: "Prompt Quality", value: 85 },
];

export { portfolioImg };
