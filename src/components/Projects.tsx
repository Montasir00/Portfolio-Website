import { motion, AnimatePresence } from "motion/react";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

interface ProjectsProps {
  onNavigate: (page: string) => void;
}

export const Projects = ({ onNavigate }: ProjectsProps) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Data Science", "Web Dev", "ML", "Analytics"];

  const projects = [
    {
      id: 1,
      title: "Energy Management System",
      desc: "Built a real-time IoT data pipeline using Docker Compose and Python for continuous sensor analytics. Automated data ingestion and anomaly detection.",
      tags: ["PYTHON", "DOCKER", "MYSQL"],
      category: "Analytics",
      img: "https://picsum.photos/seed/energy/800/450"
    },
    {
      id: 2,
      title: "Blockchain Transaction System",
      desc: "Developed a crypto trading platform supporting on-chain ETH transactions via the Ganache test network with multi-factor authentication.",
      tags: ["PHP", "MYSQL", "ETHEREUM", "WEB3.PHP"],
      category: "Web Dev",
      img: "https://picsum.photos/seed/blockchain/800/450"
    },
    {
      id: 3,
      title: "Weather Forecast Research",
      desc: "Analysed environmental data from Copernicus Climate Data Store for Milan air quality. Conducted time-series analysis for trends.",
      tags: ["PYTHON", "DATA ANALYSIS"],
      category: "Data Science",
      img: "https://picsum.photos/seed/weather/800/450"
    }
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="space-y-12 pb-32"
    >
      <div className="space-y-4 border-l-4 border-primary pl-6">
        <h2 className="text-4xl font-bold tracking-tight">Project Gallery</h2>
        <p className="text-slate-500 text-lg">A curated collection of my recent work in data and development.</p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-6">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={22} />
          <input 
            type="text" 
            placeholder="Search projects or tools..."
            className="w-full pl-14 pr-6 py-5 bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[2rem] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-xl"
          />
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {filters.map(filter => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap uppercase tracking-widest ${
                activeFilter === filter 
                  ? "bg-primary text-slate-900 shadow-xl shadow-primary/30" 
                  : "bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 text-slate-500 hover:border-primary/50"
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{ y: -10 }}
              onClick={() => onNavigate('project-detail')}
              className="group cursor-pointer bg-white dark:bg-card-dark rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl transition-all"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 bg-primary/90 text-slate-900 text-[10px] font-bold px-4 py-1.5 rounded-xl uppercase tracking-widest shadow-xl">
                  {project.category}
                </div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors tracking-tight">{project.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-base line-clamp-2 leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
