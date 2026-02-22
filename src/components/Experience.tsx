import { motion } from "motion/react";
import { Briefcase, Award, ExternalLink, Plus, MapPin, Calendar } from "lucide-react";

interface ExperienceProps {
    onBack: () => void;
}

export const Experience = ({ onBack }: ExperienceProps) => {
    const internships = [
        {
            company: "Circular Protocol",
            role: "Web Developer Intern",
            period: "Oct 2024 — Present",
            type: "Startup · Remote",
            color: "border-purple-500",
            badgeColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
            accentColor: "text-purple-400",
            bullets: [
                "Built GeNFT — an NFT minting and trading platform integrated with the CRIX coin ecosystem",
                "Implemented IPFS-based decentralised storage for NFT metadata and assets",
                "Developed wallet integration enabling users to connect crypto wallets and sign on-chain transactions",
                "Designed and built REST APIs for NFT creation, listing, and transaction history",
                "Owned end-to-end UI/UX design and front-end implementation of the platform",
            ],
            tags: ["WEB3", "IPFS", "NFT", "API", "UI/UX"],
        },
        {
            company: "University of Messina — Research Lab",
            role: "Data Analyst Intern",
            period: "Jun 2025 — Jul 2025",
            type: "Academic Research · Messina, Italy",
            color: "border-emerald-500",
            badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
            accentColor: "text-emerald-400",
            bullets: [
                "Extracted multi-year temperature and pollutant datasets (PM2.5, NO₂, O₃, CO, SO₂) from the Copernicus Climate Data Store for Milan (2018–2024)",
                "Conducted time-series analysis to quantify the statistical relationship between temperature variability and pollutant concentrations",
                "Identified and modelled the impact of COVID-19 lockdowns on air quality trends using pre/post-lockdown comparisons",
                "Produced data visualisations and a written report summarising findings for the supervising professor",
            ],
            tags: ["PYTHON", "PANDAS", "COPERNICUS API", "TIME-SERIES", "EDA"],
        },
    ];

    const certificates = [
        {
            title: "IBM Data Science Professional Certificate",
            issuer: "IBM / Coursera",
            year: "2024",
            desc: "10-course program covering data science methodology, Python, SQL, data visualisation, machine learning, and applied capstone projects.",
            link: "https://www.coursera.org/professional-certificates/ibm-data-science",
            color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
            badge: "🎖️",
        },
        // TODO: Add certificate 2
        // TODO: Add certificate 3
        // TODO: Add certificate 4
        // TODO: Add certificate 5
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16 pb-32"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="space-y-4 border-l-4 border-primary pl-6">
                <h2 className="text-4xl font-bold tracking-tight">Experience</h2>
                <p className="text-slate-500 text-lg">
                    Internships and certifications — proof of work beyond the classroom.
                </p>
            </motion.div>

            {/* Internships */}
            <motion.section variants={itemVariants} className="space-y-8">
                <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
                    <Briefcase className="text-primary" size={24} />
                    <h3 className="text-2xl font-bold tracking-tight font-mono uppercase italic text-primary">
                        Internships
                    </h3>
                    <span className="ml-auto text-xs font-bold text-slate-500 uppercase tracking-widest">
                        {internships.length} positions
                    </span>
                </div>

                <div className="space-y-8">
                    {internships.map((intern, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className={`bg-white dark:bg-card-dark rounded-[2rem] border border-slate-200 dark:border-white/5 border-l-4 ${intern.color} shadow-xl p-8 space-y-6`}
                        >
                            {/* Header row */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <h4 className="text-xl font-bold tracking-tight">{intern.role}</h4>
                                    <p className={`text-sm font-bold ${intern.accentColor}`}>{intern.company}</p>
                                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={11} />
                                            {intern.period}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin size={11} />
                                            {intern.type}
                                        </span>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${intern.badgeColor} uppercase tracking-widest self-start flex-shrink-0`}>
                                    {intern.period.includes("Present") ? "Current" : "Completed"}
                                </span>
                            </div>

                            {/* Bullets */}
                            <ul className="space-y-3">
                                {intern.bullets.map((b, j) => (
                                    <li key={j} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${intern.accentColor.replace("text-", "bg-")}`} />
                                        {b}
                                    </li>
                                ))}
                            </ul>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {intern.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg tracking-widest"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Certificates */}
            <motion.section variants={itemVariants} className="space-y-8">
                <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
                    <Award className="text-primary" size={24} />
                    <h3 className="text-2xl font-bold tracking-tight font-mono uppercase italic text-primary">
                        Certificates
                    </h3>
                    <span className="ml-auto text-xs font-bold text-slate-500 uppercase tracking-widest">
                        {certificates.length} earned · more in progress
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certificates.map((cert, i) => (
                        <motion.a
                            key={i}
                            href={cert.link}
                            target="_blank"
                            rel="noreferrer"
                            variants={itemVariants}
                            whileHover={{ y: -6, borderColor: "rgba(17,180,212,0.4)" }}
                            className="group flex flex-col gap-5 p-8 bg-white dark:bg-card-dark rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl transition-all cursor-pointer"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border ${cert.color} flex-shrink-0`}>
                                    {cert.badge}
                                </div>
                                <ExternalLink size={16} className="text-slate-300 group-hover:text-primary transition-colors mt-1 flex-shrink-0" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors leading-snug">
                                    {cert.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                    <span>{cert.issuer}</span>
                                    <span className="w-1 h-1 bg-slate-400 rounded-full" />
                                    <span>{cert.year}</span>
                                </div>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{cert.desc}</p>
                            <div className={`self-start px-4 py-1.5 rounded-full text-xs font-bold border ${cert.color} uppercase tracking-widest`}>
                                View Certificate →
                            </div>
                        </motion.a>
                    ))}

                    {/* Placeholder slots for upcoming certs */}
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={`placeholder-${i}`}
                            className="flex flex-col items-center justify-center gap-3 p-8 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-white/10 text-slate-400 min-h-[180px]"
                        >
                            <Plus size={24} className="opacity-30" />
                            <p className="text-xs font-bold uppercase tracking-widest text-center opacity-50">
                                Certificate in progress
                            </p>
                        </div>
                    ))}
                </div>
            </motion.section>
        </motion.div>
    );
};
