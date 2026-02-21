import { motion } from "motion/react";
import {
  ArrowLeft,
  Download,
  MapPin,
  GraduationCap,
  Award,
  TrendingUp,
} from "lucide-react";

interface AboutProps {
  onBack: () => void;
}

export const About = ({ onBack }: AboutProps) => {
  const skills = [
    "Python",
    "SQL",
    "PHP",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Docker",
    "Git",
    "MQTT",
    "Ethereum",
    "Web3.php",
  ];

  const education = [
    {
      degree: "BSc in Data Analysis",
      school: "University of Messina, Italy",
      year: "Expected Oct 2025",
    },
  ];

  const languages = [
    "English (Fluent)",
    "Bengali (Native)",
    "Hindi (Fluent)",
    "Italian (Intermediate)",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        className="flex flex-col items-center text-center space-y-8"
      >
        <div className="relative">
          <div className="w-48 h-48 rounded-full border-4 border-primary/20 p-1.5 shadow-2xl">
            <img
              src="https://picsum.photos/seed/fazlur/400/400"
              alt="Fazlur Rahman"
              className="w-full h-full rounded-full object-cover"
              referrerPolicy="no-referrer"
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

        <div className="space-y-3">
          <h1 className="text-5xl font-bold tracking-tighter">Fazlur Rahman</h1>
          <p className="text-primary text-xl font-bold uppercase tracking-widest">
            Data Analyst & Storyteller
          </p>
          <div className="flex items-center justify-center gap-2 text-slate-500 text-base font-medium">
            <MapPin size={18} />
            <span>Messina, Italy</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary hover:bg-primary-dark text-slate-900 font-bold py-5 px-12 rounded-2xl transition-all shadow-2xl shadow-primary/20 flex items-center gap-4 text-lg"
        >
          <Download size={24} />
          Download Resume
        </motion.button>
      </motion.section>

      {/* Bio */}
      <motion.section variants={itemVariants} className="space-y-8">
        <h3 className="text-3xl font-bold flex items-center gap-4 tracking-tight">
          <TrendingUp className="text-primary" />
          My Journey
        </h3>
        <div className="space-y-6 text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          <p>
            I am a dedicated{" "}
            <span className="text-primary font-bold">
              Data Analysis student
            </span>{" "}
            at the University of Messina with a passion for uncovering insights
            from complex environmental and industrial datasets.
          </p>
          <p>
            My experience ranges from analyzing air quality data for the
            Copernicus Climate Data Store to building secure blockchain
            transaction systems. I bridge the gap between{" "}
            <span className="text-primary font-bold">
              technical implementation
            </span>{" "}
            and data-driven decision making.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-6">
          {skills.map((skill) => (
            <motion.span
              key={skill}
              whileHover={{
                scale: 1.1,
                backgroundColor: "var(--color-primary)",
                color: "var(--color-ink)",
              }}
              className="px-6 py-2.5 bg-primary/5 text-primary text-xs font-bold rounded-xl border border-primary/20 uppercase tracking-[0.2em] transition-colors cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.section>

      {/* Education */}
      <motion.section
        variants={itemVariants}
        className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-12 space-y-10 shadow-2xl"
      >
        <h3 className="text-3xl font-bold flex items-center gap-4 text-white tracking-tight">
          <GraduationCap className="text-primary" />
          Education
        </h3>
        <div className="grid gap-8">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 10 }}
              className="flex gap-8 p-8 bg-slate-800/50 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors"
            >
              <div className="flex-1">
                <p className="text-white font-bold text-2xl tracking-tight">
                  {edu.degree}
                </p>
                <p className="text-slate-400 text-lg">
                  {edu.school} • {edu.year}
                </p>
              </div>
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
        <div className="grid gap-6">
          {languages.map((lang, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(17, 180, 212, 0.4)",
              }}
              className="flex items-center gap-6 p-6 bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-white/5 transition-all shadow-xl"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Award size={28} />
              </div>
              <span className="text-slate-700 dark:text-slate-200 font-bold text-lg tracking-tight">
                {lang}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};
