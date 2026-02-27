/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Routes, Route, useLocation, useNavigate, Link } from "react-router-dom";
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
  ArrowRight,
  Github,
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
import { Analytics } from "@vercel/analytics/react";

// ScrollToTop component to handle scroll behavior
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top if it's a new page navigation (not a back/forward)
    // Actually, standard behavior for SPAs is to scroll to top on path change
    // unless we implement more complex scroll restoration.
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Derive active page from pathname
  const getActivePage = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path.startsWith("/projects")) return "projects";
    if (path.startsWith("/experience")) return "experience";
    if (path.startsWith("/interests")) return "interests";
    if (path.startsWith("/about")) return "about";
    if (path.startsWith("/contact")) return "contact";
    return "home";
  };

  const activePage = getActivePage();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { id: "home", label: "Home", icon: <HomeIcon size={22} />, path: "/" },
    { id: "projects", label: "Projects", icon: <Grid size={22} />, path: "/projects" },
    { id: "experience", label: "Experience", icon: <Briefcase size={22} />, path: "/experience" },
    { id: "interests", label: "Interests", icon: <Compass size={22} />, path: "/interests" },
    { id: "about", label: "About", icon: <User size={22} />, path: "/about" },
    { id: "contact", label: "Contact", icon: <Mail size={22} />, path: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-background-dark">
      <ScrollToTop />

      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-primary/10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => navigate("/")}
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
              <Link
                key={`desktop-${item.id}`}
                to={item.path}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${activePage === item.id
                  ? "text-primary"
                  : "text-slate-500 hover:text-primary/70"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 hover:bg-primary/10 rounded-2xl transition-colors text-slate-600 dark:text-slate-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 pt-24 pb-32 lg:pt-32 lg:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home onNavigate={(page) => navigate(`/${page === 'home' ? '' : page}`)} />} />
              <Route path="/projects" element={<Projects onNavigate={(page) => navigate(`/${page}`)} onProjectSelect={(id) => navigate(`/projects/${id}`)} />} />
              <Route path="/projects/:projectId" element={<ProjectDetail onBack={() => navigate("/projects")} />} />
              <Route path="/experience" element={<Experience onBack={() => navigate("/")} />} />
              <Route path="/interests" element={<Interests onNavigate={(page) => navigate(`/${page}`)} />} />
              <Route path="/interests/travel" element={<TravelPage onBack={() => navigate("/interests")} />} />
              <Route path="/interests/books" element={<BooksPage onBack={() => navigate("/interests")} />} />
              <Route path="/about" element={<About onBack={() => navigate("/")} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home onNavigate={(page) => navigate(`/${page === 'home' ? '' : page}`)} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-primary/10 pb-6 pt-3 px-4">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          {navItems.map((item) => (
            <Link
              key={`bottom-nav-${item.id}`}
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-all relative min-w-[64px] py-1 ${activePage === item.id
                ? "text-primary"
                : "text-slate-400 hover:text-primary/70"
                }`}
            >
              <motion.div
                animate={activePage === item.id ? { y: -4, scale: 1.1 } : { y: 0, scale: 1 }}
                className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${activePage === item.id ? "bg-primary/10" : ""}`}
              >
                {item.icon}
              </motion.div>
              <p className="text-[9px] font-bold tracking-widest uppercase">
                {item.label}
              </p>
              {activePage === item.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_12px_rgba(17,180,212,1)]"
                />
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
                onClick={() => { navigate("/"); setIsMenuOpen(false); }}
              >
                <div className="bg-primary text-slate-900 p-2.5 rounded-2xl shadow-lg shadow-primary/20">
                  <BarChart2 size={22} />
                </div>
                <span className="font-bold tracking-tighter text-xl font-mono italic text-white">
                  FAZLUR RAHMAN
                </span>
              </motion.div>
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(false)}
                className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors text-white"
              >
                <X size={28} />
              </motion.button>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-2 ml-4">Navigation</p>
              {navItems.map((item, index) => (
                <motion.button
                  key={`mobile-overlay-${item.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center justify-between p-6 rounded-[2rem] transition-all group relative overflow-hidden ${activePage === item.id
                    ? "bg-primary text-slate-900 shadow-xl shadow-primary/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <div className="flex items-center gap-6 relative z-10">
                    <span className={`${activePage === item.id ? "text-slate-900" : "text-primary"} group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </span>
                    <span className="text-3xl font-bold tracking-tighter uppercase">
                      {item.label}
                    </span>
                  </div>
                  <ArrowRight
                    size={24}
                    className={`relative z-10 transition-transform duration-300 ${activePage === item.id ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}
                  />
                </motion.button>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-white/10 flex flex-col gap-6">
              <div className="space-y-2">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">Get In Touch</p>
                <p className="text-white font-medium text-lg">fazlurrahaman365@gmail.com</p>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors cursor-pointer">
                  <Github size={20} />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors cursor-pointer">
                  <Mail size={20} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Analytics />
    </div>
  );
}
