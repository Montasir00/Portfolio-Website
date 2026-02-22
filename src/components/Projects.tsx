import { motion, AnimatePresence } from "motion/react";
import { Search, ExternalLink } from "lucide-react";
import { useState } from "react";

interface ProjectsProps {
  onNavigate: (page: string) => void;
}

export const Projects = ({ onNavigate }: ProjectsProps) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Data Science", "Web Dev", "ML", "Database", "Game"];

  const projects = [
    {
      id: 1,
      title: "Weather Forecast Data Collection",
      desc: "Multi-source environmental data pipeline collecting air quality and weather data for Milan from the Copernicus Climate Change Service API. Includes time-series analysis and trend visualisation with Pandas and Matplotlib.",
      tags: ["PYTHON", "PANDAS", "MATPLOTLIB", "COPERNICUS API"],
      category: "Data Science",
      img: "https://picsum.photos/seed/weather2/800/450",
      github: "https://github.com/Montasir00/Multi-Input-Data-Collection-for-Weather-Forecast-Predictions",
    },
    {
      id: 2,
      title: "Bloom & Basket — E-Commerce Platform",
      desc: "Full-stack e-commerce site built with PHP, MySQL, and Nginx, containerised with Docker Compose. Features multi-factor authentication via Telegram Bot API OTP, CSRF protection, product management, and an admin dashboard.",
      tags: ["PHP", "MYSQL", "DOCKER", "NGINX", "TELEGRAM API"],
      category: "Web Dev",
      img: "https://picsum.photos/seed/ecommerce2/800/450",
      github: "https://github.com/Montasir00/web_development",
    },
    {
      id: 3,
      title: "ML Final Project — Predictive Modelling",
      desc: "End-to-end machine learning pipeline covering EDA, feature engineering, statistical testing (Chi-Square, T-tests), and a tuned Random Forest classifier. Visualisations include correlation heatmaps, boxplots, and ROC curves.",
      tags: ["PYTHON", "SCIKIT-LEARN", "PANDAS", "RANDOM FOREST"],
      category: "ML",
      img: "https://picsum.photos/seed/mlproject/800/450",
      github: "https://github.com/Montasir00/Ml_final_project",
    },
    {
      id: 4,
      title: "Dune Ball Game",
      desc: "Interactive Python game demonstrating all four OOP pillars — abstraction, inheritance, encapsulation, and polymorphism — in a clean, playable game environment. Built to explore software design patterns through game architecture.",
      tags: ["PYTHON", "OOP", "GAME DEV"],
      category: "Game",
      img: "https://picsum.photos/seed/dunegame/800/450",
      github: "https://github.com/Montasir00/Dune_Ball_Game",
    },
    {
      id: 5,
      title: "IoT Sensor Data Collection System",
      desc: "Multi-database IoT pipeline that ingests real-time sensor data via HiveMQ MQTT broker and persists it across MySQL, MongoDB, and Neo4j — all orchestrated in Docker. Designed to compare relational, document, and graph data models on the same dataset.",
      tags: ["DOCKER", "MYSQL", "MONGODB", "NEO4J", "MQTT"],
      category: "Database",
      img: "https://picsum.photos/seed/iotdb/800/450",
      github: "https://github.com/Montasir00/database_project",
    },
    {
      id: 6,
      title: "Blockchain Transaction System",
      desc: "Crypto trading platform supporting live ETH transactions on the Ganache test network via Web3.php. Features a multi-factor login system, transaction history, and a clean PHP/MySQL backend.",
      tags: ["PHP", "ETHEREUM", "WEB3.PHP", "MYSQL", "MFA"],
      category: "Web Dev",
      img: "https://picsum.photos/seed/blockchain2/800/450",
      github: "https://github.com/Montasir00/Blockchain-Transaction-System-with-Multi-Factor-Login",
    },
    {
      id: 7,
      title: "Hand Gesture Recognition",
      desc: "Real-time hand gesture classifier using a webcam feed. A CNN model trained with Google's Teachable Machine is loaded via Keras, and OpenCV handles live frame capture and classification overlays.",
      tags: ["PYTHON", "OPENCV", "KERAS", "TENSORFLOW", "CNN"],
      category: "ML",
      img: "https://picsum.photos/seed/gesture/800/450",
      github: "https://github.com/Montasir00/hand-gesture-recognition",
    },
    {
      id: 8,
      title: "Energy Management System",
      desc: "Real-time IoT data pipeline built with Python, Docker Compose, and MQTT for continuous sensor data ingestion and analytics. Includes automated anomaly detection and persistent storage in MySQL.",
      tags: ["PYTHON", "DOCKER", "MQTT", "MYSQL"],
      category: "Data Science",
      img: "https://picsum.photos/seed/energy2/800/450",
      github: "https://github.com/Montasir00/energy_management_system",
    },
    {
      id: 9,
      title: "Wiki Encyclopedia",
      desc: "Django-based web app where users can create, edit, browse, and search encyclopedia entries written in Markdown. Includes random page navigation and full Markdown-to-HTML rendering.",
      tags: ["DJANGO", "PYTHON", "MARKDOWN", "HTML"],
      category: "Web Dev",
      img: "https://picsum.photos/seed/wiki/800/450",
      github: "https://github.com/Montasir00/Wiki-Encyclopedia",
    },
    {
      id: 10,
      title: "AODV Routing Simulation",
      desc: "Python simulation of the Ad-hoc On-Demand Distance Vector (AODV) routing protocol using NetworkX. Visualises dynamic route discovery, routing tables, and network topology changes in real time.",
      tags: ["PYTHON", "NETWORKX", "GRAPH ALGORITHMS", "NETWORKING"],
      category: "Data Science",
      img: "https://picsum.photos/seed/network/800/450",
      github: "https://github.com/Montasir00/AODV-Ad-hoc-On-Demand-Distance-Vector-routing-simulation",
    },
    {
      id: 11,
      title: "Data Science Notebook",
      desc: "Collection of Jupyter notebooks covering core data science topics: data cleaning, EDA, statistical analysis, and visualisation. Used as a personal learning and reference repository.",
      tags: ["PYTHON", "JUPYTER", "PANDAS", "MATPLOTLIB"],
      category: "Data Science",
      img: "https://picsum.photos/seed/notebook/800/450",
      github: "https://github.com/Montasir00/datascience-notebook",
    },
    {
      id: 12,
      title: "Echo Search — Google Clone",
      desc: "Pixel-perfect recreation of the Google Search, Image Search, and Advanced Search interfaces, built as a CS50W assignment. Demonstrates semantic HTML, CSS specificity, and form handling.",
      tags: ["HTML", "CSS", "JAVASCRIPT"],
      category: "Web Dev",
      img: "https://picsum.photos/seed/search/800/450",
      github: "https://github.com/Montasir00/Echo_Search",
    },
    {
      id: 13,
      title: "SQL Analytics Project",
      desc: "Structured SQL project exploring query optimisation, joins, aggregations, subqueries, and indexing strategies on a relational dataset. Focus on analytical query patterns and performance.",
      tags: ["SQL", "DATABASE", "ANALYTICS"],
      category: "Database",
      img: "https://picsum.photos/seed/sqlproject/800/450",
      github: "https://github.com/Montasir00/sql_project",
    },
    {
      id: 14,
      title: "MindHack",
      desc: "Python exploration project. A personal experimental repository used to prototype ideas and test concepts outside of structured coursework.",
      tags: ["PYTHON"],
      category: "Data Science",
      img: "https://picsum.photos/seed/mindhack/800/450",
      github: "https://github.com/Montasir00/MindHack",
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

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
      <div className="space-y-4 border-l-4 border-primary pl-6">
        <h2 className="text-4xl font-bold tracking-tight">Project Gallery</h2>
        <p className="text-slate-500 text-lg">
          14 projects — everything I've built, researched, and shipped.
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
            placeholder="Search projects or tools..."
            className="w-full pl-14 pr-6 py-5 bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-[2rem] focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-xl"
          />
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap uppercase tracking-widest ${activeFilter === filter
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
              onClick={() => onNavigate("project-detail")}
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
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors tracking-tight">
                  {project.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-base line-clamp-2 leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg tracking-widest"
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
                      className="flex-shrink-0 ml-4 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest"
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
