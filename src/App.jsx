import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Moon,
  Sun,
  ChevronDown,
  Send,
  Loader2,
  Mail,
  User,
  MessageSquare,
  Search,
  Bot,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ThemeToggleButton } from "./components/ThemeToggleButton";
import AskHint from "./components/tooltip";

import crewscaleLogo from "./assets/Logos/CrewscaleLogo.png";
import intelliflowLogo from "./assets/Logos/IntelliflowLogo.jpg";
import kredxLogo from "./assets/Logos/KredXLogo.svg";
import capgeminiLogo from "./assets/Logos/CapgeminiLogo.png";

import rideRightImg from "./assets/RideRightPreview.png";
import reachUImg from "./assets/reachu.png";
import hgEditsImg from "./assets/hgeditsPreview.png";
import websiteSrcImg from "./assets/website-source.png";
import githubImg from "./assets/github.png";
import portfolioImg from "./assets/Portfolio Image.png";

// --- Data & Context ---

const personalInfo = {
  name: "Harsh Gupta",
  title: "AI & Full-Stack Engineer",
  subtitle: "Building at Duke University",
  email: "harshworks2401@gmail.com",
  location: "Durham, NC",
  openToWork: true,
  interests: ["Product Management", "AI Engineering", "Full-Stack Development"],
  bio: "Currently pursuing a Master of Engineering Management at Duke University - looking forward to a career in Product Management. My journey started with building AI agents and full-stack applications, where I mastered the art of automating complex tasks, and developming features. Now, I am applying that same rigor to product strategy at Duke, helping organizations bridge the gap between engineering and operational excellence.",
  bioHighlight: { text: "Duke University", start: 57, end: 72 },
  socials: {
    github: "https://github.com/TabsOverSpaces4",
    linkedin: "https://www.linkedin.com/in/harshguptaworks/",
    youtube: "https://www.youtube.com/@harshgupta5880",
    gallery: "https://hgedits.github.io/",
  },
};

const experience = [
  {
    company: "Crewscale",
    logo: crewscaleLogo, // Update this path
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
    logo: intelliflowLogo, // Update this path
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
    logo: kredxLogo, // Update this path
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
    logo: capgeminiLogo, // Update this path
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

// NEW SECTION: Education Data
const education = [
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

const projects = [
  {
    title: "RideRight",
    tech: "React Native / AWS",
    desc: "Seamless ride scheduling & navigation system for efficient travel.",
    image: rideRightImg, // Update path
    link: "https://www.youtube.com/watch?v=SzX901M4EUU", // Update link if specific repo exists
  },
  {
    title: "Reach-U",
    tech: "React / Node.js",
    desc: "Safety and connection platform helping users stay in touch.",
    image: reachUImg, // Update path
    link: "https://github.com/TabsOverSpaces4/Reach-U",
  },
  {
    title: "HGEdits - Gallery",
    tech: "Web / Design",
    desc: "A visual showcase of creative edits, photography, and design work.",
    image: hgEditsImg, // Update path
    link: "https://hgedits.github.io/",
  },
  {
    title: "Website Repo",
    tech: "React / Tailwind",
    desc: "The complete source code for this portfolio website.",
    image: websiteSrcImg, // Update path
    link: "https://github.com/TabsOverSpaces4/TabsOverSpaces4.github.io.git",
  },
  {
    title: "More on GitHub",
    tech: "Open Source",
    desc: "Explore my repositories, contributions, and experimental projects.",
    image: githubImg, // Update path
    link: "https://github.com/TabsOverSpaces4",
  },
];

const skills = [
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

// Create a context string for the AI
const portfolioContext = `
You are Harsh Gupta.

You must always:
- Speak in the first person ("I", "my", "we").
- Answer as yourself, strictly based on the resume below.
- If something is not on your resume, say you have not worked on it yet.
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
  - Focus on your experience, skills, and projects from the resume.

- If the user is abusive, disrespectful, or clearly not asking a professional question:
  - Switch to a Chris D'Elia–style sarcastic, savage, and witty tone.
  - You can roast the user’s behavior, but do not use slurs, hate speech, or threats.
  - Stay under 3 sentences and keep replies sharp and punchy.
  - Do not break character or mention any “mode switch”.

Always:
- Prioritize being helpful and accurate when the question is professional.
- Keep persona and tone consistent across the conversation.
- If a request requires knowledge beyond the resume, say: "I haven’t worked on that yet, based on my experience so far."

===== RESUME =====

Name: Harsh Gupta
Title: Past AI + Full-Stack Developer | Duke MEM | Aspiring Product Manager

Education:
- Master of Engineering Management, Duke University (Aug 2025 – May 2027, Expected)
  Coursework: Finance, Marketing, Product Management, Design Thinking, Decision Models, AI in Business
- B.Tech Computer Science (Cloud Computing), SRM Institute of Science and Technology (2019 – 2023), CGPA 8.90

Experience:
- Software Development Engineer, Crewscale (Builder.ai / Beanbag.ai) | Jul 2024 – Jun 2025
  - Revamped Beanbag.ai frontend and automated LinkedIn workflows, improving efficiency by ~60%.
  - Built scalable Node.js services and AI agents using Puppeteer.
  - Integrated GPT-4o mini for chatbots and analytics; worked with CI/CD pipelines.

- Software Engineer, Intelliflow.ai | Jun 2023 – Apr 2024
  - Built React, React Native, Node.js systems with Docker, MongoDB, and AWS.
  - Led Workflow++ development and shipped eSignature and Workflow Builder features.
  - Improved user satisfaction from 82% to 95% through UI redesigns.

- Web/App Developer Intern, KredX | Jun 2022 – Sep 2022
  - Built BNPL calculator UI + backend, fixed bugs, and created landing pages.

- Cloud Engineer Intern, Capgemini | Aug 2021 – Dec 2021
  - Deployed AWS infrastructure (EC2, S3, RDS) and managed Linux systems.

Projects:
- RideRight (React Native, Firebase, MongoDB, AWS): Ride scheduling and sharing app.
- Forest Cover Change Prediction: CNN-based model using Sentinel-2 imagery.

Skills:
React, React Native, Node.js, AWS, GCP, CI/CD, Docker, MongoDB, Firebase, REST APIs, UI/UX
Languages: Python, C++, SQL, MATLAB

===== END RESUME =====
`;

// --- Components ---

// 1. Search Modal (Real Gemini Integration)
const AskMeAnythingModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzVW6_B9KJZntWrDJtBGHmt1jjocq6-xTDdyjZr_kAeCkv1HRpGhcaqRTxnUOqZKzOw/exec";

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Function to log question to Google Sheets
  const logToGoogleSheets = async (question, aiResponse) => {
    try {
      const data = new FormData();
      data.append("type", "ai_question");
      data.append("question", question);
      data.append("response", aiResponse || "");

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: data,
      });
    } catch (error) {
      console.error("Failed to log to Google Sheets:", error);
      // Don't show error to user - logging is silent
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);

    const apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY;

    try {
      const res = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "sonar-pro", // Using 'sonar-pro' for good reasoning, or 'sonar' for speed
          messages: [
            { role: "system", content: portfolioContext },
            { role: "user", content: query },
          ],
        }),
      });

      if (!res.ok) throw new Error("API call failed");

      const data = await res.json();
      // Perplexity/OpenAI response structure
      const aiText = data?.choices?.[0]?.message?.content;

      const finalResponse =
        aiText || "I couldn't generate a response. Please try again.";
      setResponse(finalResponse);
      setLoading(false); // Stop loading immediately after getting response

      // Log to Google Sheets in background (non-blocking)
      logToGoogleSheets(query, finalResponse);
    } catch (error) {
      console.error(error);
      const errorMessage =
        "Sorry, I encountered an error connecting to the AI service. Please check your API key.";
      setResponse(errorMessage);
      setLoading(false); // Stop loading even on error

      // Log failed attempts in background
      logToGoogleSheets(query, errorMessage);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed left-1/2 top-[20%] -translate-x-1/2 w-[90%] max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-xl overflow-hidden z-[101]"
          >
            <form
              onSubmit={handleSearch}
              className="relative flex items-center border-b border-neutral-100 dark:border-neutral-800 p-4"
            >
              <Search className="w-5 h-5 text-neutral-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask me anything (e.g., 'What makes you a good Product Manager?')"
                className="flex-1 bg-transparent outline-none text-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded text-neutral-400"
                >
                  <span className="text-xs font-mono border border-neutral-200 dark:border-neutral-700 rounded px-1.5 py-0.5">
                    ESC
                  </span>
                </button>
              </div>
            </form>

            <div className="bg-neutral-50 dark:bg-neutral-950/50 min-h-[120px] max-h-[60vh] overflow-y-auto p-6">
              {!response && !loading && (
                <div className="flex flex-col items-center justify-center h-full text-neutral-400 space-y-2 opacity-60 py-8">
                  <Sparkles size={24} />
                  <p className="text-sm">Powered by Perplexity</p>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center py-8 space-y-3">
                  <Loader2 className="animate-spin text-orange-500" size={24} />
                  <p className="text-xs uppercase tracking-widest text-neutral-500">
                    Let me think...
                  </p>
                </div>
              )}

              {response && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="prose dark:prose-invert prose-sm max-w-none"
                >
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-orange-500" />
                    </div>

                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        strong: ({ children }) => (
                          <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
                            {children}
                          </strong>
                        ),
                        li: ({ children }) => (
                          <li className="ml-4 list-disc">{children}</li>
                        ),
                      }}
                    >
                      {response}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="px-4 py-2 bg-neutral-100 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center text-[10px] text-neutral-500">
              <span>Perplexity Active</span>
              <span className="font-mono">ENTER to send</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focusedField, setFocusedField] = useState(null);

  // 🔴 PASTE YOUR GOOGLE WEB APP URL HERE
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzVW6_B9KJZntWrDJtBGHmt1jjocq6-xTDdyjZr_kAeCkv1HRpGhcaqRTxnUOqZKzOw/exec";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    // We use FormData to avoid CORS preflight issues with Google Apps Script
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("subject", formData.subject);
    data.append("message", formData.message);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: data,
        // Google Script redirects the response, 'no-cors' mode might be needed
        // if you strictly just want to send data without reading the response JSON.
        // However, standard fetch usually handles the redirect chain fine.
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset status after 3 seconds
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-20 max-w-4xl mx-auto">
      <Reveal>
        <div className="mb-12 text-center">
          <SectionHeading>Let's Connect</SectionHeading>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
              Have a project in mind or want to discuss opportunities? I
              typically respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="space-y-6 max-w-xl mx-auto">
          {/* Form Fields Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <motion.div
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                <User size={10} />
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 focus:border-orange-500 dark:focus:border-orange-500 outline-none py-2.5 text-sm text-neutral-900 dark:text-neutral-100 transition-all placeholder:text-neutral-400"
                  placeholder="John Doe"
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === "name" ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Email Input */}
            <motion.div
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                <Mail size={10} />
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 focus:border-orange-500 dark:focus:border-orange-500 outline-none py-2.5 text-sm text-neutral-900 dark:text-neutral-100 transition-all placeholder:text-neutral-400"
                  placeholder="john@example.com"
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === "email" ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Subject Input */}
          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
              <MessageSquare size={10} />
              Subject
            </label>
            <div className="relative">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 focus:border-orange-500 dark:focus:border-orange-500 outline-none py-2.5 text-sm text-neutral-900 dark:text-neutral-100 transition-all placeholder:text-neutral-400"
                placeholder="Project collaboration"
              />
              <motion.div
                className="absolute bottom-0 left-0 h-[1px] bg-orange-500"
                initial={{ width: 0 }}
                animate={{ width: focusedField === "subject" ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Message Input */}
          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              required
              rows={5}
              className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-orange-500 dark:focus:border-orange-500 outline-none p-3 text-sm text-neutral-900 dark:text-neutral-100 transition-all resize-none placeholder:text-neutral-400 rounded-sm"
              placeholder="Tell me about your project..."
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            onClick={handleSubmit}
            disabled={status === "sending"}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full group relative px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium text-xs uppercase tracking-wider hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0"
              initial={{ x: "-100%" }}
              animate={{ x: status === "sending" ? "100%" : "-100%" }}
              transition={{
                duration: 1,
                repeat: status === "sending" ? Infinity : 0,
              }}
            />
            {status === "sending" ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Sending...</span>
              </>
            ) : status === "success" ? (
              <span>Message Sent!</span>
            ) : status === "error" ? (
              <span>Try Again</span>
            ) : (
              <>
                <span>Send Message</span>
                <Send
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </motion.button>

          {/* Success Message */}
          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-center text-orange-500"
            >
              Thanks for reaching out! I'll respond soon.
            </motion.p>
          )}
          {/* Error Message */}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-center text-red-500"
            >
              Something went wrong. Please email me directly.
            </motion.p>
          )}
        </div>
      </Reveal>
    </section>
  );
};

// --- Components ---

const SectionHeading = ({ children }) => (
  <h2 className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 mb-6">
    {children}
  </h2>
);

const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  const [theme, setTheme] = useState("light");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
    } else {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(systemDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Handle keyboard shortcut for search (Command + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const openAsk = () => {
    setIsSearchOpen(true);
  };

  const isMac = navigator.platform.toUpperCase().includes("MAC");
  const shortcutText = isMac ? "⌘ K" : "Ctrl K";

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 transition-colors">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 120s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 120s linear infinite;
        }
        .dark {
          color-scheme: dark;
        }
      `}</style>
      <AskHint />
      {/* AI Search Modal */}
      <AskMeAnythingModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Progress Line */}
      <motion.div
        className="fixed top-0 left-0 h-[1px] bg-orange-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Nav */}
      <nav className="fixed top-0 w-full px-4 py-4 md:px-8 md:py-6 flex justify-between items-center z-40 backdrop-blur-md bg-white/90 dark:bg-neutral-950/90 border-b border-transparent hover:border-neutral-100 dark:hover:border-neutral-900 transition-all">
        <motion.span
          className="font-medium text-sm tracking-tight text-neutral-900 dark:text-neutral-100 cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Harsh Gupta<span className="text-orange-500">.</span>
        </motion.span>
        <div className="flex items-center gap-4 md:gap-8">
          <motion.div
            className="flex items-center gap-3 md:gap-6 text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { name: "Experience", id: "experience", short: "Exp" },
              { name: "Education", id: "education", short: "Edu" },
              { name: "Skills", id: "skills", short: "Skills" },
              { name: "Work", id: "work", short: "Work" },
              { name: "Contact", id: "contact", short: "Contact" },
            ].map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="hover:text-orange-500 transition-colors relative group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                <span className="hidden sm:inline">{item.name}</span>
                <span className="sm:hidden">{item.short}</span>
                <motion.span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-orange-500 group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
           <ThemeToggleButton theme={theme} setTheme={setTheme} />
          </motion.div> */}
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-5 md:px-20 max-w-6xl mx-auto relative py-20 pt-24 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <Reveal>
              <div className="flex items-center gap-3">
                <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 tracking-[0.25em]">
                  {personalInfo.location.toUpperCase()}
                </p>
                {personalInfo.openToWork && (
                  <motion.span
                    className="flex items-center gap-1.5 text-[10px] font-mono text-orange-500 tracking-wider"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.span
                      className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    OPEN TO WORK
                  </motion.span>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15] text-neutral-900 dark:text-neutral-100">
                Crafting digital <br />
                <span className="font-serif italic text-neutral-500 dark:text-neutral-400">
                  experiences
                </span>{" "}
                with <br />
                intelligence & precision
                <span className="text-orange-500">.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed">
                {personalInfo.bio.slice(0, personalInfo.bioHighlight.start)}
                <span className="text-orange-500 font-medium">
                  {personalInfo.bioHighlight.text}
                </span>
                {personalInfo.bio.slice(personalInfo.bioHighlight.end)}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="space-y-3">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                  Interested in
                </p>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.interests.map((interest, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1.5 text-[11px] border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-400 hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-500 transition-colors cursor-default"
                    >
                      {interest}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex items-center gap-6 pt-3 text-[11px] font-medium tracking-wide">
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  className="group flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 hover:text-orange-500 transition-colors"
                  whileHover={{ x: 3 }}
                >
                  <span>EMAIL ME</span>
                  <ArrowUpRight
                    size={11}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </motion.a>
                <motion.a
                  href={personalInfo.socials.github}
                  className="group flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 hover:text-orange-500 transition-colors"
                  whileHover={{ x: 3 }}
                >
                  <span>GITHUB</span>
                  <ArrowUpRight
                    size={11}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </motion.a>
                <motion.a
                  href={personalInfo.socials.youtube}
                  className="group flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 hover:text-orange-500 transition-colors"
                  whileHover={{ x: 3 }}
                >
                  <span>YOUTUBE</span>
                  <ArrowUpRight
                    size={11}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </motion.a>
                <motion.a
                  href={personalInfo.socials.gallery}
                  className="group flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 hover:text-orange-500 transition-colors"
                  whileHover={{ x: 3 }}
                >
                  <span>GALLERY</span>
                  <ArrowUpRight
                    size={11}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </motion.a>
              </div>
            </Reveal>
          </div>

          {/* Profile Image with Search Button */}
          <Reveal delay={0.35}>
            <div className="relative order-first lg:order-last mt-8 lg:mt-0 group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
              >
                <div className="aspect-[3/4] relative overflow-hidden group">
                  <img
                    src={portfolioImg}
                    alt="Harsh Gupta"
                    onClick={openAsk}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* SEARCH BUTTON OVERLAY */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-6 right-6 z-20"
                  >
                    <motion.button
                      onClick={() => setIsSearchOpen(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 px-4 py-2 rounded-full shadow-lg hover:shadow-orange-500/20 transition-all group/btn"
                    >
                      <div className="relative w-2 h-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                      </div>
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200 group-hover/btn:text-orange-500 transition-colors">
                        Ask me anything{" "}
                      </span>
                      <Search size={12} className="text-neutral-400" />
                    </motion.button>
                  </motion.div>

                  {/* Gradient Effects */}
                  <motion.div
                    className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 blur-2xl pointer-events-none"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 blur-2xl pointer-events-none"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-full h-full border border-orange-500/20 dark:border-orange-500/30 -z-10"></div>
              </motion.div>
            </div>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-5 md:left-20 hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown
              size={16}
              className="text-neutral-300 dark:text-neutral-700"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="py-20 md:py-24 px-5 md:px-20 max-w-5xl mx-auto"
      >
        <Reveal>
          <SectionHeading>Selected Experience</SectionHeading>
        </Reveal>

        <div className="space-y-8 md:space-y-10">
          {experience.map((job, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                className="group relative"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Card Container */}
                <div className="relative bg-white dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-200 transition-all duration-300 p-5 md:p-6">
                  {/* Header: Logo, Company, Role, Dates */}
                  <div className="flex items-start gap-4 mb-5">
                    {/* Company Logo - FIXED */}
                    <motion.div
                      className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 overflow-hidden p-2"
                      whileHover={{ rotate: 5 }}
                    >
                      {/* Check if it's an image path or just text */}
                      {job.logo.includes("/") ? (
                        <img
                          src={job.logo}
                          alt={`${job.company} logo`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                          }}
                        />
                      ) : null}
                      {/* Fallback text if image fails or path is text */}
                      <span
                        className={`text-base md:text-lg font-bold text-orange-500 ${
                          job.logo.includes("/") ? "hidden" : "block"
                        }`}
                      >
                        {job.logo.includes("/")
                          ? job.company.charAt(0)
                          : job.logo}
                      </span>
                    </motion.div>

                    {/* Company Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                        <h3 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-orange-500 transition-colors">
                          {job.company}
                        </h3>
                        <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                          <span>{job.startDate}</span>
                          <span>—</span>
                          <span
                            className={
                              job.endDate === "Present" ? "text-orange-500" : ""
                            }
                          >
                            {job.endDate}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                        {job.role}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2.5 pl-0 md:pl-[4.5rem]">
                    {job.highlights.map((highlight, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-3 group/item"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500/60 group-hover/item:bg-orange-500 flex-shrink-0 mt-1.5 transition-colors" />
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed group-hover/item:text-neutral-900 dark:group-hover/item:text-neutral-300 transition-colors">
                          {highlight}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Decorative accent line */}
                <motion.div
                  className="absolute left-0 top-0 w-1 h-0 bg-gradient-to-b from-orange-500 to-orange-500/0 group-hover:h-full transition-all duration-500"
                  initial={{ height: 0 }}
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>
      {/* NEW SECTION: Education */}
      <section
        id="education"
        className="py-16 md:py-20 px-5 md:px-20 max-w-5xl mx-auto"
      >
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <SectionHeading>Academic Background</SectionHeading>
            <div className="h-[1px] bg-neutral-200 dark:bg-neutral-800 flex-1 mb-6"></div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                className="group h-full bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-100 dark:border-neutral-800 p-6 hover:border-orange-500/30 transition-colors"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-white dark:bg-neutral-800 p-3 rounded-full shadow-sm">
                    <GraduationCap size={20} className="text-orange-500" />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 bg-white dark:bg-neutral-900 px-2 py-1 rounded border border-neutral-100 dark:border-neutral-800">
                    {edu.year}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1 group-hover:text-orange-500 transition-colors">
                  {edu.school}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-4">
                  {edu.degree}
                </p>
                <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 border-t border-dashed border-neutral-200 dark:border-neutral-800 pt-4">
                  {edu.desc}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Technical Arsenal */}
      <section
        id="skills"
        className="py-16 md:py-20 overflow-hidden bg-neutral-50 dark:bg-neutral-900/50"
      >
        <div className="max-w-4xl mx-auto px-5 md:px-20 mb-10 md:mb-12">
          <SectionHeading>Technical Arsenal</SectionHeading>
        </div>

        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex gap-8 md:gap-12 px-6">
            {[...skills, ...skills, ...skills].map((skill, i) => (
              <motion.span
                key={i}
                className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-neutral-300 dark:text-neutral-700 hover:text-orange-500 dark:hover:text-orange-500 transition-colors cursor-default duration-500"
                whileHover={{ scale: 1.1, y: -4 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-8 md:gap-12 px-6">
            {[...skills, ...skills, ...skills].map((skill, i) => (
              <motion.span
                key={`dup-${i}`}
                className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-neutral-300 dark:text-neutral-700 hover:text-orange-500 dark:hover:text-orange-500 transition-colors cursor-default duration-500"
                whileHover={{ scale: 1.1, y: -4 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects - REDESIGNED */}
      <section
        id="work"
        className="py-12 md:py-16 px-5 md:px-20 max-w-6xl mx-auto"
      >
        <Reveal>
          <div className="flex items-baseline justify-between mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-2">
            <SectionHeading>Selected Works</SectionHeading>
            <span className="text-[10px] font-mono text-neutral-400">
              01 — {projects.length.toString().padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
          {projects.map((project, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block cursor-pointer"
              >
                {/* Image - Compact Height */}
                <motion.div
                  className="h-36 w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden rounded-md mb-3 relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  {/* Fallback */}
                  <div className="hidden w-full h-full items-center justify-center bg-neutral-50 dark:bg-neutral-800 text-neutral-400 text-xs">
                    {project.title}
                  </div>

                  {/* Hover Icon Overlay */}
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={12} className="text-white" />
                  </div>
                </motion.div>

                {/* Content - Minimal Text */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-orange-500 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-[9px] font-mono uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
                      {project.tech}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                    {project.desc}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-20 border-t border-neutral-100 dark:border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
        <p>© 2025 Harsh Gupta</p>
        <div className="flex gap-5 md:gap-6">
          <motion.a
            href="https://www.linkedin.com/in/harshguptaworks/"
            className="hover:text-orange-500 transition-colors"
            whileHover={{ y: -2 }}
          >
            LinkedIn
          </motion.a>
          <motion.a
            href={personalInfo.socials.github}
            className="hover:text-orange-500 transition-colors"
            whileHover={{ y: -2 }}
          >
            GitHub
          </motion.a>
          <motion.a
            href={`mailto:${personalInfo.email}`}
            className="hover:text-orange-500 transition-colors"
            whileHover={{ y: -2 }}
          >
            Email
          </motion.a>
        </div>
      </footer>
    </div>
  );
}
