import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  ArrowLeft,
  Share2,
  MoreVertical,
  AlertCircle,
  Gauge,
  Cloud,
  Github,
  BarChart,
  Code as CodeIcon,
  Activity,
  FileCode,
  Database as DbIcon,
  Terminal,
  Server,
  Cpu,
  Zap,
  Bell,
} from "lucide-react";

interface ProjectDetailProps {
  projectId: number | null;
  onBack: () => void;
}

const generateData = () => {
  const data = [];
  const now = new Date();
  for (let i = 20; i >= 0; i--) {
    data.push({
      time: new Date(now.getTime() - i * 5000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      light: Math.floor(Math.random() * 100) + 200,
      ac: Math.floor(Math.random() * 5) + 22,
      heater: Math.floor(Math.random() * 10) + 40,
    });
  }
  return data;
};

export const ProjectDetail = ({ projectId, onBack }: ProjectDetailProps) => {
  const [data, setData] = useState(generateData());
  const [alerts, setAlerts] = useState<string[]>([]);

  const projectsMetadata: Record<number, any> = {
    8: {
      title: "IoT Energy Management System",
      category: "Analytics",
      status: "Completed",
      overview: "Real-time IoT data pipeline built with Python, Docker Compose, and MQTT for continuous sensor data ingestion and analytics. Includes automated anomaly detection and persistent storage in MySQL.",
      problem: "Manual data handling and lack of real-time monitoring leading to delayed responses in industrial energy management.",
      problemDetail: "The challenge was to create a system that could ingest high-frequency sensor data, process it in real-time, and provide immediate alerts for anomalies without human intervention.",
      github: "https://github.com/Montasir00/energy_management_system",
      type: "iot"
    },
    1: {
      title: "Weather Forecast Data Collection",
      category: "Data Science",
      status: "Completed",
      overview: "Multi-source environmental data pipeline collecting air quality and weather data for Milan from the Copernicus Climate Change Service API. Includes time-series analysis and trend visualisation with Pandas and Matplotlib.",
      problem: "Accessing and harmonizing disparate environmental data sources for localized climate analysis.",
      problemDetail: "The challenge was to interface with the complex Copernicus API, handle large-scale environmental datasets, and transform them into a clean, queryable format for time-series analysis in Milan.",
      github: "https://github.com/Montasir00/Multi-Input-Data-Collection-for-Weather-Forecast-Predictions",
      type: "weather"
    },
    2: {
      title: "Bloom & Basket — E-Commerce Platform",
      category: "Web Dev",
      status: "Completed",
      overview: "Full-stack e-commerce site built with PHP, MySQL, and Nginx, containerised with Docker Compose. Features multi-factor authentication via Telegram Bot API OTP, CSRF protection, and an admin dashboard.",
      problem: "Building a secure, scalable e-commerce solution with modern authentication and containerized deployment.",
      problemDetail: "Implementing a custom MFA system using Telegram's API and ensuring full environment parity across development and production using Docker containers.",
      github: "https://github.com/Montasir00/web_development",
      type: "web"
    },
    3: {
      title: "ML Final Project — Predictive Modelling",
      category: "ML",
      status: "Completed",
      overview: "End-to-end machine learning pipeline covering EDA, feature engineering, statistical testing (Chi-Square, T-tests), and a tuned Random Forest classifier.",
      problem: "Identifying key predictors and building a high-accuracy model for complex datasets.",
      problemDetail: "The project involved rigorous data preprocessing, handling class imbalance, and optimizing hyperparameters to achieve a robust predictive model with clear interpretability.",
      github: "https://github.com/Montasir00/Ml_final_project",
      type: "ml"
    },
    4: {
      title: "Dune Ball Game",
      category: "Game",
      status: "Completed",
      overview: "Interactive Python game demonstrating all four OOP pillars — abstraction, inheritance, encapsulation, and polymorphism — in a clean, playable game environment.",
      problem: "Applying abstract software design patterns to a real-time interactive application.",
      problemDetail: "The goal was to build a game where every entity is an object, using inheritance for shared behaviors and polymorphism for dynamic interactions, all while maintaining 60 FPS performance.",
      github: "https://github.com/Montasir00/Dune_Ball_Game",
      type: "game"
    },
    5: {
      title: "IoT Sensor Data Collection System",
      category: "Database",
      status: "Completed",
      overview: "Multi-database IoT pipeline that ingests real-time sensor data via HiveMQ MQTT broker and persists it across MySQL, MongoDB, and Neo4j.",
      problem: "Comparing performance and data modeling across different database types for the same IoT dataset.",
      problemDetail: "The project explores how relational, document, and graph data models handle high-frequency sensor streams and which architecture is best for specific query patterns.",
      github: "https://github.com/Montasir00/database_project",
      type: "database"
    }
  };

  const project = projectsMetadata[projectId || 8] || projectsMetadata[8];

  useEffect(() => {
    if (project.type !== "iot" && project.type !== "weather") return;
    const interval = setInterval(() => {
      const newData = {
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        light: Math.floor(Math.random() * 100) + 200,
        ac: Math.floor(Math.random() * 5) + 22,
        heater: Math.floor(Math.random() * 10) + 40,
      };

      setData((prev) => [...prev.slice(1), newData]);

      // Simulate Watchdog Alert
      if (newData.heater > 48) {
        setAlerts((prev) => [
          `[${newData.time}] ALERT: Heater threshold exceeded (${newData.heater}°C)`,
          ...prev.slice(0, 4),
        ]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-primary/10 -mx-6 px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-3 hover:bg-primary/10 rounded-2xl transition-colors text-slate-600 dark:text-slate-300"
          >
            <ArrowLeft size={24} />
          </motion.button>
          <span className="font-bold text-xl tracking-tight">
            Project Detail
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 hover:bg-primary/10 rounded-2xl transition-colors text-slate-600 dark:text-slate-300">
            <Share2 size={22} />
          </button>
          <button className="p-3 hover:bg-primary/10 rounded-2xl transition-colors text-slate-600 dark:text-slate-300">
            <MoreVertical size={22} />
          </button>
        </div>
      </nav>

      <div className="space-y-16">
        {/* Hero Header */}
        <motion.header
          variants={itemVariants}
          className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/5"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
          <div className="absolute inset-0 data-grid-bg opacity-10 z-10"></div>
          <img
            src="https://picsum.photos/seed/smart-energy/1200/800"
            alt="Data dashboard"
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-0 left-0 p-10 md:p-16 z-20 w-full">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-primary/20 text-primary border border-primary/30 text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-[0.3em]">
                System Status: Active
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--color-primary)]"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[0.9] tracking-tighter">
              {project.title}
            </h1>
            <div className="flex items-center gap-12 mt-10 border-t border-white/10 pt-8">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.2em]">
                  Category
                </span>
                <span className="text-base text-primary font-bold">
                  {project.category}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.2em]">
                  Status
                </span>
                <span className="text-base text-emerald-500 font-bold">
                  {project.status}
                </span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Overview */}
        <motion.section
          variants={itemVariants}
          className="space-y-6 border-l-4 border-primary/30 pl-10"
        >
          <h2 className="text-primary font-bold uppercase tracking-widest text-xs">
            Overview
          </h2>
          <div className="space-y-8 text-2xl leading-relaxed text-slate-600 dark:text-slate-300 font-medium tracking-tight">
            <p>
              {project.overview}
            </p>
          </div>
        </motion.section>

        {/* Problem */}
        <motion.section
          variants={itemVariants}
          className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-12 md:p-16 space-y-8 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="flex flex-col md:flex-row items-start gap-10 relative z-10">
            <div className="bg-primary/20 p-5 rounded-2xl shadow-xl shadow-primary/10">
              <AlertCircle className="text-primary" size={40} />
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-white tracking-tight">
                The Problem
              </h2>
              <blockquote className="border-l-4 border-primary pl-8 italic text-slate-300 text-2xl leading-relaxed font-medium">
                "{project.problem}"
              </blockquote>
              <p className="text-slate-400 leading-relaxed text-lg">
                {project.problemDetail}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Methodology & Dashboard (Only for IoT Project) */}
        {project.type === "iot" && (
          <motion.section variants={itemVariants} className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-primary font-bold uppercase tracking-widest text-xs">
                Live Pipeline Monitoring
              </h2>
              <h3 className="text-4xl font-bold tracking-tight flex items-center gap-4">
                IoT Data Stream
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full uppercase tracking-widest border border-emerald-500/20 flex items-center gap-2">
                  Live Simulation
                </span>
              </h3>
            </div>

            {/* System Architecture Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              {[
                { name: "Publisher", icon: <Cpu />, status: "Running" },
                { name: "MQTT Broker", icon: <Activity />, status: "Active" },
                { name: "Subscriber", icon: <Terminal />, status: "Running" },
                { name: "MySQL", icon: <DbIcon />, status: "Connected" },
                { name: "Watchdog", icon: <Bell />, status: "Monitoring" },
              ].map((node, i) => (
                <div key={node.name} className="relative">
                  <div className="bg-slate-800/50 border border-white/10 p-6 rounded-2xl text-center space-y-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto">
                      {node.icon}
                    </div>
                    <p className="text-sm font-bold text-white">{node.name}</p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                        {node.status}
                      </span>
                    </div>
                  </div>
                  {i < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-white/10 z-0"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Charts Section */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-card-dark p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-lg font-bold flex items-center gap-3">
                      <Zap className="text-primary" size={20} />
                      Sensor Telemetry (Light & Heater)
                    </h4>
                    <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        Light (Lux)
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                        Heater (°C)
                      </span>
                    </div>
                  </div>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient
                            id="colorLight"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="var(--color-primary)"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-primary)"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(255,255,255,0.05)"
                        />
                        <XAxis
                          dataKey="time"
                          stroke="#64748b"
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="#64748b"
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0f172a",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="light"
                          stroke="var(--color-primary)"
                          fillOpacity={1}
                          fill="url(#colorLight)"
                        />
                        <Area
                          type="monotone"
                          dataKey="heater"
                          stroke="#f43f5e"
                          fillOpacity={0.1}
                          fill="#f43f5e"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white dark:bg-card-dark p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-lg font-bold flex items-center gap-3">
                      <Activity className="text-emerald-500" size={20} />
                      AC Temperature Stability
                    </h4>
                    <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">
                      Target: 24°C
                    </span>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(255,255,255,0.05)"
                        />
                        <XAxis
                          dataKey="time"
                          stroke="#64748b"
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          domain={[20, 30]}
                          stroke="#64748b"
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0f172a",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                          }}
                        />
                        <Line
                          type="stepAfter"
                          dataKey="ac"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Watchdog Alerts Section */}
              <div className="space-y-8">
                <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-lg font-bold text-white flex items-center gap-3">
                      <Bell className="text-amber-500" size={20} />
                      Watchdog Alerts
                    </h4>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="flex-1 space-y-4 overflow-y-auto max-h-[500px] no-scrollbar">
                    <AnimatePresence initial={false}>
                      {alerts.length === 0 ? (
                        <p className="text-slate-500 text-sm italic">
                          No anomalies detected in the last 60s...
                        </p>
                      ) : (
                        alerts.map((alert, i) => (
                          <motion.div
                            key={alert}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl"
                          >
                            <p className="text-xs font-mono text-amber-500 leading-relaxed">
                              {alert}
                            </p>
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      Watchdog Config
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Heater Threshold</span>
                        <span className="text-white">48°C</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Alert Method</span>
                        <span className="text-white">Email (SMTP)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Snippet */}
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Core Implementation (Watchdog)
              </p>
              <div className="bg-[#0a0f1d] border border-white/10 rounded-[2rem] p-10 overflow-x-auto font-mono text-base leading-relaxed text-slate-400 shadow-2xl">
                <div className="flex gap-3 mb-8">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500/80"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500/80"></div>
                </div>
                <p>
                  <span className="text-primary">def</span>{" "}
                  <span className="text-amber-300">check_thresholds</span>(data):
                </p>
                <p className="pl-4">
                  <span className="text-primary">if</span> data[
                  <span className="text-amber-300">'heater'</span>] &gt;{" "}
                  <span className="text-rose-400">48</span>:
                </p>
                <p className="pl-8">
                  send_alert(
                  <span className="text-amber-300">
                    f"High temperature detected: {"{"}data['heater']{"}"}°C"
                  </span>
                  )
                </p>
                <p className="mt-6 text-slate-600">
                  # Watchdog loop reading from MySQL
                </p>
                <p>
                  <span className="text-primary">while</span>{" "}
                  <span className="text-primary">True</span>:
                </p>
                <p className="pl-4">
                  latest_reading = db.query(
                  <span className="text-amber-300">
                    "SELECT * FROM readings ORDER BY id DESC LIMIT 1"
                  </span>
                  )
                </p>
                <p className="pl-4">check_thresholds(latest_reading)</p>
                <p className="pl-4">time.sleep(5)</p>
              </div>
            </div>
          </motion.section>
        )}

        {/* ML Methodology */}
        {project.type === "ml" && (
          <motion.section variants={itemVariants} className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-primary font-bold uppercase tracking-widest text-xs">
                Model Performance
              </h2>
              <h3 className="text-4xl font-bold tracking-tight flex items-center gap-4">
                Random Forest Metrics
                <span className="px-3 py-1 bg-purple-500/10 text-purple-500 text-xs font-bold rounded-full uppercase tracking-widest border border-purple-500/20">
                  Tuned Model
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-card-dark p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl">
                <h4 className="text-lg font-bold mb-6 flex items-center gap-3">
                  <Activity className="text-purple-500" size={20} />
                  Feature Importance (Top 5)
                </h4>
                <div className="space-y-4">
                  {[
                    { name: "Feature A", val: 85 },
                    { name: "Feature B", val: 72 },
                    { name: "Feature C", val: 64 },
                    { name: "Feature D", val: 45 },
                    { name: "Feature E", val: 30 },
                  ].map((f) => (
                    <div key={f.name} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                        <span className="text-slate-500">{f.name}</span>
                        <span className="text-purple-500">{f.val}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${f.val}%` }}
                          className="h-full bg-purple-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-card-dark p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl flex flex-col justify-center items-center text-center space-y-6">
                <div className="w-24 h-24 rounded-full border-4 border-purple-500/20 border-t-purple-500 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">94%</span>
                </div>
                <div>
                  <h5 className="font-bold text-white">ROC-AUC Score</h5>
                  <p className="text-sm text-slate-500">Exceptional classification performance across all test sets.</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Game Methodology */}
        {project.type === "game" && (
          <motion.section variants={itemVariants} className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-primary font-bold uppercase tracking-widest text-xs">
                Game Architecture
              </h2>
              <h3 className="text-4xl font-bold tracking-tight flex items-center gap-4">
                OOP Implementation
                <span className="px-3 py-1 bg-rose-500/10 text-rose-500 text-xs font-bold rounded-full uppercase tracking-widest border border-rose-500/20">
                  60 FPS
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { name: "Abstraction", desc: "Base classes for game entities." },
                { name: "Inheritance", desc: "Shared logic for all projectiles." },
                { name: "Encapsulation", desc: "Private state for player physics." },
                { name: "Polymorphism", desc: "Dynamic collision handling." },
              ].map((pillar) => (
                <div key={pillar.name} className="bg-slate-800/50 border border-white/10 p-6 rounded-2xl space-y-3">
                  <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-500">
                    <CodeIcon size={20} />
                  </div>
                  <h4 className="font-bold text-white">{pillar.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Weather Methodology */}
        {project.type === "weather" && (
          <motion.section variants={itemVariants} className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-primary font-bold uppercase tracking-widest text-xs">
                Environmental Analytics
              </h2>
              <h3 className="text-4xl font-bold tracking-tight flex items-center gap-4">
                Milan Climate Trends
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 text-xs font-bold rounded-full uppercase tracking-widest border border-cyan-500/20">
                  Copernicus API
                </span>
              </h3>
            </div>

            <div className="bg-white dark:bg-card-dark p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-lg font-bold flex items-center gap-3">
                  <Cloud className="text-cyan-500" size={20} />
                  Air Quality Index (AQI) - Milan
                </h4>
                <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">
                  Historical Trend
                </span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" hide />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="light"
                      name="AQI"
                      stroke="#06b6d4"
                      fillOpacity={1}
                      fill="url(#colorAqi)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.section>
        )}

        {/* Generic Methodology for non-specialized projects */}
        {["database", "web"].includes(project.type) && (
          <motion.section variants={itemVariants} className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-primary font-bold uppercase tracking-widest text-xs">
                Methodology
              </h2>
              <h3 className="text-4xl font-bold tracking-tight">
                Technical Implementation
              </h3>
            </div>
            <div className="bg-white dark:bg-card-dark p-12 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl">
              <p className="text-slate-500 leading-relaxed text-lg">
                This project utilizes a robust technical stack to achieve its goals.
                The implementation focuses on scalability, performance, and clean code architecture.
              </p>
              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                {['Scalability', 'Security', 'Performance', 'Reliability'].map((trait) => (
                  <div key={trait} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-white/5 text-center">
                    <p className="font-bold text-primary">{trait}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Key Findings (Only for IoT/ML Project) */}
        {(project.type === "iot" || project.type === "ml") && (
          <motion.section variants={itemVariants} className="space-y-10">
            <h2 className="text-primary font-bold uppercase tracking-widest text-xs">
              System Performance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Gauge className="text-primary" />,
                  title: project.type === "ml" ? "94% Accuracy" : "Real-time",
                  desc: project.type === "ml" ? "High precision in predicting target variables." : "Sub-second latency from sensor publication to database persistence.",
                },
                {
                  icon: <Server className="text-primary" />,
                  title: project.type === "ml" ? "Optimized" : "Containerized",
                  desc: project.type === "ml" ? "Hyperparameter tuning using GridSearch CV." : "Fully isolated services orchestrated with Docker Compose for easy deployment.",
                },
                {
                  icon: <BarChart className="text-primary" />,
                  title: project.type === "ml" ? "Robust" : "99.9% Uptime",
                  desc: project.type === "ml" ? "Validated using 5-fold cross-validation." : "Automated watchdog monitoring ensures continuous data pipeline health.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10, borderColor: "rgba(17, 180, 212, 0.4)" }}
                  className="bg-slate-800/30 p-10 rounded-[2rem] border border-white/5 transition-all group shadow-xl"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-2xl mb-3 text-white tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-base text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA */}
        <motion.footer variants={itemVariants} className="text-center pt-10">
          <div className="bg-gradient-to-br from-slate-900 to-background-dark text-white rounded-[3rem] p-16 md:p-24 shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-[120px] -mr-60 -mt-60"></div>
            <div className="relative z-10 space-y-12">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Refined Repository
                </h3>
                <p className="text-slate-400 max-w-lg mx-auto text-xl leading-relaxed">
                  Direct access to the technical core of the project. No fluff,
                  just the implementation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <motion.a
                  href="#"
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                  className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl text-left group"
                >
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                    <FileCode size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-white">analysis.ipynb</p>
                    <p className="text-xs text-slate-500">
                      Jupyter Notebook • 4.2MB
                    </p>
                  </div>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                  className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl text-left group"
                >
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                    <DbIcon size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-white">schema.sql</p>
                    <p className="text-xs text-slate-500">
                      Database Schema • 12KB
                    </p>
                  </div>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                  className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl text-left group"
                >
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                    <Terminal size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-white">train_model.py</p>
                    <p className="text-xs text-slate-500">
                      Python Script • 28KB
                    </p>
                  </div>
                </motion.a>
                <motion.a
                  href="https://github.com/Montasir00"
                  target="_blank"
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                  className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl text-left group"
                >
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                    <Github size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-white">Full Repository</p>
                    <p className="text-xs text-slate-500">
                      GitHub • Public Access
                    </p>
                  </div>
                </motion.a>
              </div>

              <motion.button
                onClick={() =>
                  window.open("https://github.com/Montasir00", "_blank")
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-primary-dark text-slate-900 font-bold px-12 py-6 rounded-2xl inline-flex items-center gap-4 transition-all shadow-2xl shadow-primary/30 text-lg"
              >
                <Github size={28} />
                Explore on GitHub
              </motion.button>
            </div>
          </div>
        </motion.footer>
      </div>


    </motion.div>
  );
};
