import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Plane, Cpu, Book, Gamepad2, Globe, X, ChevronRight, BookOpen, MapPin, Sparkles, ArrowRight } from "lucide-react";
// No AI features initialized



interface InterestsProps {
  onNavigate: (page: string) => void;
}

export const Interests = ({ onNavigate }: InterestsProps) => {
  const [selectedTravel, setSelectedTravel] = useState<any>(null);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const travelPlaces = [
    {
      name: "Messina, Italy",
      img: "https://picsum.photos/seed/messina/800/450",
      desc: "My current home. A city of history, stunning straits, and the gateway to Sicily.",
      details: "Known for its 12th-century cathedral and the world's largest astronomical clock. The view of the Strait of Messina is unparalleled."
    },
    {
      name: "Taormina, Italy",
      img: "https://picsum.photos/seed/taormina/800/450",
      desc: "The pearl of the Ionian Sea. Famous for its ancient Greek theater and breathtaking views of Etna.",
      details: "A hilltop town with narrow medieval streets and the beautiful Isola Bella beach."
    },
    {
      name: "Mount Etna, Italy",
      img: "https://picsum.photos/seed/etna/800/450",
      desc: "Europe's highest and most active volcano. A landscape that feels like another planet.",
      details: "Hiking the Silvestri Craters offers a surreal experience of volcanic ash and solidified lava flows."
    }
  ];

  const books = [
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      year: "2023",
      desc: "A cornerstone of software engineering wisdom.",
      details: "This book taught me that being a programmer is about more than just code; it's about craftsmanship, responsibility, and continuous learning."
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      year: "2022",
      desc: "The handbook for writing code that lasts.",
      details: "Focuses on the art of writing code that is readable, maintainable, and elegant. A must-read for any serious developer."
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
      year: "2023",
      desc: "Rules for focused success in a distracted world.",
      details: "Transformed how I approach my work day, emphasizing the importance of long periods of uninterrupted focus for complex tasks."
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      year: "2022",
      desc: "An easy way to build good habits and break bad ones.",
      details: "Provided a practical framework for making small, incremental changes that lead to remarkable results over time."
    }
  ];

  const otherInterests = [
    {
      title: "Photography",
      icon: <Camera size={32} />,
      desc: "Capturing moments and exploring visual storytelling through the lens.",
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      title: "AI & Robotics",
      icon: <Cpu size={32} />,
      desc: "Keeping up with the latest advancements in machine learning and hardware.",
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      title: "Gaming",
      icon: <Gamepad2 size={32} />,
      desc: "Enjoying immersive RPGs and competitive strategy games in my downtime.",
      color: "bg-rose-500/10 text-rose-500"
    }
  ];

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
      className="space-y-24 pb-32"
    >
      {/* Header */}
      <div className="space-y-4 border-l-4 border-primary pl-6">
        <h2 className="text-4xl font-bold tracking-tight">Interests & Hobbies</h2>
        <p className="text-slate-500 text-lg">What I do when I'm not crunching data or writing code.</p>
      </div>

      {/* Travel Section */}
      <section className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
                <Plane size={28} />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">Travel Explorations</h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
              Journey through the landscapes that inspire my work. From the volcanic heights of Etna to the historic streets of Messina, each place tells a story of culture and resilience.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('travel-all')}
            className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs group"
          >
            See All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelPlaces.map((place, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group bg-white dark:bg-card-dark rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-xl transition-all"
            >
              <div className="w-full aspect-video rounded-t-2xl overflow-hidden relative group">
                <img src={place.img} alt={place.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div
                className="p-8 space-y-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                onClick={() => setSelectedTravel(place)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-bold tracking-tight">{place.name}</h4>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {place.desc}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
                  <MapPin size={12} />
                  Click for details
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reading Section */}
      <section className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl">
                <Book size={28} />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">Books I've Read</h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
              A collection of literature that has shaped my technical mindset and personal growth. Exploring the intersection of software craftsmanship and behavioral psychology.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('books-all')}
            className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs group"
          >
            See All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setSelectedBook(book)}
              className="p-8 bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-white/5 shadow-lg cursor-pointer group hover:border-primary/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all">
                  <BookOpen size={24} />
                </div>
                <h4 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">{book.title}</h4>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">{book.author}</p>
              </div>
              <div className="mt-6 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>{book.year}</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Other Interests */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {otherInterests.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="p-10 bg-white dark:bg-card-dark rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl transition-all group"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors ${item.color} group-hover:bg-opacity-20`}>
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Modals */}
      <AnimatePresence>
        {selectedTravel && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-card-dark w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="relative h-64">
                <img src={selectedTravel.img} alt={selectedTravel.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelectedTravel(null)}
                  className="absolute top-6 right-6 p-3 bg-black/50 backdrop-blur-md text-white rounded-2xl hover:bg-black transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-10 space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <MapPin size={20} />
                  <span className="text-xs font-bold uppercase tracking-[0.3em]">{selectedTravel.name}</span>
                </div>
                <h3 className="text-4xl font-bold tracking-tighter">{selectedTravel.name}</h3>
                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {selectedTravel.desc}
                </p>
                <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    {selectedTravel.details}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {selectedBook && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-card-dark w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl border border-white/10 space-y-8"
            >
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <BookOpen size={32} />
                </div>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold tracking-tight">{selectedBook.title}</h3>
                <div className="flex items-center gap-4 text-slate-400 text-sm font-bold uppercase tracking-widest">
                  <span>{selectedBook.author}</span>
                  <div className="w-1 h-1 bg-slate-600 rounded-full" />
                  <span>{selectedBook.year}</span>
                </div>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {selectedBook.desc}
              </p>
              <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10">
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed italic">
                  "{selectedBook.details}"
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Featured Interest Section */}
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
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">Exploring the Mediterranean</h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Currently based in Messina, I spend my weekends exploring the rich history and stunning landscapes of Sicily. This environment provides endless inspiration for my creative and technical work.
          </p>
        </div>
      </motion.section>
    </motion.div>
  );
};
