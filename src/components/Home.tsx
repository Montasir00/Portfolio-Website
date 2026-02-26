import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Code,
  Database,
  BarChart3,
  Box,
  ArrowRight,
  Download,
  Mail,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Layers,
  FlaskConical,
} from "lucide-react";

interface HeroProps {
  onNavigate: (page: string) => void;
}

const featuredProjects = [
  {
    id: 8,
    title: "Energy Management System",
    desc: "A real-time IoT data pipeline using Docker Compose and Python. Automated data ingestion, preprocessing, and anomaly detection for continuous sensor analytics.",
    tags: ["Python", "Docker", "MySQL"],
    metric: "40% reduction in manual data tasks",
    img: "https://picsum.photos/seed/smart-energy/1200/800",
    color: "from-cyan-500/20 to-blue-500/10",
  },
  {
    id: 6,
    title: "Blockchain Transaction System",
    desc: "A crypto trading platform supporting on-chain ETH transactions via the Ganache test network, using PHP, Web3.php, and multi-factor authentication.",
    tags: ["PHP", "Ethereum", "Web3.php"],
    metric: "Secure on-chain transactions with MFA",
    img: "https://picsum.photos/seed/crypto-blockchain/1200/800",
    color: "from-purple-500/20 to-indigo-500/10",
  },
  {
    id: 1,
    title: "Weather & Air Quality Analysis",
    desc: "Analysed environmental time-series data from the Copernicus Climate Data Store for Milan, correlating temperature changes with pollutant concentration levels.",
    tags: ["Python", "Pandas", "Matplotlib"],
    metric: "94% accuracy on pollution trend forecasting",
    img: "https://picsum.photos/seed/weather-forecast/1200/800",
    color: "from-emerald-500/20 to-teal-500/10",
  },
];

const Typewriter = ({ text, delay = 100 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className="relative">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[0.8em] bg-primary ml-1 align-middle"
      />
    </span>
  );
};

export const Home = ({ onNavigate }: HeroProps) => {
  const [activeProject, setActiveProject] = useState(0);

  const toolkit = [
    { name: "Python", icon: <Code size={28} />, label: "ML & Data Pipelines" },
    { name: "SQL", icon: <Database size={28} />, label: "Querying & Analytics" },
    {
      name: "Docker",
      icon: <Box size={28} />,
      label: "Containerization & DevOps",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % featuredProjects.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goNext = () =>
    setActiveProject((prev) => (prev + 1) % featuredProjects.length);
  const goPrev = () =>
    setActiveProject(
      (prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length,
    );

  const project = featuredProjects[activeProject];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="space-y-16 pb-32"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-primary/20 p-6 md:p-16 text-center shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none data-grid-bg"></div>
        <div className="absolute top-0 left-0 w-full scanner-line opacity-20"></div>

        <div className="relative z-10 space-y-6 md:space-y-8">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 p-1.5 px-4 bg-primary/10 border border-primary/20 text-primary rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            System Status: Operational
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-7xl font-bold leading-[1.1] md:leading-[0.9] text-white tracking-tighter"
          >
            BSc in Data Analysis <br className="hidden md:block" />
            <span className="text-primary text-glow block md:inline mt-2 md:mt-0">
              <Typewriter text="Learning how data explains the world" delay={70} />
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-slate-400 max-w-xl mx-auto text-base md:text-lg leading-relaxed font-medium"
          >
            I’m studying Data Analysis at the University of Messina.
            This site is a collection of projects where I explore data,
            test ideas, and learn along the way.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-4 md:pt-6"
          >
            <motion.a
              href="/resume.pdf"
              download="Fazlur_Rahman_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-primary-dark text-slate-900 font-bold py-4 md:py-5 px-8 md:px-10 rounded-2xl transition-all shadow-xl shadow-primary/20 text-xs md:text-sm flex items-center justify-center gap-3"
            >
              <Download size={18} className="md:w-5 md:h-5" />
              Download Resume
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate("contact")}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-primary/50 text-white font-bold py-4 md:py-5 px-8 md:px-10 rounded-2xl transition-all text-xs md:text-sm flex items-center justify-center gap-3"
            >
              <Mail size={18} className="md:w-5 md:h-5" />
              Let's Connect
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Metrics Callout */}
      <motion.section
        variants={itemVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
      >
        {[
          { value: "14", label: "Projects", icon: <Layers size={18} /> },
          { value: "4+", label: "Languages", icon: <Code size={18} /> },
          {
            value: "2",
            label: "Internships",
            icon: <GitBranch size={18} />,
          },
          {
            value: "MSc",
            label: "Next Goal",
            icon: <FlaskConical size={18} />,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-card-dark rounded-2xl p-5 border border-slate-200 dark:border-white/5 shadow-lg flex flex-col items-center gap-2"
          >
            <div className="text-primary">{stat.icon}</div>
            <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.section>

      {/* Technical Toolkit */}
      <section className="space-y-8">
        <div className="flex flex-col items-center border-b border-primary/10 pb-6">
          <h2 className="text-2xl font-bold tracking-tight font-mono uppercase italic text-primary">
            Tools I Use
          </h2>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">
            Core Technical Stack
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {toolkit.map((item) => (
            <motion.div
              key={item.name}
              variants={itemVariants}
              whileHover={{ y: -10, borderColor: "rgba(17, 180, 212, 0.4)" }}
              className="flex flex-col items-center p-10 bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl group transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/20 transition-colors">
                {item.icon}
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-slate-200">
                {item.name}
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-widest mt-2 font-bold">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Projects Carousel */}
      <section className="space-y-8">
        <div className="flex flex-col items-center border-b border-primary/10 pb-6">
          <h2 className="text-2xl font-bold tracking-tight font-mono uppercase italic text-primary">
            Featured Projects
          </h2>
          <button
            onClick={() => onNavigate("projects")}
            className="text-xs font-bold text-primary flex items-center gap-2 hover:underline group uppercase tracking-widest mt-2"
          >
            View all projects{" "}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden bg-white dark:bg-card-dark rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl"
            >
              <div className="h-64 md:h-80 w-full bg-slate-900 relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} z-10`}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
                <img
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-110 transition-transform duration-1000"
                  src={project.img}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-8 left-8 z-20 flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 bg-slate-900/80 backdrop-blur-md border border-white/10 text-primary text-[10px] font-bold rounded-xl uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 md:p-10 space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors tracking-tight">
                  {project.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex items-center gap-3 pt-2 text-sm font-bold text-emerald-500">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  {project.metric}
                </div>

                <div className="pt-6 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                    {activeProject + 1} / {featuredProjects.length}
                  </span>
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-primary font-bold text-sm hover:underline flex items-center gap-3 uppercase tracking-widest"
                  >
                    Case Study <ExternalLink size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={goPrev}
              className="p-3 rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 text-slate-500 hover:text-primary hover:border-primary/40 transition-all shadow-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {featuredProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveProject(i)}
                  className={`rounded-full transition-all duration-300 ${i === activeProject
                    ? "bg-primary w-6 h-2"
                    : "bg-slate-300 dark:bg-slate-700 w-2 h-2"
                    }`}
                />
              ))}
            </div>
            <button
              onClick={goNext}
              className="p-3 rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 text-slate-500 hover:text-primary hover:border-primary/40 transition-all shadow-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
