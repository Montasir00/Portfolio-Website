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

export const ProjectDetail = ({ onBack }: ProjectDetailProps) => {
  const [data, setData] = useState(generateData());
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
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
              IoT Energy
              <br />
              Management System
            </h1>
            <div className="flex items-center gap-12 mt-10 border-t border-white/10 pt-8">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.2em]">
                  Category
                </span>
                <span className="text-base text-primary font-bold">
                  Analytics
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.2em]">
                  Deployment
                </span>
                <span className="text-base text-slate-300 font-bold">
                  Completed
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
              Built a real-time IoT data pipeline using Docker Compose and
              Python for continuous sensor analytics. This system automates data
              ingestion, preprocessing, and anomaly detection with an
              alert-based monitoring system.
            </p>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
              Improved system reliability and reduced manual data handling
              through containerized deployment, ensuring seamless scalability
              and consistent performance across different environments.
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
                "Manual data handling and lack of real-time monitoring leads to
                delayed responses in industrial energy management."
              </blockquote>
              <p className="text-slate-400 leading-relaxed text-lg">
                The challenge was to create a system that could ingest
                high-frequency sensor data, process it in real-time, and provide
                immediate alerts for anomalies without human intervention.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Methodology & Dashboard */}
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

        {/* Key Findings */}
        <motion.section variants={itemVariants} className="space-y-10">
          <h2 className="text-primary font-bold uppercase tracking-widest text-xs">
            System Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Gauge className="text-primary" />,
                title: "Real-time",
                desc: "Sub-second latency from sensor publication to database persistence.",
              },
              {
                icon: <Server className="text-primary" />,
                title: "Containerized",
                desc: "Fully isolated services orchestrated with Docker Compose for easy deployment.",
              },
              {
                icon: <BarChart className="text-primary" />,
                title: "99.9% Uptime",
                desc: "Automated watchdog monitoring ensures continuous data pipeline health.",
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
