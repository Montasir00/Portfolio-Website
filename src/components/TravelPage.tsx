import { motion } from "motion/react";
import { ArrowLeft, MapPin, Calendar, Camera, Plane, Globe, Compass } from "lucide-react";

interface TravelPageProps {
  onBack: () => void;
}

export const TravelPage = ({ onBack }: TravelPageProps) => {
  const travels = [
    {
      name: "Messina, Italy",
      date: "Current Residence",
      img: "https://picsum.photos/seed/messina/1200/600",
      desc: "The gateway to Sicily, known for its sickle-shaped harbor and the world's largest astronomical clock.",
      highlights: ["Piazza del Duomo", "Strait of Messina", "Regional Museum of Messina"],
      story: "Living in Messina has been a transformative experience. The city's unique position between the Tyrrhenian and Ionian seas creates a microclimate and a visual landscape that is constantly changing. The daily sight of the ferries crossing the strait is a reminder of the city's historical importance as a Mediterranean hub."
    },
    {
      name: "Taormina, Italy",
      date: "Visited June 2024",
      img: "https://picsum.photos/seed/taormina/1200/600",
      desc: "A stunning hilltop town on the east coast of Sicily, sitting near Mount Etna.",
      highlights: ["Teatro Antico di Taormina", "Isola Bella", "Corso Umberto"],
      story: "Taormina is where history meets luxury. Standing in the ancient Greek theater with Mount Etna smoking in the background is a moment I'll never forget. The contrast between the ancient stone and the deep blue sea is a photographer's dream."
    },
    {
      name: "Mount Etna, Italy",
      date: "Visited August 2024",
      img: "https://picsum.photos/seed/etna/1200/600",
      desc: "One of the world's most active volcanoes and the highest peak in Italy south of the Alps.",
      highlights: ["Silvestri Craters", "Lava Tunnels", "Rifugio Sapienza"],
      story: "Hiking Etna felt like walking on the moon. The black volcanic sand and the silence at the higher altitudes are hauntingly beautiful. It's a powerful reminder of nature's raw energy and the geological forces that shaped the Mediterranean."
    },
    {
      name: "Palermo, Italy",
      date: "Visited October 2024",
      img: "https://picsum.photos/seed/palermo/1200/600",
      desc: "The vibrant capital of Sicily, famous for its architecture, culture, and street food.",
      highlights: ["Palermo Cathedral", "Teatro Massimo", "Ballarò Market"],
      story: "Palermo is a sensory overload in the best way possible. The mix of Arab-Norman architecture and the bustling energy of the markets creates a unique atmosphere that you won't find anywhere else in Europe."
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
          <ArrowLeft size={16} /> Back to Interests
        </motion.button>
        
        <div className="space-y-4 border-l-4 border-emerald-500 pl-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">Travel Journal</h1>
          <p className="text-slate-500 text-xl max-w-2xl leading-relaxed">
            A comprehensive record of my explorations across the Mediterranean and beyond. Each journey is a lesson in history, culture, and perspective.
          </p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Countries", value: "12", icon: <Globe size={20} /> },
          { label: "Cities", value: "45", icon: <MapPin size={20} /> },
          { label: "Photos Taken", value: "12k+", icon: <Camera size={20} /> },
          { label: "Miles Traveled", value: "25k+", icon: <Plane size={20} /> },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            className="p-6 bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl text-center space-y-2"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-2">
              {stat.icon}
            </div>
            <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Travel List */}
      <div className="space-y-20">
        {travels.map((travel, i) => (
          <motion.section 
            key={i} 
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className={`space-y-8 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-emerald-500">
                  <Calendar size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">{travel.date}</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tight">{travel.name}</h2>
                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {travel.desc}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Highlights</h3>
                <div className="flex flex-wrap gap-3">
                  {travel.highlights.map(h => (
                    <span key={h} className="px-4 py-2 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10 rounded-xl text-xs font-bold">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-slate-100 dark:border-white/5 italic text-slate-500 dark:text-slate-400 leading-relaxed">
                "{travel.story}"
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-emerald-500/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src={travel.img} 
                  alt={travel.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Compass size={18} className="animate-spin-slow" />
                    Explore Gallery
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </motion.div>
  );
};
