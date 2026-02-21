/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home as HomeIcon, Grid, User, Mail, Menu, BarChart2, Compass } from "lucide-react";
import { Home } from "./components/Home";
import { Projects } from "./components/Projects";
import { ProjectDetail } from "./components/ProjectDetail";
import { About } from "./components/About";
import { Interests } from "./components/Interests";
import { Contact } from "./components/Contact";
import { TravelPage } from "./components/TravelPage";
import { BooksPage } from "./components/BooksPage";

export default function App() {
  const [activePage, setActivePage] = useState("home");

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Home onNavigate={setActivePage} />;
      case "projects":
        return <Projects onNavigate={setActivePage} />;
      case "project-detail":
        return <ProjectDetail onBack={() => setActivePage("projects")} />;
      case "interests":
        return <Interests onNavigate={setActivePage} />;
      case "travel-all":
        return <TravelPage onBack={() => setActivePage("interests")} />;
      case "books-all":
        return <BooksPage onBack={() => setActivePage("interests")} />;
      case "about":
        return <About onBack={() => setActivePage("home")} />;
      case "contact":
        return <Contact />;
      default:
        return <Home onNavigate={setActivePage} />;
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: <HomeIcon size={22} /> },
    { id: "projects", label: "Projects", icon: <Grid size={22} /> },
    { id: "interests", label: "Interests", icon: <Compass size={22} /> },
    { id: "about", label: "About", icon: <User size={22} /> },
    { id: "contact", label: "Contact", icon: <Mail size={22} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-background-dark">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-primary/10 px-8 py-5 flex items-center justify-between">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-4 cursor-pointer" 
          onClick={() => setActivePage('home')}
        >
          <div className="bg-primary text-slate-900 p-2.5 rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20">
            <BarChart2 size={22} />
          </div>
          <span className="font-bold tracking-tighter text-2xl font-mono italic">FAZLUR RAHMAN</span>
        </motion.div>
        <button className="p-3 hover:bg-primary/10 rounded-2xl transition-colors text-slate-600 dark:text-slate-300">
          <Menu size={24} />
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-primary/10 pb-10 pt-5">
        <div className="flex max-w-xl mx-auto px-10 justify-between items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center gap-1.5 transition-all relative ${
                activePage === item.id 
                  ? "text-primary" 
                  : "text-slate-400 hover:text-primary/70"
              }`}
            >
              <motion.div 
                animate={activePage === item.id ? { y: -4 } : { y: 0 }}
                className="flex h-8 items-center justify-center"
              >
                {item.icon}
              </motion.div>
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase">{item.label}</p>
              {activePage === item.id && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute -bottom-2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(17,180,212,0.8)]"
                />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
