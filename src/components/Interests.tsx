import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TravelMap } from "./TravelMap";
import {
  Camera,
  Plane,
  Cpu,
  Book,
  Gamepad2,
  Globe,
  X,
  BookOpen,
  MapPin,
  ArrowRight,
  ZoomIn,
} from "lucide-react";
import { BOOKS_DATA, Book as BookType } from "../constants/books";
import { travelChapters } from "../constants/travel";
interface InterestsProps {
  onNavigate: (page: string) => void;
}

export const Interests = ({ onNavigate }: InterestsProps) => {
  const [lightboxImg, setLightboxImg] = useState<null | { name: string; img: string; imgWide: string; desc: string; details: string }>(null);
  const [selectedBook, setSelectedBook] = useState<null | BookType>(null);

  const books = BOOKS_DATA.slice(0, 4);

  const otherInterests = [
    {
      title: "Photography",
      icon: <Camera size={32} />,
      desc: "Capturing moments and exploring visual storytelling through the lens.",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "AI & Robotics",
      icon: <Cpu size={32} />,
      desc: "Keeping up with the latest advancements in machine learning and hardware.",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Gaming",
      icon: <Gamepad2 size={32} />,
      desc: "Enjoying immersive RPGs and competitive strategy games in my downtime.",
      color: "bg-rose-500/10 text-rose-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
      className="space-y-24 pb-32"
    >
      {/* Header */}
      <div className="space-y-6 border-l-4 border-primary pl-6">
        <div className="space-y-1">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">
            Beyond the screen
          </p>
          <h2 className="text-4xl font-bold tracking-tight">
            Interests & Hobbies
          </h2>
        </div>
        <blockquote className="space-y-2">
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed italic">
            "Men seek retreats for themselves—houses in the country, seashores,
            mountains. But nowhere can a man find a quieter or more untroubled
            retreat than in his own soul."
          </p>
          <footer className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            — Marcus Aurelius
          </footer>
        </blockquote>
      </div>

      {/* Travel Chapter Gallery */}
      <section className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
                <Plane size={28} />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">
                Travel Explorations
              </h3>
            </div>
            <blockquote className="space-y-2 border-l-2 border-emerald-500/30 pl-4">
              <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed italic">
                "Observe constantly that all things take place by change."
              </p>
              <footer className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                — Marcus Aurelius
              </footer>
            </blockquote>
            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
              From the volcanic heights of Etna to the historic streets of
              Messina, each place has shaped how I see systems, culture, and
              resilience.
            </p>
          </div>
        </div>

        {/* World Map */}
        <TravelMap onLocationClick={(locationName) => {
          const id = `chapter-${locationName.replace(/\s+/g, '-')}`;
          const el = document.getElementById(id);
          if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }} />

        <div className="space-y-12">
          {travelChapters.map((chapter) => (
            <div key={chapter.chapter} id={`chapter-${chapter.chapter.replace(/\s+/g, '-')}`} className="space-y-5">
              {/* Chapter Header */}
              <div className={`flex items-center gap-4 pb-4 border-b-2 ${chapter.color}`}>
                <span className="text-2xl">{chapter.emoji}</span>
                <div className="flex-1">
                  <h4 className="text-xl font-bold tracking-tight">{chapter.chapter}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{chapter.intro}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${chapter.badgeColor} uppercase tracking-widest flex-shrink-0`}>
                  {chapter.year}
                </span>
              </div>

              {/* Photo Grid with readable text overlay */}
              <div className={`grid gap-3 ${chapter.places.length === 1
                ? "grid-cols-1"
                : chapter.places.length <= 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                }`}>
                {chapter.places.map((place, j) => (
                  <motion.div
                    key={j}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className={`relative group cursor-pointer overflow-hidden rounded-2xl ${chapter.places.length === 1 ? "h-64" : "h-44"}`}
                    onClick={() => setLightboxImg(place)}
                  >
                    {/* Photo */}
                    <img
                      src={place.img}
                      alt={place.name}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter saturate-50 contrast-110 group-hover:filter-none"
                    />
                    {/* Blueprint overlay */}
                    <div className="absolute inset-0 bg-primary/20 mix-blend-color pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
                    {/* Strong gradient — dark enough to guarantee contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-0" />
                    {/* Zoom icon */}
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn size={14} />
                    </div>
                    {/* Text — always readable */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: chapter.color.includes("emerald") ? "#10b981" : chapter.color.includes("blue") ? "#3b82f6" : chapter.color.includes("yellow") ? "#eab308" : chapter.color.includes("orange") ? "#f97316" : chapter.color.includes("cyan") ? "#22d3ee" : "#10b981" }}>
                        <MapPin size={10} />
                        {place.name}
                      </div>
                      <p className="text-white text-xs leading-relaxed line-clamp-2">
                        {place.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 lg:p-20 bg-black/40 backdrop-blur-xl"
            onClick={() => setLightboxImg(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-3xl w-full max-w-6xl max-h-[85vh] md:max-h-[80vh] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.3)] border border-white/20 dark:border-white/10 flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button (Desktop - Floating) */}
              <button
                onClick={() => setLightboxImg(null)}
                className="hidden md:flex absolute top-8 right-8 z-50 p-4 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-xl text-slate-800 dark:text-white rounded-full transition-all hover:rotate-90 border border-black/5 dark:border-white/10"
              >
                <X size={24} />
              </button>

              {/* Image Section */}
              <div className="relative w-full md:w-1/2 lg:w-3/5 h-[35vh] md:h-auto overflow-hidden bg-slate-900">
                {/* Subtle base filter for aesthetic conformity in lightbox */}
                <div className="absolute inset-0 bg-primary/5 mix-blend-color pointer-events-none z-10" />
                <img
                  src={lightboxImg.imgWide}
                  alt={lightboxImg.name}
                  className="w-full h-full object-cover filter contrast-110 saturate-75"
                />
                {/* Mobile Close Button */}
                <button
                  onClick={() => setLightboxImg(null)}
                  className="md:hidden absolute top-6 right-6 p-3 bg-black/50 backdrop-blur-md text-white rounded-2xl"
                >
                  <X size={20} />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-8 md:p-12 lg:p-16 overflow-y-auto no-scrollbar flex flex-col justify-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                      <MapPin size={20} className="animate-bounce" />
                      <span className="text-xs font-bold uppercase tracking-[0.4em]">
                        {lightboxImg.name}
                      </span>
                    </div>
                    <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.85] text-slate-900 dark:text-white">
                      {lightboxImg.name}
                    </h3>
                  </div>

                  <p className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-tight font-medium tracking-tight">
                    {lightboxImg.desc}
                  </p>

                  <div className="h-px bg-slate-200 dark:bg-white/10 w-24" />

                  <div className="space-y-6">
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-base md:text-lg">
                      {lightboxImg.details}
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => setLightboxImg(null)}
                      className="w-full md:w-auto px-10 py-5 bg-primary text-slate-900 font-bold rounded-2xl hover:scale-105 transition-transform shadow-2xl shadow-primary/30 uppercase tracking-[0.2em] text-[10px]"
                    >
                      Return to Gallery
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reading Section */}
      <section className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl">
                <Book size={28} />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">
                Books I've Read
              </h3>
            </div>
            <blockquote className="space-y-2 border-l-2 border-amber-500/30 pl-4">
              <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed italic">
                "Look within. Within is the fountain of good, and it will ever
                bubble up, if thou wilt ever dig."
              </p>
              <footer className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                — Marcus Aurelius
              </footer>
            </blockquote>
            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
              A selection of books that have influenced how I think, reason, and
              approach both technical and personal challenges.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("interests/books")}
            className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs group"
          >
            See All{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setSelectedBook(book)}
              className="group bg-white dark:bg-card-dark rounded-3xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-lg flex flex-col cursor-pointer transition-all hover:border-primary/50"
            >
              <div className="h-48 w-full overflow-hidden relative bg-slate-900">
                <img src={`${import.meta.env.BASE_URL}${book.img}`} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 filter saturate-50 contrast-110 group-hover:filter-none" referrerPolicy="no-referrer" />
                {/* Blueprint overlay */}
                <div className="absolute inset-0 bg-primary/20 mix-blend-color pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${book.status === "Reading" ? "bg-amber-500 text-white" : "bg-emerald-500 text-white"}`}>
                    {book.status}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                    {book.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                    {book.author}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Book Modal */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-xl" onClick={() => setSelectedBook(null)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-3xl w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl border border-white/20 dark:border-white/10 space-y-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center text-amber-500">
                  <img src={selectedBook.img} alt={selectedBook.title} className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl transition-colors text-slate-500 dark:text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {selectedBook.title}
                </h3>
                <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest">
                  <span>{selectedBook.author}</span>
                  <div className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
                  <span>{selectedBook.status}</span>
                </div>
              </div>

              <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10 max-h-48 overflow-y-auto no-scrollbar">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic text-sm md:text-base">
                  "{selectedBook.desc}"
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Other Interests */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {otherInterests.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="p-10 bg-white dark:bg-card-dark rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl transition-all group"
          >
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors ${item.color} group-hover:bg-opacity-20`}
            >
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">
              {item.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Featured Interest */}
      <motion.section
        variants={itemVariants}
        className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-primary/20 p-12 md:p-16 text-center shadow-2xl"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none data-grid-bg"></div>
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 p-1.5 px-4 bg-primary/10 border border-primary/20 text-primary rounded-full text-[10px] font-bold tracking-[0.3em] uppercase">
            <Globe size={14} />
            Global Perspective
          </div>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
            Exploring the Mediterranean
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Currently based in Messina, I spend my weekends exploring the rich
            history and stunning landscapes of Sicily. This environment provides
            endless inspiration for my creative and technical work.
          </p>
        </div>
      </motion.section>
    </motion.div>
  );
};
