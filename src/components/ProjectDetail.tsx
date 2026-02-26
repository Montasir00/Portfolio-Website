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
  CreditCard,
  Calendar,
  Network,
  ShieldCheck,
  Server,
  CloudRain,
  Wind,
  Thermometer,
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
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
    <div className="absolute inset-0 data-grid-bg opacity-10 z-10"></div>
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
      referrerPolicy="no-referrer"
    />
    <div className="absolute bottom-0 left-0 p-10 md:p-16 z-20 w-full">
      <div className="flex items-center gap-4 mb-6">
        <span className="bg-primary/20 text-primary border border-primary/30 text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-[0.3em]">
          {project.systemStatus}
        </span>
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--color-primary)]"></div>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold text-white leading-[0.9] tracking-tighter">
        {project.title}
      </h1>
      <div className="flex items-center gap-12 mt-10 border-t border-white/10 pt-8">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.2em]">Category</span>
          <span className="text-base text-primary font-bold">{project.category}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.2em]">Status</span>
          <span className="text-base text-emerald-500 font-bold">{project.status}</span>
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
                <span>Strong Positive Correlation (0.85)</span>
              </div>
              <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <span>Strong Negative Correlation (-0.72)</span>
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

      <div className="bg-white dark:bg-card-dark p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl">
        <h4 className="text-lg font-bold mb-6 flex items-center gap-3">
          <BarChart className="text-purple-500" size={20} /> Confusion Matrix
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "TP", val: 94, color: "bg-emerald-500" },
            { label: "FP", val: 6, color: "bg-rose-500/20" },
            { label: "FN", val: 4, color: "bg-rose-500/40" },
            { label: "TN", val: 88, color: "bg-emerald-500/60" },
          ].map((cell) => (
            <div key={cell.label} className={`aspect-square rounded-2xl ${cell.color} flex flex-col items-center justify-center p-4`}>
              <span className="text-2xl font-bold text-white">{cell.val}%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{cell.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.section>
);

const NetworkDashboard = ({ data }: { data: any[] }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="space-y-12"
  >
    <div className="space-y-4">
      <h2 className="text-primary font-bold uppercase tracking-widest text-xs">Protocol Performance</h2>
      <h3 className="text-4xl font-bold tracking-tight flex items-center gap-4">
        AODV Simulation Metrics
        <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-full uppercase tracking-widest border border-blue-500/20">Real-time Graph</span>
      </h3>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white dark:bg-card-dark p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-lg font-bold flex items-center gap-3">
            <Network className="text-primary" size={20} /> Packet Delivery Ratio
          </h4>
          <span className="text-[10px] text-primary font-bold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">Target: &gt;90%</span>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPDR" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis domain={[80, 100]} stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
              <Area type="monotone" dataKey="light" name="PDR %" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorPDR)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 space-y-8">
        <h4 className="text-lg font-bold text-white flex items-center gap-3">
          <Zap className="text-amber-500" size={20} /> Network Topology
        </h4>
        <div className="relative aspect-square flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-dashed border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute inset-8 border border-white/10 rounded-full"></div>
          <div className="relative z-10 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-slate-900 shadow-[0_0_30px_var(--color-primary)]">
            <Server size={24} />
          </div>
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 bg-slate-800 border border-white/20 rounded-lg flex items-center justify-center text-white"
              animate={{
                x: Math.cos((deg * Math.PI) / 180) * 100,
                y: Math.sin((deg * Math.PI) / 180) * 100,
              }}
            >
              <Cpu size={16} />
            </motion.div>
          ))}
        </div>
        <div className="space-y-4 pt-4">
          <div className="flex justify-between text-xs"><span className="text-slate-400">Active Nodes</span><span className="text-white">24</span></div>
          <div className="flex justify-between text-xs"><span className="text-slate-400">Avg. Latency</span><span className="text-white">42ms</span></div>
          <div className="flex justify-between text-xs"><span className="text-slate-400">Route Discovery</span><span className="text-emerald-500">Active</span></div>
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
      <h2 className="text-primary font-bold uppercase tracking-widest text-xs">Management Overview</h2>
      <h3 className="text-4xl font-bold tracking-tight flex items-center gap-4">
        Gym Operations
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full uppercase tracking-widest border border-emerald-500/20">Live Stats</span>
      </h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: "Total Members", val: "1,248", icon: <Users />, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Monthly Revenue", val: "$42,500", icon: <CreditCard />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { label: "Active Classes", val: "18", icon: <Calendar />, color: "text-purple-500", bg: "bg-purple-500/10" },
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

    <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-10 overflow-hidden relative shadow-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h4 className="text-2xl font-bold text-white tracking-tight">Automated Subscription Engine</h4>
          <p className="text-slate-400 leading-relaxed">
            The system automatically handles billing cycles, renewal notifications, and access control.
            Integrated with a PHP backend and MySQL database for high reliability.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest">
              <ShieldCheck size={16} /> Secure Payments
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
              <Bell size={16} /> Auto Reminders
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Recent Activity</p>
          {[
            "New member registration: John Doe",
            "Subscription renewed: Sarah Smith",
            "Payment received: $49.99 (Premium Plan)",
            "Class reminder sent: Morning Yoga",
          ].map((log, i) => (
            <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-slate-300">
              <span className="text-primary mr-2">&gt;&gt;</span> {log}
            </div>
          ))}
        </div>
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

export const ProjectDetail = ({ onBack }: ProjectDetailProps) => {
  const { projectId: projectIdParam } = useParams<{ projectId: string }>();
  const projectId = projectIdParam ? parseInt(projectIdParam) : 8;

  const [data, setData] = useState(generateData());
  const [alerts, setAlerts] = useState<string[]>([]);

  const project = PROJECTS_METADATA[projectId] || PROJECTS_METADATA[8];

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
      <nav className="sticky top-0 z-50 glass border-b border-primary/10 -mx-6 px-6 h-20 flex items-center justify-between">
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
        {projectId === 3 && <MLDashboard />}
        {projectId === 10 && <NetworkDashboard data={data} />}
        {projectId === 14 && <GymDashboard />}
        {projectId === 1 && <WeatherDashboard data={data} />}

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
