import { motion } from "motion/react";
import {
  Code,
  Database,
  BarChart3,
  ArrowRight,
  Download,
  Mail,
  ExternalLink,
  PieChart,
  Activity,
} from "lucide-react";

interface HeroProps {
  onNavigate: (page: string) => void;
}

export const Home = ({ onNavigate }: HeroProps) => {
  const toolkit = [
    { name: "Python", icon: <Code size={28} />, label: "Data Analysis" },
    { name: "SQL", icon: <Database size={28} />, label: "Database Management" },
    {
      name: "Docker",
      icon: <BarChart3 size={28} />,
      label: "Containerization",
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="space-y-16 pb-32"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-primary/20 p-10 md:p-16 text-center shadow-2xl">
        <div className="absolute inset-0 opacity-10 pointer-events-none data-grid-bg"></div>
        <div className="absolute top-0 left-0 w-full scanner-line opacity-20"></div>

        <div className="relative z-10 space-y-8">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 p-1.5 px-4 bg-primary/10 border border-primary/20 text-primary rounded-full text-[10px] font-bold tracking-[0.3em] uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            System Status: Operational
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold leading-[0.9] text-white tracking-tighter"
          >
            BSc in Data Analysis | <br />
            <span className="text-primary text-glow">
              Extracting Value from Data
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed font-medium"
          >
            Hi, I'm Fazlur Rahman. I'm a Data Analysis student at the University
            of Messina, specializing in environmental data analysis, IoT
            pipelines, and secure transaction systems.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-primary-dark text-slate-900 font-bold py-5 px-10 rounded-2xl transition-all shadow-xl shadow-primary/20 text-sm flex items-center justify-center gap-3"
            >
              <Download size={20} />
              Download Resume
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-primary/50 text-white font-bold py-5 px-10 rounded-2xl transition-all text-sm flex items-center justify-center gap-3"
            >
              <Mail size={20} />
              Let's Connect
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Technical Toolkit */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-primary/10 pb-4">
          <h2 className="text-2xl font-bold tracking-tight font-mono uppercase italic text-primary">
            Technical Toolkit
          </h2>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            Core Expertise
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {toolkit.map((item, idx) => (
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
              <span className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mt-2 font-bold">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Project Preview */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-primary/10 pb-4">
          <h2 className="text-2xl font-bold tracking-tight font-mono uppercase italic text-primary">
            Featured Project
          </h2>
          <button
            onClick={() => onNavigate("projects")}
            className="text-xs font-bold text-primary flex items-center gap-2 hover:underline group uppercase tracking-widest"
          >
            View all{" "}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="group relative overflow-hidden bg-white dark:bg-card-dark rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl transition-all"
        >
          <div className="h-80 w-full bg-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center p-16 opacity-20">
              <div className="w-full h-full flex items-end gap-4">
                {[50, 75, 100, 33, 66].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                    className="flex-1 bg-primary rounded-t-lg"
                  />
                ))}
              </div>
            </div>
            <img
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-110 transition-transform duration-1000"
              src="https://picsum.photos/seed/data1/1200/800"
              alt="Data visualization dashboard"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-8 left-8 z-20 flex gap-4">
              <span className="px-4 py-1.5 bg-slate-900/80 backdrop-blur-md border border-white/10 text-primary text-[10px] font-bold rounded-xl uppercase tracking-widest">
                Python
              </span>
              <span className="px-4 py-1.5 bg-slate-900/80 backdrop-blur-md border border-white/10 text-primary text-[10px] font-bold rounded-xl uppercase tracking-widest">
                Data Analysis
              </span>
            </div>
          </div>

          <div className="p-10 space-y-6">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors tracking-tight">
              Weather Forecast Research
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
              Analysing environmental data from Copernicus Climate Data Store
              for Milan air quality. Performing correlation analysis between
              temperature and pollutants using Python.
            </p>

            <div className="pt-8 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 border-4 border-white dark:border-card-dark flex items-center justify-center">
                  <Activity size={20} className="text-primary" />
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 border-4 border-white dark:border-card-dark flex items-center justify-center">
                  <PieChart size={20} className="text-primary" />
                </div>
              </div>
              <button
                onClick={() => onNavigate("project-detail")}
                className="text-primary font-bold text-sm hover:underline flex items-center gap-3 uppercase tracking-[0.2em]"
              >
                Case Study <ExternalLink size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};
