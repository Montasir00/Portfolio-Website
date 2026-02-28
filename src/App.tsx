/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Routes, Route, useLocation, useNavigate, Link } from "react-router-dom";
import {
  Home as HomeIcon,
  Grid,
  User,
  Mail,
  BarChart2,
  Compass,
  Briefcase,
  Github,
} from "lucide-react";
import { Home } from "./components/Home";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { NotFound } from "./components/NotFound";

// Lazy-loaded heavy pages for better mobile performance
const ProjectDetail = lazy(() => import("./components/ProjectDetail").then(m => ({ default: m.ProjectDetail })));
const TravelPage = lazy(() => import("./components/TravelPage").then(m => ({ default: m.TravelPage })));
const BooksPage = lazy(() => import("./components/BooksPage").then(m => ({ default: m.BooksPage })));
const Experience = lazy(() => import("./components/Experience").then(m => ({ default: m.Experience })));
const Interests = lazy(() => import("./components/Interests").then(m => ({ default: m.Interests })));

const PageLoader = () => (
  <div className="flex items-center justify-center py-32">
    <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
);

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
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-6 pt-20 pb-28 lg:pt-32 lg:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Suspense fallback={<PageLoader />}>
              <Routes location={location}>
                <Route path="/" element={<Home onNavigate={(page) => navigate(`/${page === 'home' ? '' : page}`)} />} />
                <Route path="/projects" element={<Projects onProjectSelect={(id) => navigate(`/projects/${id}`)} />} />
                <Route path="/projects/:projectId" element={<ProjectDetail onBack={() => navigate("/projects")} />} />
                <Route path="/experience" element={<Experience onBack={() => navigate("/")} />} />
                <Route path="/interests" element={<Interests onNavigate={(page) => navigate(`/${page}`)} />} />
                <Route path="/interests/travel" element={<TravelPage onBack={() => navigate("/interests")} />} />
                <Route path="/interests/books" element={<BooksPage onBack={() => navigate("/interests")} />} />
                <Route path="/about" element={<About onBack={() => navigate("/")} />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="hidden lg:block border-t border-primary/10 bg-white/50 dark:bg-card-dark/50 backdrop-blur-sm mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-slate-900 p-1.5 rounded-xl">
              <BarChart2 size={16} />
            </div>
            <span className="text-sm font-bold tracking-tighter font-mono italic text-slate-500 dark:text-slate-400">
              FAZLUR RAHMAN
            </span>
          </div>
          <div className="flex items-center gap-6">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={`footer-${item.id}`}
                to={item.path}
                className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Montasir00" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary transition-colors">
              <Github size={16} />
            </a>
            <a href="mailto:fazlurrahaman365@gmail.com" className="text-slate-400 hover:text-primary transition-colors">
              <Mail size={16} />
            </a>
            <span className="text-[10px] text-slate-400 font-medium">
              © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-primary/10 pt-3 px-4" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
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
                animate={activePage === item.id ? { y: -4, scale: 1.12 } : { y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
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

    </div>
  );
}
