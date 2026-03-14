import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { EXPERIENCE } from "@/lib/data";
import { Badge } from "@/components/ui/index";
import { useInView } from "@/hooks/useInView";

export default function Experience() {
  const { ref, inView } = useInView();

  return (
    <section id="experience" className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/*<p className="text-emerald-500 font-mono text-sm mb-2">// career_journey()</p>*/}
          <h2 className="section-heading">Experience & Education</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-cyan-500 to-transparent" />

          <div className="space-y-8">
            {EXPERIENCE.map((item, i) => {
              const Icon = item.type === "work" ? Briefcase : GraduationCap;
              const isWork = item.type === "work";

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex gap-6 group"
                >
                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0 w-16 flex justify-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center z-10 shadow-lg transition-all duration-300 group-hover:scale-110 ${
                      isWork
                        ? "bg-gradient-to-br from-emerald-500 to-teal-500"
                        : "bg-gradient-to-br from-cyan-500 to-blue-500"
                    }`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-card border border-border/50 rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-display font-semibold text-base">{item.title}</h3>
                          <p className={`text-sm font-medium ${isWork ? "text-emerald-500" : "text-cyan-500"}`}>
                            {item.company}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.period}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {item.skills.map((skill) => (
                          <Badge key={skill} variant={isWork ? "default" : "cyan"} className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
