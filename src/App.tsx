/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home as HomeIcon,
  Grid,
  User,
  Mail,
  Menu,
  X,
  BarChart2,
  Compass,
  Briefcase,
} from "lucide-react";
import { Home } from "./components/Home";
import { Projects } from "./components/Projects";
import { ProjectDetail } from "./components/ProjectDetail";
import { About } from "./components/About";
import { Interests } from "./components/Interests";
import { Contact } from "./components/Contact";
import { TravelPage } from "./components/TravelPage";
import { BooksPage } from "./components/BooksPage";
import { Experience } from "./components/Experience";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const handleProjectSelect = (projectId: number) => {
    setSelectedProjectId(projectId);
    setActivePage("project-detail");
  };

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Home onNavigate={setActivePage} />;
      case "projects":
        return <Projects onNavigate={setActivePage} onProjectSelect={handleProjectSelect} />;
      case "project-detail":
        return (
          <ProjectDetail
            projectId={selectedProjectId}
            onBack={() => setActivePage("projects")}
          />
        );
      case "interests":
        return <Interests onNavigate={setActivePage} />;
      case "travel-all":
        return <TravelPage onBack={() => setActivePage("interests")} />;
      case "books-all":
        return <BooksPage onBack={() => setActivePage("interests")} />;
      case "experience":
        return <Experience onBack={() => setActivePage("home")} />;
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
    { id: "experience", label: "Experience", icon: <Briefcase size={22} /> },
    { id: "interests", label: "Interests", icon: <Compass size={22} /> },
    { id: "about", label: "About", icon: <User size={22} /> },
    { id: "contact", label: "Contact", icon: <Mail size={22} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-background-dark">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-primary/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setActivePage("home")}
          >
            <div className="bg-primary text-slate-900 p-2.5 rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20">
              <BarChart2 size={22} />
            </div>
            <span className="font-bold tracking-tighter text-xl md:text-2xl font-mono italic whitespace-nowrap">
              FAZLUR RAHMAN
            </span>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={`desktop-${item.id}`}
                onClick={() => setActivePage(item.id)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${activePage === item.id
                  ? "text-primary"
                  : "text-slate-500 hover:text-primary/70"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger Menu (Visually hidden on large desktop) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 hover:bg-primary/10 rounded-2xl transition-colors text-slate-600 dark:text-slate-300 z-50"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-full left-0 right-0 glass border-b border-primary/10 p-6 flex flex-col gap-4 shadow-2xl"
            >
              {navItems.map((item) => (
                <button
                  key={`mobile-${item.id}`}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${activePage === item.id
                    ? "bg-primary/10 text-primary"
                    : "text-slate-500 hover:bg-primary/5"
                    }`}
                >
                  <div className={activePage === item.id ? "text-primary" : "text-slate-400"}>
                    {item.icon}
                  </div>
                  <span className="font-bold uppercase tracking-widest text-sm">
                    {item.label}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
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

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-primary/10 pb-6 pt-3">
        <div className="flex px-4 justify-between items-center max-w-md mx-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center gap-1 transition-all relative min-w-[56px] ${activePage === item.id
                ? "text-primary"
                : "text-slate-400 hover:text-primary/70"
                }`}
            >
              <motion.div
                animate={activePage === item.id ? { y: -2 } : { y: 0 }}
                className="flex h-7 items-center justify-center"
              >
                {item.icon}
              </motion.div>
              <p className="text-[10px] font-bold tracking-tight uppercase">
                {item.label}
              </p>
              {activePage === item.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(17,180,212,0.8)]"
                />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
