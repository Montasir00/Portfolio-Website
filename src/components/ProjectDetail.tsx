import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useParams } from "react-router-dom";
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
  Github,
  Activity,
  Terminal,
  Database as DbIcon,
  Cpu,
  Zap,
  Bell,
  TrendingUp,
  Lightbulb,
  BarChart,
  Users,
  Network,
  Server,
  CloudRain,
  Wind,
  Thermometer,
  ShieldAlert,
  Fingerprint,
  Lock,
  ShoppingCart,
  Edit,
  Newspaper,
  TerminalSquare,
} from "lucide-react";
import { PROJECTS_METADATA, ProjectMetadata } from "../constants/projects";

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

// --- Sub-components for better structure ---

const ProjectHero = ({ project }: { project: ProjectMetadata }) => (
  <motion.header
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/5"
  >
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent z-10"></div>
    <div className="absolute inset-0 data-grid-bg opacity-10 z-10"></div>
    {/* Blueprint tinting layer */}
    <div className="absolute inset-0 bg-primary/10 mix-blend-color z-0"></div>
    <img
      src={`${import.meta.env.BASE_URL}${project.img}`}
      alt={project.title}
      className="w-full h-full object-cover filter saturate-50 contrast-110 opacity-70 mix-blend-luminosity z-0"
      referrerPolicy="no-referrer"
    />
    <div className="absolute bottom-0 left-0 p-6 sm:p-10 md:p-16 z-20 w-full">
      <div className="flex items-center gap-4 mb-4 md:mb-6">
        <span className="bg-primary/20 text-primary border border-primary/30 text-[8px] sm:text-[10px] font-bold px-3 py-1 md:px-4 md:py-1 rounded-full uppercase tracking-[0.2em] md:tracking-[0.3em]">
          {project.systemStatus}
        </span>
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--color-primary)]"></div>
      </div>
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-tight md:leading-[0.9] tracking-tighter mix-blend-normal break-words">
        {project.title}
      </h1>
      <div className="flex flex-wrap items-center gap-6 md:gap-12 mt-6 md:mt-10 border-t border-white/20 pt-6 md:pt-8 w-full">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] md:text-[10px] uppercase text-slate-400 font-bold tracking-[0.2em]">Category</span>
          <span className="text-sm md:text-base text-primary font-bold">{project.category}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[9px] md:text-[10px] uppercase text-slate-400 font-bold tracking-[0.2em]">Status</span>
          <span className="text-sm md:text-base text-emerald-500 font-bold">{project.status}</span>
        </div>
      </div>
    </div>
  </motion.header>
);

const ProjectOverview = ({ overview }: { overview: string }) => (
  <motion.section
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    className="space-y-6 border-l-4 border-primary/30 pl-10"
  >
    <h2 className="text-primary font-bold uppercase tracking-widest text-xs">Overview</h2>
    <div className="space-y-8 text-2xl leading-relaxed text-slate-600 dark:text-slate-300 font-medium tracking-tight">
      <p>{overview}</p>
    </div>
  </motion.section>
);

const ProjectProblem = ({ problem, detail }: { problem: string; detail: string }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-12 md:p-16 space-y-8 relative overflow-hidden shadow-2xl"
  >
    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
    <div className="flex flex-col md:flex-row items-start gap-10 relative z-10">
      <div className="bg-primary/20 p-5 rounded-2xl shadow-xl shadow-primary/10">
        <AlertCircle className="text-primary" size={40} />
      </div>
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-white tracking-tight">The Problem</h2>
        <blockquote className="border-l-4 border-primary pl-8 italic text-slate-300 text-2xl leading-relaxed font-medium">
          "{problem}"
        </blockquote>
        <p className="text-slate-400 leading-relaxed text-lg">{detail}</p>
      </div>
    </div>
  </motion.section>
);

const ImpactInsights = ({ impact, insights }: { impact: string; insights: string }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="grid grid-cols-1 md:grid-cols-2 gap-8"
  >
    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[2.5rem] p-10 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
          <TrendingUp size={24} />
        </div>
        <h3 className="text-xl font-bold text-white uppercase tracking-wider">Quantified Impact</h3>
      </div>
      <p className="text-slate-400 text-lg leading-relaxed">{impact}</p>
    </div>
    <div className="bg-amber-500/5 border border-amber-500/10 rounded-[2.5rem] p-10 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500">
          <Lightbulb size={24} />
        </div>
        <h3 className="text-xl font-bold text-white uppercase tracking-wider">Insights & Action</h3>
      </div>
      <p className="text-slate-400 text-lg leading-relaxed">{insights}</p>
    </div>
  </motion.section>
);

const IoTDashboard = ({ data, alerts }: { data: any[]; alerts: string[] }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="space-y-12"
  >
    <div className="space-y-4">
      <h2 className="text-primary font-bold uppercase tracking-widest text-xs">Live Pipeline Monitoring</h2>
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
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{node.status}</span>
            </div>
          </div>
          {i < 4 && <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-white/10 z-0"></div>}
        </div>
      ))}
    </div>

    {/* Main Dashboard Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white dark:bg-card-dark p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-bold flex items-center gap-3">
              <Zap className="text-primary" size={20} /> Sensor Telemetry
            </h4>
            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary"></div>Light</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500"></div>Heater</span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
                <Area type="monotone" dataKey="light" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorLight)" />
                <Area type="monotone" dataKey="heater" stroke="#f43f5e" fillOpacity={0.1} fill="#f43f5e" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-bold flex items-center gap-3">
              <Activity className="text-emerald-500" size={20} /> AC Temperature Stability
            </h4>
            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">Target: 24°C</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis domain={[20, 30]} stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
                <Line type="stepAfter" dataKey="ac" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-bold text-white flex items-center gap-3">
              <Bell className="text-amber-500" size={20} /> Watchdog Alerts
            </h4>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[500px] no-scrollbar">
            <AnimatePresence initial={false}>
              {alerts.length === 0 ? (
                <p className="text-slate-500 text-sm italic">No anomalies detected...</p>
              ) : (
                alerts.map((alert) => (
                  <motion.div key={alert} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                    <p className="text-xs font-mono text-amber-500 leading-relaxed">{alert}</p>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Watchdog Config</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs"><span className="text-slate-400">Heater Threshold</span><span className="text-white">48°C</span></div>
              <div className="flex justify-between text-xs"><span className="text-slate-400">Alert Method</span><span className="text-white">Email (SMTP)</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Code Snippet */}
    <div className="space-y-4">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Core Implementation (Watchdog)</p>
      <div className="bg-[#0a0f1d] border border-white/10 rounded-[2rem] p-10 overflow-x-auto font-mono text-base leading-relaxed text-slate-400 shadow-2xl">
        <div className="flex gap-3 mb-8">
          <div className="w-3.5 h-3.5 rounded-full bg-red-500/80"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-green-500/80"></div>
        </div>
        <p><span className="text-primary">def</span> <span className="text-amber-300">check_thresholds</span>(data):</p>
        <p className="pl-4"><span className="text-primary">if</span> data[<span className="text-amber-300">'heater'</span>] &gt; <span className="text-rose-400">48</span>:</p>
        <p className="pl-8">send_alert(<span className="text-amber-300">f"High temperature detected: {"{"}data['heater']{"}"}°C"</span>)</p>
        <p className="mt-6 text-slate-600"># Watchdog loop reading from MySQL</p>
        <p><span className="text-primary">while</span> <span className="text-primary">True</span>:</p>
        <p className="pl-4">latest_reading = db.query(<span className="text-amber-300">"SELECT * FROM readings ORDER BY id DESC LIMIT 1"</span>)</p>
        <p className="pl-4">check_thresholds(latest_reading)</p>
        <p className="pl-4">time.sleep(5)</p>
      </div>
    </div>
  </motion.section>
);

const MLDashboard = () => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="space-y-16"
  >
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-primary font-bold uppercase tracking-widest text-xs">Exploratory Data Analysis</h2>
        <h3 className="text-4xl font-bold tracking-tight flex items-center gap-4">
          The "Analyst's Eye"
          <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-full uppercase tracking-widest border border-blue-500/20">Pre-Modeling Discovery</span>
        </h3>
      </div>
      <div className="bg-white dark:bg-card-dark p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-white tracking-tight">Correlation Heatmap Analysis</h4>
            <p className="text-slate-400 leading-relaxed">
              Before building the Random Forest model, I conducted a deep-dive correlation analysis.
              I discovered a critical non-linear relationship between <span className="text-primary font-bold">Feature A</span> and
              <span className="text-primary font-bold">Feature B</span> that baseline linear models missed.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span>Strong Positive Correlation (0.94)</span>
              </div>
              <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <span>Strong Negative Correlation (-0.94)</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2 p-4 bg-slate-900/50 rounded-2xl border border-white/5">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: i * 0.02 }} className={`aspect-square rounded-md ${Math.random() > 0.4 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ opacity: Math.random() * 0.8 + 0.2 }} />
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <h2 className="text-primary font-bold uppercase tracking-widest text-xs">Model Performance</h2>
      <h3 className="text-4xl font-bold tracking-tight flex items-center gap-4">
        Random Forest Metrics
        <span className="px-3 py-1 bg-purple-500/10 text-purple-500 text-xs font-bold rounded-full uppercase tracking-widest border border-purple-500/20">Tuned Model</span>
      </h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-card-dark p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl">
        <h4 className="text-lg font-bold mb-6 flex items-center gap-3">
          <Activity className="text-purple-500" size={20} /> Feature Importance (Top 5)
        </h4>
        <div className="space-y-4">
          {[
            { name: "feature_2", val: 57 },
            { name: "feature_4", val: 30 },
            { name: "category_1_encoded", val: 8 },
            { name: "feature_9", val: 8 },
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

      <div className="bg-white dark:bg-card-dark p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl">
        <h4 className="text-lg font-bold mb-6 flex items-center gap-3">
          <BarChart className="text-purple-500" size={20} /> Performance Metrics
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Accuracy", val: 87, color: "bg-emerald-500" },
            { label: "Precision", val: 87, color: "bg-blue-500/80" },
            { label: "Recall", val: 84, color: "bg-amber-500/80" },
            { label: "F1 Score", val: 85, color: "bg-purple-500/80" },
          ].map((cell) => (
            <div key={cell.label} className={`aspect-square rounded-2xl ${cell.color} flex flex-col items-center justify-center p-4`}>
              <span className="text-2xl font-bold text-white">{cell.val}%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 text-center">{cell.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.section>
);

const EcommerceDashboard = () => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="space-y-16"
  >
    {/* Section 1: Infrastructure & Security Diagram */}
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-primary font-bold uppercase tracking-widest text-xs">Architecture Topology</h2>
        <h3 className="text-4xl font-bold tracking-tight flex items-center gap-4">
          Secure Containerized Flow
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-widest border border-primary/20">HTTPS Enabled</span>
        </h3>
      </div>

      <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-x-auto shadow-2xl relative">
        <div className="absolute inset-0 data-grid-bg opacity-10 pointer-events-none"></div>
        <div className="min-w-[800px] h-[300px] relative flex items-center justify-between px-10">

          {/* User Node */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-slate-800 border border-white/20 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <Users size={28} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Client</span>
          </div>

          {/* Connection Line */}
          <div className="flex-1 h-px bg-gradient-to-r from-slate-500 via-primary to-slate-500 relative flex items-center justify-center mx-4">
            <div className="absolute -top-6 flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest bg-slate-900 px-3 py-1 border border-primary/20 rounded-full">
              <Lock size={12} /> SSL / TLS
            </div>
            <div className="w-2 h-2 rounded-full bg-primary absolute shadow-[0_0_10px_var(--color-primary)] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
          </div>

          {/* NGINX Proxy */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
              <Network size={32} />
            </div>
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">NGINX Proxy</span>
          </div>

          {/* Connection Line */}
          <div className="flex-1 h-px bg-white/20 relative mx-4"></div>

          {/* Docker Network Box */}
          <div className="relative z-10 w-96 p-6 border-2 border-dashed border-blue-500/30 rounded-3xl bg-blue-500/5">
            <div className="absolute -top-3 left-6 text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-slate-900 px-2 rounded">
              Docker Network
            </div>
            <div className="flex justify-between items-center gap-6 relative">

              {/* PHP App */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-[#4f5b93]/20 border border-[#4f5b93]/50 rounded-xl flex items-center justify-center text-[#4f5b93]">
                  <TerminalSquare size={24} />
                </div>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">PHP-FPM</span>
              </div>

              {/* Bot Branch */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-px h-10 bg-cyan-500/50 mb-2"></div>
                <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-full text-cyan-400 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                  <Zap size={12} /> Telegram OTP Bot
                </div>
              </div>

              {/* MySQL */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-500">
                  <DbIcon size={24} />
                </div>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">MySQL</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Section 2: Core Functional Pillars */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-card-dark p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl hover:-translate-y-2 transition-transform duration-300">
        <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
          <ShoppingCart size={24} />
        </div>
        <h4 className="text-xl font-bold mb-3">Full Purchase Funnel</h4>
        <p className="text-sm text-slate-500 leading-relaxed">
          Complete end-to-end shopping experience. Users can browse categories, manage a dynamic cart, update quantities, and process orders securely.
        </p>
      </div>

      <div className="bg-white dark:bg-card-dark p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl hover:-translate-y-2 transition-transform duration-300">
        <div className="w-12 h-12 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mb-6">
          <Edit size={24} />
        </div>
        <h4 className="text-xl font-bold mb-3">Admin CRUD Panel</h4>
        <p className="text-sm text-slate-500 leading-relaxed">
          A protected, dedicated backend interface separating business operations from the public. Admins gain total control to add, edit, or remove fresh produce inventory.
        </p>
      </div>

      <div className="bg-white dark:bg-card-dark p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl hover:-translate-y-2 transition-transform duration-300">
        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mb-6">
          <Newspaper size={24} />
        </div>
        <h4 className="text-xl font-bold mb-3">Integrated Blog</h4>
        <p className="text-sm text-slate-500 leading-relaxed">
          A built-in SEO-friendly blog engine designed for recipe sharing and nutritional tips to drive organic traffic and retain grocery customers long-term.
        </p>
      </div>
    </div>

    {/* Section 3: Why It Matters (Impact) */}
    <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-8 md:p-12">
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
        <ShieldAlert className="text-primary" /> Engineering For Trust & Compliance
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 bg-white/5 rounded-lg"><Fingerprint size={16} className="text-amber-500" /></div>
            <div>
              <h5 className="font-bold text-white mb-1">Defense in Depth</h5>
              <p className="text-sm text-slate-400 leading-relaxed">Handling personal addresses and payments requires more than basic validation. CSRF synchronizer tokens and strict HTTPS form the baseline for protecting consumer data against interception.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 bg-white/5 rounded-lg"><Lock size={16} className="text-emerald-500" /></div>
            <div>
              <h5 className="font-bold text-white mb-1">Custom Telegram 2FA</h5>
              <p className="text-sm text-slate-400 leading-relaxed">Instead of relying on expensive third-party SMS gateways, engineering a direct Telegram Bot integration provides instantaneous, free, and highly reliable Multi-Factor Authentication.</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 bg-white/5 rounded-lg"><Server size={16} className="text-blue-500" /></div>
            <div>
              <h5 className="font-bold text-white mb-1">Absolute Separation of Concerns</h5>
              <p className="text-sm text-slate-400 leading-relaxed">Cleanly partitioning the logic into `/products`, `/mfa`, and `/otp-service` ensures features can be scaled or updated independently without generating monolithic technical debt.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 bg-white/5 rounded-lg"><Terminal size={16} className="text-cyan-500" /></div>
            <div>
              <h5 className="font-bold text-white mb-1">Production-Ready Portability</h5>
              <p className="text-sm text-slate-400 leading-relaxed">By orchestrating the entire stack through Docker Compose, the system achieves 100% environment parity, permanently eliminating the "it works on my local machine" deployment paradox.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </motion.section>
);

const NetworkDashboard = () => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="space-y-12"
  >
    <div className="space-y-4">
      <h2 className="text-primary font-bold uppercase tracking-widest text-xs">Protocol Simulation</h2>
      <h3 className="text-4xl font-bold tracking-tight flex items-center gap-4">
        AODV Routing Visualizer
        <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-full uppercase tracking-widest border border-blue-500/20">Live Animation</span>
      </h3>
      <p className="text-slate-400 max-w-2xl leading-relaxed text-lg pt-2">
        A conceptual visualization demonstrating the Ad-hoc On-Demand Distance Vector (AODV) routing protocol. Watch as the Source node broadcasts Route Requests (RREQ) and receives a Route Reply (RREP) from the Destination.
      </p>
    </div>

    <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl relative">
      <div className="absolute inset-0 data-grid-bg opacity-20 pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row gap-12 items-center">

        {/* Simulation Area */}
        <div className="relative w-full max-w-md aspect-square bg-[#0a0f1d] border border-white/5 rounded-3xl overflow-hidden shadow-inner">
          {/* RREQ Broadcast Animation from Source */}
          <div className="absolute top-[20%] left-[20%] w-0 h-0 flex items-center justify-center">
            <div className="absolute w-64 h-64 border border-cyan-500/30 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            <div className="absolute w-48 h-48 border border-cyan-500/20 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
          </div>

          {/* RREQ Forwarding from Intermediate Node 1 */}
          <div className="absolute top-[50%] left-[50%] w-0 h-0 flex items-center justify-center">
            <div className="absolute w-48 h-48 border border-cyan-500/20 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]"></div>
          </div>

          {/* Active Route Path (RREP) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M 80 80 L 200 200 L 320 320"
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeDasharray="6 6"
              className="animate-[dash_1s_linear_infinite]"
            />
          </svg>

          {/* Source Node */}
          <div className="absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500 text-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)] z-10">
              <Server size={20} />
            </div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-slate-900 px-2 rounded">Src</span>
          </div>

          {/* Intermediate Node 1 */}
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-slate-800 border border-emerald-500/50 text-slate-300 rounded-full flex items-center justify-center z-10">
              <Cpu size={16} />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-900 px-2 rounded">R1</span>
          </div>

          {/* Intermediate Node 2 (Dead/Unused Path) */}
          <div className="absolute top-[20%] left-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-slate-800 border border-white/20 text-slate-500 rounded-full flex items-center justify-center z-10">
              <Cpu size={16} />
            </div>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-slate-900 px-2 rounded">R2</span>
          </div>

          {/* Intermediate Node 3 (Dead/Unused Path) */}
          <div className="absolute top-[80%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-slate-800 border border-white/20 text-slate-500 rounded-full flex items-center justify-center z-10">
              <Cpu size={16} />
            </div>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-slate-900 px-2 rounded">R3</span>
          </div>

          {/* Destination Node */}
          <div className="absolute top-[80%] left-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] z-10">
              <Server size={20} />
            </div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-slate-900 px-2 rounded">Dest</span>
          </div>

          {/* Style for animating dash */}
          <style dangerouslySetInnerHTML={{
            __html: `
             @keyframes dash {
               to {
                 stroke-dashoffset: -12;
               }
             }
           `}} />
        </div>

        {/* Explanation Panel */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-cyan-400">1</div>
              <h4 className="text-xl font-bold text-white">Route Request (RREQ)</h4>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed ml-11">
              The Source node broadcasts RREQ packets to its immediate neighbors. Notice the expanding cyan rings illustrating the BFS flooding mechanism across the network.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400">2</div>
              <h4 className="text-xl font-bold text-white">Route Reply (RREP)</h4>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed ml-11">
              Once the Destination (or a node with a fresh route) receives the RREQ, it unicasts an RREP packet back along the reverse path, establishing the active route.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-500">3</div>
              <h4 className="text-xl font-bold text-white">Data Transmission</h4>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed ml-11">
              The green active path is now established. Data packets flow directly from Source to Destination via the selected intermediate nodes. Unused nodes (R2, R3) drop the request.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex gap-6 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-cyan-500"></div> RREQ Broadcast</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Active Route</div>
          </div>
        </div>

      </div>
    </div>
  </motion.section>
);

const GymDashboard = () => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="space-y-12"
  >
    <div className="space-y-4">
      <h2 className="text-primary font-bold uppercase tracking-widest text-xs">System Architecture</h2>
      <h3 className="text-4xl font-bold tracking-tight flex items-center gap-4">
        Database Schema
        <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 text-xs font-bold rounded-full uppercase tracking-widest border border-cyan-500/20">ER Diagram</span>
      </h3>
      <p className="text-slate-400 max-w-2xl leading-relaxed text-lg pt-2">
        A fully normalized relational database structure designed to handle complex gym operations, from member subscriptions to trainer payrolls, ensuring zero data redundancy.
      </p>
    </div>

    <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-x-auto shadow-2xl relative">
      <div className="absolute inset-0 data-grid-bg opacity-20 pointer-events-none"></div>

      {/* Interactive ER Diagram Area */}
      <div className="min-w-[800px] h-[600px] relative font-mono text-xs">

        {/* Table: Member */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="absolute top-10 left-[40%] w-56 bg-[#0a0f1d] border border-cyan-500/30 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.1)] z-10"
        >
          <div className="bg-cyan-500/20 px-4 py-2 border-b border-cyan-500/30 text-cyan-400 font-bold text-center">
            member
          </div>
          <div className="p-3 space-y-1.5 text-slate-300">
            <div className="flex justify-between"><span className="text-yellow-500 font-bold">mem_id(pk)</span><span className="text-slate-500">varchar(20)</span></div>
            <div className="flex justify-between"><span>name</span><span className="text-slate-500">varchar(30)</span></div>
            <div className="flex justify-between"><span>dob</span><span className="text-slate-500">varchar(20)</span></div>
            <div className="flex justify-between"><span>age</span><span className="text-slate-500">varchar(20)</span></div>
            <div className="flex justify-between"><span>package</span><span className="text-slate-500">varchar(10)</span></div>
            <div className="flex justify-between"><span>mobileno</span><span className="text-slate-500">varchar(10)</span></div>
            <div className="flex justify-between"><span className="text-emerald-400">pay_id(fk)</span><span className="text-slate-500">varchar(20)</span></div>
            <div className="flex justify-between"><span className="text-emerald-400">trainer_id(fk)</span><span className="text-slate-500">varchar(20)</span></div>
          </div>
        </motion.div>

        {/* Table: Gym */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="absolute top-10 right-10 w-56 bg-[#0a0f1d] border border-blue-500/30 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.1)] z-10"
        >
          <div className="bg-blue-500/20 px-4 py-2 border-b border-blue-500/30 text-blue-400 font-bold text-center">
            gym
          </div>
          <div className="p-3 space-y-1.5 text-slate-300">
            <div className="flex justify-between"><span className="text-yellow-500 font-bold">gym_id(pk)</span><span className="text-slate-500">varchar(20)</span></div>
            <div className="flex justify-between"><span>gym_name</span><span className="text-slate-500">varchar(30)</span></div>
            <div className="flex justify-between"><span>address</span><span className="text-slate-500">varchar(150)</span></div>
            <div className="flex justify-between"><span>type</span><span className="text-slate-500">varchar(20)</span></div>
          </div>
        </motion.div>

        {/* Table: Login */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="absolute top-[50%] left-10 w-48 bg-[#0a0f1d] border border-purple-500/30 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.1)] z-10"
        >
          <div className="bg-purple-500/20 px-4 py-2 border-b border-purple-500/30 text-purple-400 font-bold text-center">
            login
          </div>
          <div className="p-3 space-y-1.5 text-slate-300">
            <div className="flex justify-between"><span className="text-yellow-500 font-bold">id(pk)</span><span className="text-slate-500">int</span></div>
            <div className="flex justify-between"><span>uname</span><span className="text-slate-500">varchar(30)</span></div>
            <div className="flex justify-between"><span>pwd</span><span className="text-slate-500">varchar(30)</span></div>
          </div>
        </motion.div>

        {/* Table: Trainer */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="absolute bottom-10 left-[35%] w-56 bg-[#0a0f1d] border border-amber-500/30 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.1)] z-10"
        >
          <div className="bg-amber-500/20 px-4 py-2 border-b border-amber-500/30 text-amber-400 font-bold text-center">
            trainer
          </div>
          <div className="p-3 space-y-1.5 text-slate-300">
            <div className="flex justify-between"><span className="text-yellow-500 font-bold">trainer_id(pk)</span><span className="text-slate-500">varchar(20)</span></div>
            <div className="flex justify-between"><span>name</span><span className="text-slate-500">varchar(20)</span></div>
            <div className="flex justify-between"><span>time</span><span className="text-slate-500">varchar(10)</span></div>
            <div className="flex justify-between"><span>mobile_no</span><span className="text-slate-500">varchar(10)</span></div>
            <div className="flex justify-between"><span className="text-emerald-400">pay_id(fk)</span><span className="text-slate-500">varchar(20)</span></div>
          </div>
        </motion.div>

        {/* Table: Payment */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="absolute bottom-20 right-10 w-56 bg-[#0a0f1d] border border-emerald-500/30 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.1)] z-10"
        >
          <div className="bg-emerald-500/20 px-4 py-2 border-b border-emerald-500/30 text-emerald-400 font-bold text-center">
            payment
          </div>
          <div className="p-3 space-y-1.5 text-slate-300">
            <div className="flex justify-between"><span className="text-yellow-500 font-bold">pay_id(pk)</span><span className="text-slate-500">varchar(20)</span></div>
            <div className="flex justify-between"><span>pay_type</span><span className="text-slate-500">varchar(20)</span></div>
            <div className="flex justify-between"><span className="text-emerald-400">gym_id(fk)</span><span className="text-slate-500">varchar(20)</span></div>
          </div>
        </motion.div>

        {/* Relation Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-600 dark:stroke-slate-500" strokeWidth="2" fill="none">
          {/* Gym to Payment (1 to n) */}
          <path d="M 680 180 L 680 380" className="stroke-indigo-500/50" />
          <text x="690" y="280" fill="currentColor" className="text-indigo-400 font-bold">1 : N</text>

          {/* Member to Payment (n to 1) */}
          <path d="M 500 240 L 500 320 L 600 320 L 600 420" className="stroke-emerald-500/50" />
          <text x="540" y="310" fill="currentColor" className="text-emerald-400 font-bold">N : 1</text>

          {/* Member to Trainer (n to 1) */}
          <path d="M 400 250 L 350 250 L 350 380" className="stroke-cyan-500/50" />
          <text x="360" y="315" fill="currentColor" className="text-cyan-400 font-bold">N : 1</text>

          {/* Trainer to Payment (n to 1) */}
          <path d="M 510 470 L 550 470 L 550 430 L 580 430" className="stroke-amber-500/50" />
          <text x="520" y="460" fill="currentColor" className="text-amber-400 font-bold">N : 1</text>
        </svg>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 flex justify-between text-xs text-slate-400 uppercase tracking-widest font-bold">
        <span>* (pk) = Primary Key</span>
        <span>* (fk) = Foreign Key</span>
      </div>
    </div>
  </motion.section>
);

const WeatherDashboard = ({ data }: { data: any[] }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="space-y-12"
  >
    <div className="space-y-4">
      <h2 className="text-primary font-bold uppercase tracking-widest text-xs">Environmental Pipeline</h2>
      <h3 className="text-4xl font-bold tracking-tight flex items-center gap-4">
        Milan Climate Data
        <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-full uppercase tracking-widest border border-blue-500/20">Copernicus API</span>
      </h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: "Temperature", val: "18.5°C", icon: <Thermometer />, color: "text-rose-500", bg: "bg-rose-500/10" },
        { label: "Air Quality (AQI)", val: "42", icon: <Activity />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { label: "Wind Speed", val: "12 km/h", icon: <Wind />, color: "text-blue-500", bg: "bg-blue-500/10" },
      ].map((stat) => (
        <div key={stat.label} className="bg-white dark:bg-card-dark p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl">
          <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
            {stat.icon}
          </div>
          <p className="text-3xl font-bold tracking-tight">{stat.val}</p>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{stat.label}</p>
        </div>
      ))}
    </div>

    <div className="bg-white dark:bg-card-dark p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-lg font-bold flex items-center gap-3">
          <CloudRain className="text-primary" size={20} /> Precipitation Trends
        </h4>
        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary"></div>Historical</span>
          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-300"></div>Predicted</span>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorWeather" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
            <Area type="monotone" dataKey="ac" name="Rainfall (mm)" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorWeather)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </motion.section>
);

const EnergyPipelineDashboard = () => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="space-y-16"
  >
    <div className="space-y-4">
      <h2 className="text-primary font-bold uppercase tracking-widest text-xs">System Architecture</h2>
      <h3 className="text-4xl font-bold tracking-tight flex items-center gap-4">
        IoT Pipeline Dashboard
        <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-bold rounded-full uppercase tracking-widest border border-amber-500/20">Data Visualization</span>
      </h3>
      <p className="text-slate-400 max-w-2xl leading-relaxed text-lg pt-2">
        A representation of the Containerized IoT Energy Pipeline, illustrating real-time simulations, MQTT routing, and separate database ingestion points (MySQL, Mongo, Neo4j).
      </p>
    </div>

    <div className="bg-[#090c10] border border-white/10 rounded-[2.5rem] overflow-hidden flex justify-center items-center shadow-2xl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@600;800&display=swap');

        .iot-diagram-container {
          --bg: #090c10;
          --surface: #0d1117;
          --border: #1e2d3d;
          --cyan: #00e5ff;
          --cyan-dim: rgba(0,229,255,0.12);
          --cyan-glow: rgba(0,229,255,0.25);
          --text: #c9d1d9;
          --muted: #4a5568;
          --green: #39d353;
          --yellow: #e3b341;
          --purple: #a371f7;
          
          font-family: 'Space Mono', monospace;
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          width: 100%;
        }

        .iot-diagram-container * { box-sizing: border-box; }

        .iot-diagram-container .diagram {
          width: 100%;
          max-width: 760px;
          position: relative;
        }

        .iot-diagram-container .title {
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--cyan);
          margin-bottom: 2.5rem;
          opacity: 0.9;
          text-align: center;
        }

        .iot-diagram-container .flow {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .iot-diagram-container .row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          position: relative;
        }

        .iot-diagram-container .node {
          border: 1px solid var(--border);
          background: var(--surface);
          border-radius: 4px;
          padding: 0.75rem 1.25rem;
          font-size: 0.75rem;
          line-height: 1.4;
          text-align: center;
          position: relative;
          white-space: nowrap;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .iot-diagram-container .node:hover {
          border-color: var(--cyan);
          box-shadow: 0 0 12px var(--cyan-glow);
        }

        .iot-diagram-container .node.accent {
          border-color: var(--cyan);
          background: var(--cyan-dim);
          color: var(--cyan);
          font-weight: 700;
        }

        .iot-diagram-container .arrow-down {
          width: 1px;
          height: 24px;
          background: var(--border);
          margin: 0 auto;
          position: relative;
          flex-shrink: 0;
        }
        
        .iot-diagram-container .arrow-down::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid var(--muted);
        }

        .iot-diagram-container .label {
          font-size: 0.65rem;
          color: var(--muted);
          text-align: center;
          padding: 6px 0;
        }

        .iot-diagram-container .sensors {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .iot-diagram-container .sensor-chip {
          font-size: 0.7rem;
          padding: 6px 12px;
          border: 1px solid var(--border);
          border-radius: 20px;
          background: var(--surface);
          white-space: nowrap;
        }

        .iot-diagram-container .dbs {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .iot-diagram-container .db-card {
          border: 1px solid;
          border-radius: 6px;
          padding: 1rem 1.25rem;
          font-size: 0.7rem;
          text-align: center;
          line-height: 1.6;
          flex: 1;
          min-width: 160px;
          max-width: 220px;
        }
        
        .iot-diagram-container .db-card.mysql  { border-color: #f97316; background: rgba(249,115,22,0.07); color: #f97316; }
        .iot-diagram-container .db-card.mongo  { border-color: var(--green); background: rgba(57,211,83,0.07); color: var(--green); }
        .iot-diagram-container .db-card.neo4j  { border-color: var(--purple); background: rgba(163,113,247,0.07); color: var(--purple); }
        
        .iot-diagram-container .db-card .db-label { font-weight: 700; font-size: 0.85rem; margin-bottom: 6px; }
        .iot-diagram-container .db-card .db-data { color: var(--muted); font-size: 0.7rem; }

        .iot-diagram-container .tag {
          display: inline-block;
          font-size: 0.6rem;
          padding: 3px 8px;
          border-radius: 4px;
          margin-top: 6px;
          background: var(--cyan-dim);
          color: var(--cyan);
          letter-spacing: 0.05em;
        }
      `}</style>

      <div className="iot-diagram-container">
        <div className="diagram">
          <div className="title">// IoT Sensor Data Collection System</div>

          <div className="flow">
            <div className="row"><div className="node accent">⚙️ Load .env Config &nbsp;·&nbsp; Start Docker Containers</div></div>
            <div className="arrow-down"></div>

            <div className="row"><div className="node">Connect → HiveMQ Cloud <br /><span className="tag">MQTT TLS :8883</span></div></div>
            <div className="arrow-down"></div>

            <div className="row" style={{ gap: '16px' }}>
              <div className="node" style={{ fontSize: '0.75rem' }}>publisher.py<br /><span style={{ color: 'var(--muted)', fontSize: '0.65rem' }}>[g] start · [s] stop · [q] quit</span></div>
              <div style={{ width: '60px', height: '1px', background: 'var(--border)' }}></div>
              <div className="node" style={{ fontSize: '0.75rem' }}>subscriber.py<br /><span style={{ color: 'var(--muted)', fontSize: '0.65rem' }}>listen all topics</span></div>
            </div>
            <div className="arrow-down"></div>

            <div className="label">simulates every 5s</div>
            <div className="row">
              <div className="sensors">
                <div className="sensor-chip">🌱 Soil Moisture</div>
                <div className="sensor-chip">🧪 pH Level</div>
                <div className="sensor-chip">🌡️ Temperature</div>
                <div className="sensor-chip">💧 Humidity</div>
                <div className="sensor-chip">☀️ Light</div>
                <div className="sensor-chip">🧫 Nutrient</div>
              </div>
            </div>
            <div className="arrow-down"></div>

            <div className="row">
              <div className="node accent" style={{ fontSize: '0.8rem' }}>MQTT Broker &nbsp;·&nbsp; Publish / Subscribe</div>
            </div>
            <div className="arrow-down"></div>

            <div className="label">routed by sensor type</div>

            <div className="row">
              <div className="dbs">
                <div className="db-card mysql">
                  <div className="db-label">🐬 MySQL</div>
                  <div className="db-data">:3306</div>
                  <div className="db-data">soil_moisture · ph_level</div>
                </div>
                <div className="db-card mongo">
                  <div className="db-label">🍃 MongoDB</div>
                  <div className="db-data">:27017</div>
                  <div className="db-data">temperature · humidity</div>
                </div>
                <div className="db-card neo4j">
                  <div className="db-label">🔵 Neo4j</div>
                  <div className="db-data">:7474 / :7687</div>
                  <div className="db-data">light · nutrient nodes</div>
                </div>
              </div>
            </div>
            <div className="arrow-down"></div>

            <div className="row">
              <div className="node" style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                📊 Analytics &nbsp;·&nbsp; SQL AVG &nbsp;·&nbsp; Mongo Aggregate &nbsp;·&nbsp; Cypher Queries
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.section>
);

export const ProjectDetail = ({ onBack }: ProjectDetailProps) => {
  const { projectId: projectIdParam } = useParams<{ projectId: string }>();
  const projectId = projectIdParam ? parseInt(projectIdParam) : 1;

  const [data, setData] = useState(generateData());
  const [alerts, setAlerts] = useState<string[]>([]);

  const project = PROJECTS_METADATA[projectId] || PROJECTS_METADATA[1];

  useEffect(() => {
    if (project.type !== "iot" && project.type !== "weather" && project.type !== "network") return;
    const interval = setInterval(() => {
      const newData = {
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        light: Math.floor(Math.random() * 100) + 200,
        ac: Math.floor(Math.random() * 5) + 22,
        heater: Math.floor(Math.random() * 10) + 40,
      };

      setData((prev) => [...prev.slice(1), newData]);

      if (newData.heater > 48) {
        setAlerts((prev) => [`[${newData.time}] ALERT: Heater threshold exceeded (${newData.heater}°C)`, ...prev.slice(0, 4)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [project.type]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-40 space-y-16"
    >
      <nav className="relative z-40 glass border-b border-primary/10 mb-8 rounded-b-3xl h-20 flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <motion.button whileHover={{ scale: 1.1, x: -5 }} whileTap={{ scale: 0.9 }} onClick={onBack} className="p-3 hover:bg-primary/10 rounded-2xl transition-colors text-slate-600 dark:text-slate-300">
            <ArrowLeft size={24} />
          </motion.button>
          <span className="font-bold text-xl tracking-tight">Project Detail</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 hover:bg-primary/10 rounded-2xl transition-colors text-slate-600 dark:text-slate-300"><Share2 size={22} /></button>
          <button className="p-3 hover:bg-primary/10 rounded-2xl transition-colors text-slate-600 dark:text-slate-300"><MoreVertical size={22} /></button>
        </div>
      </nav>

      <div className="space-y-16">
        <ProjectHero project={project} />
        {project.overview && <ProjectOverview overview={project.overview} />}
        {project.problem && <ProjectProblem problem={project.problem} detail={project.problemDetail} />}
        {project.impact && <ImpactInsights impact={project.impact} insights={project.insights} />}

        {projectId === 8 && <IoTDashboard data={data} alerts={alerts} />}
        {projectId === 1 && <MLDashboard />}
        {projectId === 4 && <EcommerceDashboard />}
        {projectId === 5 && <NetworkDashboard />}
        {projectId === 2 && <GymDashboard />}
        {projectId === 3 && <WeatherDashboard data={data} />}
        {projectId === 10 && <EnergyPipelineDashboard />}

        {/* Github Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex justify-center pt-8"
        >
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold transition-all hover:bg-slate-800 border border-white/10 shadow-2xl"
          >
            <Github size={24} /> View on GitHub
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};
