import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowDown, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const TYPED_STRINGS = ["Full-Stack Developer", "MERN Stack Expert", "UI/UX Enthusiast", "Open Source Contributor"];

export default function Hero() {
  const [typedIndex, setTypedIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = TYPED_STRINGS[typedIndex];
    const delay = deleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else {
          setCharIndex((c) => c + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        if (charIndex === 0) {
          setDeleting(false);
          setTypedIndex((i) => (i + 1) % TYPED_STRINGS.length);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, typedIndex]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const socials = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:alex@example.com", label: "Email" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden dot-grid">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Available for freelance & full-time
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-none mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hi, I'm{" "}
              <span className="gradient-text">Kiran Thapa</span>
            </motion.h1>

            <motion.div
              className="text-2xl md:text-3xl font-display text-muted-foreground mb-6 h-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span>{displayed}</span>
              <span className="inline-block w-0.5 h-7 bg-emerald-500 ml-0.5 animate-pulse" />
            </motion.div>

            <motion.p
              className="text-base text-muted-foreground leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              I build fast, scalable web applications with clean code and thoughtful UX. Specializing in MERN stack, with a passion for turning complex problems into elegant solutions.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button size="lg" onClick={() => scrollTo("projects")}>
                <ExternalLink className="w-4 h-4" />
                View Projects
              </Button>
              <a href="/resume.pdf" download>
                <Button variant="outline" size="lg">
                  <Download className="w-4 h-4" />
                  Download CV
                </Button>
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-emerald-500 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 mt-10 pt-8 border-t border-border/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {[["4+", "Years Exp."], ["30+", "Projects"], ["15+", "Happy Clients"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-2xl font-display font-bold gradient-text">{num}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Avatar / Visual */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-2xl opacity-20 scale-110 animate-glow" />
              {/* Avatar */}
              <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-gradient-to-r border-emerald-500/30 shadow-2xl">
                <img
                  src="/kiran.jpg"
                  alt="Hi there!..." 
                  className="w-full h-full object-cover object-top"
                /> 

                {/*
                <div className="w-full h-full bg-gradient-to-br from-emerald-900 to-cyan-900 flex items-center justify-center">
                   <span className="text-8xl">👨‍💻
                   </span>
                </div>*/}

              </div>
              {/* Floating tech badges */}
              {[
                { label: "React", pos: "-top-4 -left-8", delay: "0s" },
                { label: "Node.js", pos: "-top-4 -right-8", delay: "0.5s" },
                { label: "MongoDB", pos: "-bottom-2 -left-8", delay: "1s" },
                { label: "TypeScript", pos: "-bottom-2 -right-8", delay: "1.5s" },
              ].map(({ label, pos, delay }) => (
                <div
                  key={label}
                  className={`absolute ${pos} glass dark:glass-dark px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-emerald-500 border border-emerald-500/20 animate-float shadow-lg`}
                  style={{ animationDelay: delay }}
                >
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-emerald-500 transition-colors"
          onClick={() => scrollTo("about")}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs">Scroll down</span>
          <ArrowDown className="w-4 h-4" />
        </motion.button>
      </div>
    </section>
  );
}
