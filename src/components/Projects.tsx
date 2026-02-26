import { motion, AnimatePresence } from "motion/react";
import { Search, ExternalLink } from "lucide-react";
import { useState } from "react";
import { PROJECTS_METADATA } from "../constants/projects";

interface ProjectsProps {
  onNavigate: (page: string) => void;
  onProjectSelect: (projectId: number) => void;
}

export const Projects = ({ onNavigate, onProjectSelect }: ProjectsProps) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = ["All", "Data Science", "Web Dev", "ML", "Database", "Game"];

  const projects = Object.values(PROJECTS_METADATA);

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeFilter === "All" || p.category === activeFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(searchLower) ||
      p.desc.toLowerCase().includes(searchLower) ||
      p.tags.some((tag) => tag.toLowerCase().includes(searchLower));
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="space-y-16 pb-32"
    >
      <div className="space-y-4 border-l-4 border-primary pl-4 md:pl-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Project Gallery</h2>
        <p className="text-slate-500 text-base md:text-lg">
          {projects.length} projects — everything I've built, researched, and shipped.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-6">
        <div className="relative group">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
            size={22}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or tools..."
            className="w-full pl-14 pr-6 py-5 bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[2rem] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-xl"
          />
        </div>

        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 md:px-8 py-2.5 md:py-3 rounded-2xl text-[10px] md:text-xs font-bold transition-all whitespace-nowrap uppercase tracking-widest ${activeFilter === filter
                ? "bg-primary text-slate-900 shadow-xl shadow-primary/30"
                : "bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 text-slate-500 hover:border-primary/50"
                }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
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
              onClick={() => onProjectSelect(project.id)}
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
              <div className="p-6 md:p-8 space-y-4">
                <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors tracking-tight">
                  {project.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base line-clamp-2 leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-primary/10 text-primary text-[9px] font-bold rounded-lg tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {"github" in project && project.github && (
                    <a
                      href={project.github as string}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-shrink-0 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest"
                    >
                      <ExternalLink size={12} />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
