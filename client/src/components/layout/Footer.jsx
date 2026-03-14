import { Code2, Heart, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/50 py-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
            <Code2 className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm text-muted-foreground">
            © {year} Kiran Thapa. Built with{" "}
            <Heart className="w-3.5 h-3.5 inline text-red-500" /> using MERN stack
          </span>
        </div>
        <div className="flex gap-3">
          {[Github, Linkedin, Twitter].map((Icon, i) => (
            <a key={i} href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-emerald-500 hover:border-emerald-500/50 transition-all duration-200">
              <Icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
