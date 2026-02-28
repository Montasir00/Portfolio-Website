import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import {
  ArrowLeft,
  Download,
  MapPin,
  GraduationCap,
  Award,
  BookOpen,
  Cpu,
  FlaskConical,
  CheckCircle2,
  Linkedin,
  Building2,
  Pencil,
} from "lucide-react";

interface AboutProps {
  onBack: () => void;
}

export const About = ({ onBack }: AboutProps) => {
  const journeyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const skillCategories = [
    {
      label: "Data & Analysis",
      color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      accent: "border-cyan-500",
      skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Jupyter", "EDA", "Feature Engineering"],
    },
    {
      label: "Machine Learning & AI",
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      accent: "border-purple-500",
      skills: ["scikit-learn", "OpenCV", "Keras", "TensorFlow", "Random Forest", "Computer Vision"],
    },
    {
      label: "Web & Backend",
      color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      accent: "border-emerald-500",
      skills: ["PHP", "Django", "JavaScript", "HTML", "CSS", "Nginx"],
    },
    {
      label: "Databases",
      color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      accent: "border-amber-500",
      skills: ["SQL", "MySQL", "MongoDB", "Neo4j"],
    },
    {
      label: "DevOps & Tools",
      color: "bg-rose-500/10 text-rose-500 border-rose-500/20",
      accent: "border-rose-500",
      skills: ["Docker", "Docker Compose", "Git", "NetworkX"],
    },
  ];

  const languages = [
    { name: "English", level: "Fluent", pct: 90 },
    { name: "Bengali", level: "Native", pct: 100 },
    { name: "Hindi", level: "Fluent", pct: 85 },
    { name: "Urdu", level: "Fluent", pct: 80 },
    { name: "Italian", level: "Intermediate", pct: 60 },
  ];

  const timeline = [
    {
      year: "2022",
      icon: <BookOpen size={20} />,
      title: "Moved to Italy",
      desc: "Left Bangladesh and relocated to Messina, Italy, immersing myself in a new culture and language.",
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    },
    {
      year: "2022",
      icon: <GraduationCap size={20} />,
      title: "Enrolled — BSc Data Analysis",
      desc: "Started the Bachelor's Degree in Computer Science and Data Analysis at the University of Messina.",
      color: "bg-primary/10 text-primary border-primary/20",
    },
    {
      year: "2023",
      icon: <Cpu size={20} />,
      title: "First Major Project",
      desc: "Built a Blockchain-backed crypto transaction platform using PHP, Ethereum, and the Ganache test network.",
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    },
    {
      year: "Oct 2024",
      icon: <FlaskConical size={20} />,
      title: "Internship — Circular Protocol",
      desc: "Web Developer intern at Circular Protocol. Built GeNFT, an NFT minting platform with IPFS storage, wallet integration, and CRIX coin transactions.",
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    },
    {
      year: "Jun 2025",
      icon: <Award size={20} />,
      title: "Research Internship — University of Messina",
      desc: "Data Analyst intern under a professor. Extracted and analysed 6 years of Copernicus climate data for Milan — temperature vs pollutants, COVID impact.",
      color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    },
    {
      year: "Jul 2026 →",
      icon: <CheckCircle2 size={20} />,
      title: "Graduating & Levelling Up",
      desc: "Expecting to graduate in July 2026. Currently exploring Machine Learning and building my portfolio for MSc applications.",
      color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      current: true,
    },
  ];

  const learning = [
    { topic: "Machine Learning (scikit-learn)", pct: 55 },
    { topic: "Advanced SQL & Query Optimization", pct: 70 },
    { topic: "Italian Language", pct: 60 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="pb-40 space-y-16"
    >
      {/* Header */}
      <div className="flex items-center gap-6">
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="p-3 hover:bg-primary/10 rounded-2xl transition-colors text-slate-600 dark:text-slate-300"
        >
          <ArrowLeft size={24} />
        </motion.button>
        <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
      </div>

      {/* Profile */}
      <motion.section
        variants={itemVariants}
        className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16"
      >
        <div className="relative flex-shrink-0">
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-primary/20 p-1.5 shadow-2xl">
            <img
              src={`${import.meta.env.BASE_URL}assets/images/profile.svg`}
              alt="Fazlur Rahman — Data Analyst"
              className="w-full h-full rounded-full object-cover"
              loading="lazy"
            />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -bottom-2 -right-2 bg-primary text-slate-900 p-3 rounded-2xl shadow-xl shadow-primary/20"
          >
            <Award size={24} />
          </motion.div>
        </div>

        <div className="space-y-6 text-center md:text-left flex-1">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Fazlur Rahman
            </h1>
            <p className="text-primary text-xl md:text-2xl font-bold uppercase tracking-widest">
              Data Analyst & Storyteller
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 text-base font-medium">
              <MapPin size={18} />
              <span>Messina, Italy</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.a
              href={`${import.meta.env.BASE_URL}assets/resume.pdf`}
              download="Fazlur_Rahman_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-primary-dark text-slate-900 font-bold py-5 px-10 rounded-2xl transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-4 text-base"
            >
              <Download size={22} />
              Download Resume
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/fazlur-rahman007/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-slate-900 font-bold py-5 px-10 rounded-2xl transition-all flex items-center justify-center gap-4 text-base"
            >
              <Linkedin size={22} />
              LinkedIn Profile
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Journey Timeline */}
      <motion.section variants={itemVariants} className="space-y-8">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight">My Journey</h3>
        <div ref={journeyRef} className="relative">
          {/* Vertical line (Background) */}
          <div className="absolute left-6 md:left-8 top-4 bottom-4 w-px bg-slate-200 dark:bg-white/5 ml-px" />

          {/* Glowing Progress Line */}
          <motion.div
            style={{
              scaleY,
              originY: 0
            }}
            className="absolute left-6 md:left-8 top-4 bottom-4 w-px bg-gradient-to-b from-primary/40 via-primary to-primary/40 shadow-[0_0_20px_rgba(17,180,212,0.4)] z-0 opacity-60 ml-px"
          />

          <div className="space-y-8 md:space-y-6">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-start gap-4 md:gap-6 group relative z-10"
              >
                {/* Icon (Always visible) */}
                <div className="relative z-10 bg-slate-50 dark:bg-background-dark rounded-xl md:rounded-2xl mt-1 md:mt-0 flex-shrink-0">
                  <div
                    className={`flex w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl items-center justify-center border ${item.color} shadow-lg transition-transform group-hover:scale-110`}
                  >
                    {/* Scale down the SVG slightly on mobile */}
                    <div className="scale-75 md:scale-100 flex items-center justify-center">{item.icon}</div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`w-full flex-1 p-5 md:p-6 rounded-2xl border ${item.current ? "bg-primary/5 border-primary/20" : "bg-white dark:bg-card-dark border-slate-200 dark:border-white/5"} shadow-lg`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h4 className="font-bold text-lg md:text-xl tracking-tight">
                      {item.title}
                    </h4>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${item.color}`}
                    >
                      {item.year}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                  {item.current && (
                    <div className="flex items-center gap-2 mt-4 text-primary text-xs font-bold uppercase tracking-widest">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                      </span>
                      Currently Here
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Currently Learning */}
      <motion.section
        variants={itemVariants}
        className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-10 md:p-12 space-y-8 shadow-2xl"
      >
        <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-4">
          <FlaskConical className="text-primary" />
          Currently Learning
        </h3>
        <div className="space-y-6">
          {learning.map((item, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-slate-300">{item.topic}</span>
                <span className="text-primary">{item.pct}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(17,180,212,0.6)]"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section variants={itemVariants} className="space-y-8">
        <h3 className="text-3xl font-bold tracking-tight">Technical Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.label}
              className={`p-6 bg-white dark:bg-card-dark rounded-2xl border-l-4 ${cat.accent} border border-slate-200 dark:border-white/5 shadow-lg space-y-4`}
            >
              <p className={`text-xs font-bold uppercase tracking-widest ${cat.color.split(" ")[1]}`}>
                {cat.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.08 }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border uppercase tracking-wider cursor-default transition-colors ${cat.color}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Education */}
      <motion.section
        variants={itemVariants}
        className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 md:p-12 space-y-8 shadow-2xl"
      >
        <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-4 text-white tracking-tight">
          <GraduationCap className="text-primary" />
          Education
        </h3>
        <div className="space-y-4">
          {([
            {
              degree: "BSc in Data Analysis",
              school: "University of Messina, Italy",
              period: "2022 — Expected Jul 2026",
              icon: <GraduationCap size={19} />,
              current: true,
            },
            {
              degree: "College (Higher Secondary)",
              school: "CDA Public School & College, Bangladesh",
              period: "2018 — 2020",
              icon: <Building2 size={19} />,
            },
            {
              degree: "Secondary School Certificate",
              school: "Secondary High School, Bangladesh",
              period: "2014 — 2018",
              icon: <BookOpen size={19} />,
            },
            {
              degree: "Primary School",
              school: "Ankur Society School, Nasirabad, Bangladesh",
              period: "Until 2014",
              icon: <Pencil size={19} />,
            },
          ]).map((edu, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 8 }}
              className={`flex flex-col sm:flex-row items-start gap-4 sm:gap-5 p-5 md:p-6 rounded-2xl border transition-colors ${edu.current
                ? "bg-primary/10 border-primary/30"
                : "bg-slate-800/50 border-white/5 hover:border-primary/20"
                }`}
            >
              <div className="flex w-full items-start justify-between sm:justify-start gap-4">
                <div className={`flex-shrink-0 p-2.5 rounded-xl border ${edu.current ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-slate-400 border-white/10"}`}>
                  {edu.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-base md:text-lg tracking-tight">{edu.degree}</p>
                  <p className="text-slate-400 text-xs md:text-sm mt-0.5">{edu.school}</p>
                </div>
                <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex-shrink-0 sm:hidden ${edu.current
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-white/5 text-slate-400 border border-white/10"
                  }`}>
                  {edu.period}
                </span>
              </div>
              <span className={`hidden sm:inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex-shrink-0 ${edu.current
                ? "bg-primary/20 text-primary border border-primary/30"
                : "bg-white/5 text-slate-400 border border-white/10"
                }`}>
                {edu.period}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Languages */}
      <motion.section variants={itemVariants} className="space-y-8">
        <h3 className="text-3xl font-bold flex items-center gap-4 tracking-tight">
          <Award className="text-primary" />
          Languages
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {languages.map((lang, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-white/5 shadow-xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg tracking-tight">
                  {lang.name}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  {lang.level}
                </span>
              </div>
              <div className="h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 1, ease: "easeOut" }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};
