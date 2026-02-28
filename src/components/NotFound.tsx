import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

export const NotFound = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center py-32 space-y-8"
        >
            <div className="relative">
                <div className="text-[12rem] font-bold tracking-tighter text-primary/10 leading-none select-none">
                    404
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-6 bg-primary/10 border border-primary/20 rounded-3xl">
                        <AlertTriangle size={48} className="text-primary" />
                    </div>
                </div>
            </div>

            <div className="space-y-4 max-w-md">
                <h1 className="text-4xl font-bold tracking-tight">
                    Page Not Found
                </h1>
                <p className="text-slate-500 text-lg leading-relaxed">
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>
            </div>

            <Link
                to="/"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-slate-900 font-bold py-4 px-10 rounded-2xl transition-all shadow-xl shadow-primary/20 text-sm uppercase tracking-widest"
            >
                <Home size={18} />
                Back to Home
            </Link>
        </motion.div>
    );
};
