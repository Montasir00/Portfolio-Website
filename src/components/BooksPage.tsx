import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Star,
  Clock,
  Bookmark,
  Quote,
  Library,
  Book as BookIcon,
} from "lucide-react";
import { BOOKS_DATA, BOOKS_CATEGORIES, Book } from "../constants/books";

interface BooksPageProps {
  onBack: () => void;
}

const ReadingStat = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-white/5 shadow-lg">
    <div className="text-amber-500">{icon}</div>
    <span className="font-bold text-slate-900 dark:text-white">{value}</span>
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
  </div>
);

const BookCard = ({ book, variants }: { book: Book; variants: any; key?: string }) => (
  <motion.div
    layout
    variants={variants}
    initial="hidden"
    animate="visible"
    exit="hidden"
    className="group bg-white dark:bg-card-dark rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl flex flex-col sm:flex-row h-full"
  >
    <div className="w-full sm:w-40 md:w-48 shrink-0 h-64 sm:h-auto relative overflow-hidden bg-slate-900 group/bookimage">
      <img
        src={`${import.meta.env.BASE_URL}${book.img}`}
        alt={book.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 filter saturate-50 contrast-110 group-hover:filter-none"
        referrerPolicy="no-referrer"
      />
      {/* Blueprint overlay */}
      <div className="absolute inset-0 bg-primary/20 mix-blend-color pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
      <div className="absolute top-4 left-4">
        <span
          className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${book.status === "Completed"
            ? "bg-emerald-500 text-white"
            : "bg-amber-500 text-white"
            }`}
        >
          {book.status}
        </span>
      </div>
    </div>

    <div className="flex-1 p-8 space-y-6 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em]">
              {book.category}
            </span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, idx) => (
                <Star
                  key={idx}
                  size={10}
                  className={idx < book.rating ? "fill-amber-500 text-amber-500" : "text-slate-300"}
                />
              ))}
            </div>
          </div>
          <h3 className="text-2xl font-bold tracking-tight group-hover:text-amber-500 transition-colors">
            {book.title}
          </h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            {book.author}
          </p>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          {book.desc}
        </p>
      </div>

      <div className="pt-6 border-t border-slate-100 dark:border-white/5 space-y-3">
        <div className="flex gap-3 text-amber-500/40">
          <Quote size={20} />
        </div>
        <p className="text-sm italic text-slate-400 leading-relaxed">
          {book.quote}
        </p>
      </div>
    </div>
  </motion.div>
);

export const BooksPage = ({ onBack }: BooksPageProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBooks = activeCategory === "All"
    ? BOOKS_DATA
    : BOOKS_DATA.filter(b => b.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

        <div className="space-y-4 border-l-4 border-amber-500 pl-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Library & Learning
          </h1>
          <p className="text-slate-500 text-xl max-w-2xl leading-relaxed">
            A curated collection of books that have influenced my perspective on
            technology, human behavior, and the art of living.
          </p>
        </div>
      </header>

      {/* Category Filter */}
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {BOOKS_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap uppercase tracking-widest ${activeCategory === cat
              ? "bg-amber-500 text-white shadow-xl shadow-amber-500/30"
              : "bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 text-slate-500 hover:border-amber-500/50"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredBooks.map((book) => (
            <BookCard key={book.title} book={book} variants={itemVariants} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Call to Action */}
      <motion.section
        variants={itemVariants}
        className="bg-amber-500 rounded-[2.5rem] p-12 text-center space-y-6 shadow-2xl shadow-amber-500/20"
      >
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto text-white">
          <BookIcon size={32} />
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Have a recommendation?
        </h2>
        <p className="text-white/80 max-w-xl mx-auto text-lg">
          I'm always looking for new perspectives. If you've read something that
          changed your life, I'd love to hear about it.
        </p>
        <button className="px-10 py-4 bg-white text-amber-500 font-bold rounded-2xl hover:scale-105 transition-transform">
          Send Recommendation
        </button>
      </motion.section>
    </motion.div>
  );
};
