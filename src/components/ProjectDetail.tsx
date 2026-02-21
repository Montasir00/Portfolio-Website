import { motion } from "motion/react";
import { ArrowLeft, Share2, MoreVertical, AlertCircle, Gauge, Cloud, Github, Bookmark, BarChart, Code as CodeIcon, Activity, Play, FileCode, Database as DbIcon, Terminal } from "lucide-react";
import { LiveDashboard } from "./LiveDashboard";

interface ProjectDetailProps {
  onBack: () => void;
}

export const ProjectDetail = ({ onBack }: ProjectDetailProps) => {
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
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
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
          <span className="font-bold text-xl tracking-tight">Project Detail</span>
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
            src="https://picsum.photos/seed/traffic/1200/800" 
            alt="Data dashboard" 
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-0 left-0 p-10 md:p-16 z-20 w-full">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-primary/20 text-primary border border-primary/30 text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-[0.3em]">System Status: Active</span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--color-primary)]"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[0.9] tracking-tighter">
              IoT Energy<br />Management System
            </h1>
            <div className="flex items-center gap-12 mt-10 border-t border-white/10 pt-8">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.2em]">Category</span>
                <span className="text-base text-primary font-bold">Analytics</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.2em]">Deployment</span>
                <span className="text-base text-slate-300 font-bold">Ongoing</span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Overview */}
        <motion.section variants={itemVariants} className="space-y-6 border-l-4 border-primary/30 pl-10">
          <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">Overview</h2>
          <div className="space-y-8 text-2xl leading-relaxed text-slate-600 dark:text-slate-300 font-medium tracking-tight">
            <p>
              Built a real-time IoT data pipeline using Docker Compose and Python for continuous sensor analytics. This system automates data ingestion, preprocessing, and anomaly detection with an alert-based monitoring system.
            </p>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
              Improved system reliability and reduced manual data handling through containerized deployment, ensuring seamless scalability and consistent performance across different environments.
            </p>
          </div>
        </motion.section>

        {/* Problem */}
        <motion.section variants={itemVariants} className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-12 md:p-16 space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="flex flex-col md:flex-row items-start gap-10 relative z-10">
            <div className="bg-primary/20 p-5 rounded-2xl shadow-xl shadow-primary/10">
              <AlertCircle className="text-primary" size={40} />
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-white tracking-tight">The Problem</h2>
              <blockquote className="border-l-4 border-primary pl-8 italic text-slate-300 text-2xl leading-relaxed font-medium">
                "Manual data handling and lack of real-time monitoring leads to delayed responses in industrial energy management."
              </blockquote>
              <p className="text-slate-400 leading-relaxed text-lg">
                The challenge was to create a system that could ingest high-frequency sensor data, process it in real-time, and provide immediate alerts for anomalies without human intervention.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Methodology */}
        <motion.section variants={itemVariants} className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">Live Demo</h2>
            <h3 className="text-4xl font-bold tracking-tight flex items-center gap-4">
              Interactive Dashboard
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full uppercase tracking-widest border border-emerald-500/20 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                Live Data
              </span>
            </h3>
          </div>
          <LiveDashboard />
        </motion.section>

        {/* Methodology */}
        <motion.section variants={itemVariants} className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">Methodology</h2>
            <h3 className="text-4xl font-bold tracking-tight">Pipeline & Architecture</h3>
          </div>

          {/* Chart Placeholder */}
          <div className="bg-white dark:bg-card-dark p-12 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl">
            <div className="flex justify-between items-end h-80 gap-6">
              {[40, 65, 55, 90, 45, 75, 60].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 1.5, ease: "circOut" }}
                  className="bg-primary/10 border-t-4 border-primary/40 w-full rounded-t-xl transition-all hover:bg-primary/30"
                />
              ))}
            </div>
            <div className="mt-10 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
              <span>0.00ms</span>
              <span>Weekly Throughput Optimization Trend</span>
              <span>100.00ms</span>
            </div>
          </div>

          {/* Code Snippet */}
          <div className="bg-[#0a0f1d] border border-white/10 rounded-[2rem] p-10 overflow-x-auto font-mono text-base leading-relaxed text-slate-400 shadow-2xl">
            <div className="flex gap-3 mb-8">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500/80"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-green-500/80"></div>
            </div>
            <p><span className="text-primary">import</span> pandas <span className="text-primary">as</span> pd</p>
            <p><span className="text-primary">import</span> docker</p>
            <p className="mt-6 text-slate-600"># Initialize IoT data pipeline</p>
            <p>client = docker.from_env()</p>
            <p>container = client.containers.run(<span className="text-amber-300">"energy-monitor"</span>, detach=<span className="text-primary">True</span>)</p>
            <p className="mt-6 text-slate-600"># Process sensor stream</p>
            <p>df = pd.read_sql(<span className="text-amber-300">"SELECT * FROM sensors"</span>, engine)</p>
          </div>
        </motion.section>

        {/* Key Findings */}
        <motion.section variants={itemVariants} className="space-y-10">
          <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">Key Findings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Gauge className="text-primary" />, title: "18% Faster", desc: "Average reduction in peak-hour travel time." },
              { icon: <Cloud className="text-primary" />, title: "12% Less CO2", desc: "Estimated decrease in vehicle emissions." },
              { icon: <BarChart className="text-primary" />, title: "94% Accuracy", desc: "Prediction precision for congestion events." },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10, borderColor: 'rgba(17, 180, 212, 0.4)' }}
                className="bg-slate-800/30 p-10 rounded-[2rem] border border-white/5 transition-all group shadow-xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                  {item.icon}
                </div>
                <h4 className="font-bold text-2xl mb-3 text-white tracking-tight">{item.title}</h4>
                <p className="text-base text-slate-400 leading-relaxed">{item.desc}</p>
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
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Refined Repository</h3>
                <p className="text-slate-400 max-w-lg mx-auto text-xl leading-relaxed">Direct access to the technical core of the project. No fluff, just the implementation.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <motion.a 
                  href="#"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl text-left group"
                >
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                    <FileCode size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-white">analysis.ipynb</p>
                    <p className="text-xs text-slate-500">Jupyter Notebook • 4.2MB</p>
                  </div>
                </motion.a>
                <motion.a 
                  href="#"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl text-left group"
                >
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                    <DbIcon size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-white">schema.sql</p>
                    <p className="text-xs text-slate-500">Database Schema • 12KB</p>
                  </div>
                </motion.a>
                <motion.a 
                  href="#"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl text-left group"
                >
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                    <Terminal size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-white">train_model.py</p>
                    <p className="text-xs text-slate-500">Python Script • 28KB</p>
                  </div>
                </motion.a>
                <motion.a 
                  href="https://github.com/Montasir00"
                  target="_blank"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl text-left group"
                >
                  <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                    <Github size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-white">Full Repository</p>
                    <p className="text-xs text-slate-500">GitHub • Public Access</p>
                  </div>
                </motion.a>
              </div>

              <motion.button 
                onClick={() => window.open('https://github.com/Montasir00', '_blank')}
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

      {/* Floating Actions */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center bg-slate-800/90 backdrop-blur-3xl border border-white/10 rounded-full px-10 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] gap-12 z-50"
      >
        <button className="flex flex-col items-center gap-1.5 text-primary group">
          <BarChart size={22} className="group-hover:scale-110 transition-transform" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Story</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-primary transition-colors group">
          <Activity size={22} className="group-hover:scale-110 transition-transform" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Data</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-primary transition-colors group">
          <CodeIcon size={22} className="group-hover:scale-110 transition-transform" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Code</span>
        </button>
        <div className="h-10 w-[1px] bg-white/10"></div>
        <button className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-primary transition-colors group">
          <Bookmark size={22} className="group-hover:scale-110 transition-transform" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Save</span>
        </button>
      </motion.div>
    </motion.div>
  );
};
