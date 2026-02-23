import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowLeft, Briefcase, Calendar, MapPin, ExternalLink, ChevronRight, Building2, FlaskConical, Code2, Database } from "lucide-react";

interface ExperienceProps {
    onBack: () => void;
}

export const Experience = ({ onBack }: ExperienceProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const experiences = [
        {
            company: "University of Messina",
            role: "Research Intern — Data Analyst",
            period: "Jun 2025 — Present",
            location: "Messina, Italy",
            type: "Internship",
            icon: <FlaskConical size={24} />,
            color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
            desc: "Working under the supervision of a professor to extract and analyze environmental data.",
            tasks: [
                "Extracted 6 years of Copernicus climate data for the city of Milan.",
                "Performed correlation analysis between temperature variations and pollutant concentrations.",
                "Analyzed the impact of COVID-19 lockdowns on urban air quality trends.",
                "Developed automated data cleaning pipelines using Python and Pandas."
            ],
            skills: ["Python", "Pandas", "Matplotlib", "Data Analysis", "Copernicus API"]
        },
        {
            company: "Circular Protocol",
            role: "Web Developer Intern",
            period: "Oct 2024 — Dec 2024",
            location: "Remote / Messina, Italy",
            type: "Internship",
            icon: <Code2 size={24} />,
            color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
            desc: "Contributed to the development of decentralized applications and NFT platforms.",
            tasks: [
                "Developed GeNFT, a platform for minting NFTs with IPFS storage integration.",
                "Implemented wallet connectivity and CRIX coin transaction handling.",
                "Built responsive front-end components using modern web technologies.",
                "Collaborated on blockchain-backed transaction systems using PHP and Web3.php."
            ],
            skills: ["PHP", "Web3.php", "JavaScript", "IPFS", "Blockchain"]
        },
        {
            company: "University Projects",
            role: "Data Pipeline Architect",
            period: "2023 — 2024",
            location: "Messina, Italy",
            type: "Academic",
            icon: <Database size={24} />,
            color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
            desc: "Designed and implemented various data-centric systems as part of the BSc curriculum.",
            tasks: [
                "Built an IoT Energy Management System using Docker Compose and Python.",
                "Designed a multi-database sensor collection system (MySQL, MongoDB, Neo4j).",
                "Implemented real-time anomaly detection for industrial sensor streams.",
                "Simulated AODV routing protocols using NetworkX for graph analysis."
            ],
            skills: ["Docker", "MySQL", "MongoDB", "Neo4j", "MQTT", "NetworkX"]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-16 pb-40"
        >
            {/* Header */}
            <header className="space-y-8">
                <motion.button
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold uppercase tracking-widest text-xs transition-colors"
                >
                    <ArrowLeft size={16} /> Back to Home
                </motion.button>

                <div className="space-y-4 border-l-4 border-primary pl-6">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">Professional Experience</h1>
                    <p className="text-slate-500 text-xl max-w-2xl leading-relaxed">
                        A timeline of my internships, academic research, and technical roles in the field of data analysis and web development.
                    </p>
                </div>
            </header>

            {/* Experience Timeline */}
            <div ref={containerRef} className="relative space-y-12">
                {/* Continuous Vertical Line (Desktop) */}
                <div className="absolute left-8 top-8 bottom-8 w-px bg-slate-200 dark:bg-white/5 hidden md:block" />

                {/* Glowing Progress Line (Desktop) */}
                <motion.div
                    style={{
                        scaleY,
                        originY: 0
                    }}
                    className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-primary/40 via-primary to-primary/40 shadow-[0_0_20px_rgba(17,180,212,0.4)] hidden md:block z-0 opacity-60"
                />

                {experiences.map((exp, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className="group relative z-10"
                    >
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Icon & Type */}
                            <div className="flex-shrink-0 flex flex-row md:flex-col items-center gap-4">
                                <div className="relative z-10 bg-slate-50 dark:bg-background-dark rounded-2xl">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-lg transition-transform group-hover:scale-110 ${exp.color}`}>
                                        {exp.icon}
                                    </div>
                                </div>
                                <div className="md:hidden flex flex-col">
                                    <h3 className="text-xl font-bold tracking-tight">{exp.company}</h3>
                                    <p className="text-primary text-sm font-bold">{exp.role}</p>
                                </div>
                            </div>

                            {/* Content Card */}
                            <div className="flex-1 bg-white dark:bg-card-dark rounded-[2.5rem] p-8 md:p-10 border border-slate-200 dark:border-white/5 shadow-xl group-hover:border-primary/30 transition-all">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                    <div className="hidden md:block space-y-1">
                                        <h3 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">{exp.company}</h3>
                                        <p className="text-primary text-lg font-bold">{exp.role}</p>
                                    </div>

                                    <div className="flex flex-col md:items-end gap-2">
                                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                            <Calendar size={14} />
                                            {exp.period}
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                            <MapPin size={14} />
                                            {exp.location}
                                        </div>
                                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mt-2 ${exp.color}`}>
                                            {exp.type}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8 font-medium">
                                    {exp.desc}
                                </p>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <ChevronRight size={14} className="text-primary" />
                                            Key Responsibilities
                                        </h4>
                                        <ul className="space-y-3">
                                            {exp.tasks.map((task, j) => (
                                                <li key={j} className="flex items-start gap-3 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
                                                    {task}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <ChevronRight size={14} className="text-primary" />
                                            Technologies Used
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {exp.skills.map((skill, j) => (
                                                <span key={j} className="px-3 py-1.5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Featured Achievement */}
            <motion.section
                variants={itemVariants}
                className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-primary/20 p-12 md:p-16 text-center shadow-2xl"
            >
                <div className="absolute inset-0 opacity-10 pointer-events-none data-grid-bg"></div>
                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 p-1.5 px-4 bg-primary/10 border border-primary/20 text-primary rounded-full text-[10px] font-bold tracking-[0.3em] uppercase">
                        <Building2 size={14} />
                        Academic Excellence
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">BSc in Data Analysis</h3>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Currently maintaining a strong academic record at the University of Messina, focusing on statistical modeling, database management, and machine learning. Expected graduation: July 2026.
                    </p>
                    <div className="pt-6">
                        <button className="px-10 py-4 bg-primary text-slate-900 font-bold rounded-2xl hover:scale-105 transition-transform flex items-center gap-3 mx-auto">
                            View Academic Transcript <ExternalLink size={18} />
                        </button>
                    </div>
                </div>
            </motion.section>
        </motion.div>
    );
};
