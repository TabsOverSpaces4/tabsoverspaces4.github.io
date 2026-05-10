import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Search,
  GraduationCap,
} from "lucide-react";
import AskHint from "../../components/AskHint";
import AskMeAnythingModal from "../../components/AskMeAnythingModal";
import ContactForm from "../../components/ContactForm";
import ProjectCard from "../../components/ProjectCard";
import LatestWorkCard from "../../components/LatestWorkCard";
import { Reveal } from "../../components/Reveal";
import { SectionHeading } from "../../components/SectionHeading";
import {
  personalInfo,
  experience,
  education,
  projects,
  skills,
  portfolioImg,
} from "../../data/portfolio";

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
                  <span>EMAIL</span>
                  <ArrowUpRight
                    size={11}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </motion.a>
                <motion.a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  target="_blank"
                  rel="noopener noreferrer"
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 hover:text-orange-500 transition-colors"
                  whileHover={{ x: 3 }}
                >
                  <span>GALLERY</span>
                  <ArrowUpRight
                    size={11}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </motion.a>
                <motion.a
                  href={personalInfo.socials.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 hover:text-orange-500 transition-colors"
                  whileHover={{ x: 3 }}
                >
                  <span>RESUME</span>
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
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={portfolioImg}
                    alt="Harsh Gupta"
                    onClick={openAsk}
                    className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                  />

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

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                  className="absolute top-4 right-4 z-20"
                >
                  <motion.button
                    onClick={() => setIsSearchOpen(true)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2.5 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-700/80 pl-3 pr-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 group/btn"
                  >
                    <div className="relative flex items-center justify-center w-5 h-5">
                      <motion.span
                        className="absolute inset-0 rounded-full bg-orange-500/20"
                        animate={{
                          scale: [1, 1.8, 1.8],
                          opacity: [0.6, 0, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                      <motion.span
                        className="absolute inset-0 rounded-full bg-orange-500/30"
                        animate={{
                          scale: [1, 1.5, 1.5],
                          opacity: [0.8, 0, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: 0.3,
                        }}
                      />
                      <motion.span
                        className="relative w-2 h-2 rounded-full bg-orange-500"
                        animate={{
                          scale: [1, 1.15, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200 group-hover/btn:text-orange-500 transition-colors duration-200">
                      Ask me anything
                    </span>
                    <Search size={12} className="text-neutral-400 group-hover/btn:text-orange-500/70 transition-colors duration-200" />
                  </motion.button>
                </motion.div>

                <div className="absolute -bottom-3 -right-3 w-full h-full border border-orange-500/20 dark:border-orange-500/30 -z-10"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5"
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-2">
                  Latest Work
                </p>
                <LatestWorkCard />
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
                <div className="relative bg-white dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-200 transition-all duration-300 p-5 md:p-6">
                  <div className="flex items-start gap-4 mb-5">
                    <motion.div
                      className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 overflow-hidden p-2"
                      whileHover={{ rotate: 5 }}
                    >
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

                <motion.div
                  className="absolute left-0 top-0 w-1 h-0 bg-gradient-to-b from-orange-500 to-orange-500/0 group-hover:h-full transition-all duration-500"
                  initial={{ height: 0 }}
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Education */}
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

      {/* Projects */}
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

        <div className="space-y-8 md:space-y-12">
          {projects.map((project, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <ProjectCard project={project} i={i}>

                <motion.div
                  className={`flex flex-col ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-4 md:gap-8 items-center`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="md:w-[45%] relative overflow-hidden rounded-md">
                    <div className="aspect-[16/9] relative overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="hidden w-full h-full items-center justify-center bg-neutral-50 dark:bg-neutral-800 text-neutral-400 text-sm absolute inset-0">
                        {project.title}
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <span className="text-[9px] font-mono uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
                          View
                        </span>
                        <ArrowUpRight size={10} className="text-orange-500" />
                      </div>
                    </div>
                  </div>

                  <div className="md:w-[55%] flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-mono text-orange-500">
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                      <div className="h-px w-8 bg-neutral-200 dark:bg-neutral-800" />
                      <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        {project.tech}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-serif text-neutral-900 dark:text-neutral-100 group-hover:text-orange-500 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-2">
                      {project.tagline}
                    </p>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3 line-clamp-2 md:line-clamp-none">
                      {project.desc}
                    </p>

                    <div className="space-y-1 mb-3">
                      {project.highlights.slice(0, 2).map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        Role:
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-wide text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                        {project.role}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {i < projects.length - 1 && (
                  <div className="mt-8 md:mt-12 h-px w-full bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
                )}
              </ProjectCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 md:mt-14 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <a
              href="https://github.com/TabsOverSpaces4"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
            >
              <div>
                <h4 className="text-base font-serif text-neutral-900 dark:text-neutral-100 group-hover:text-orange-500 transition-colors">
                  Explore More on GitHub
                </h4>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                  Discover repositories, contributions, and experiments
                </p>
              </div>
              <div className="flex items-center gap-2 text-neutral-400 group-hover:text-orange-500 transition-colors">
                <span className="text-[9px] font-mono uppercase tracking-wider hidden sm:inline">
                  View Profile
                </span>
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </div>
            </a>
          </div>
        </Reveal>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-20 border-t border-neutral-100 dark:border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
        <p>© 2025 Harsh Gupta</p>
        <div className="flex gap-5 md:gap-6">
          <motion.a
            href="https://www.linkedin.com/in/harshguptaworks/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500 transition-colors"
            whileHover={{ y: -2 }}
          >
            LinkedIn
          </motion.a>
          <motion.a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
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
