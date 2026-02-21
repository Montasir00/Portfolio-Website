import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

export const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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
      className="space-y-16 pb-32"
    >
      <div className="space-y-4 border-l-4 border-primary pl-6">
        <h2 className="text-4xl font-bold tracking-tight">Get In Touch</h2>
        <p className="text-slate-500 text-lg">
          Have a project in mind or just want to say hi? Feel free to reach out!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div variants={itemVariants} className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">
              Contact Information
            </h3>
            <p className="text-slate-500 leading-relaxed">
              I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your visions.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl group hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-all">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Email
                </p>
                <p className="font-bold text-slate-900 dark:text-slate-200">
                  fazlurrahaman365@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl group hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-all">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Phone
                </p>
                <p className="font-bold text-slate-900 dark:text-slate-200">
                  +39 351-361-7425
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">
              Social Profiles
            </h4>
            <div className="flex gap-4">
              {[
                {
                  icon: <Github size={20} />,
                  link: "https://github.com/Montasir00",
                },
                { icon: <Linkedin size={20} />, link: "#" },
                { icon: <Twitter size={20} />, link: "#" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/50 shadow-lg transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          variants={itemVariants}
          className="bg-primary/5 p-10 rounded-[2.5rem] border border-primary/20 shadow-2xl flex flex-col justify-center items-center text-center space-y-8"
        >
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-2">
            <Mail size={32} />
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Start a Conversation
            </h3>
            <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
              Skip the forms. Send me an email directly and I'll get back to you
              as soon as possible.
            </p>
          </div>

          <motion.a
            href="mailto:fazlurrahaman365@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-12 py-5 bg-primary hover:bg-primary-dark text-slate-900 font-bold text-lg rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-all"
          >
            <Send size={20} />
            Email Me
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};
