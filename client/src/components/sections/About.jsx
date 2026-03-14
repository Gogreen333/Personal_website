import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Heart, Coffee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/index";
import { useInView } from "@/hooks/useInView";

const highlights = [
  { icon: Briefcase, label: "4+ Years", sub: "Professional Experience", color: "emerald" },
  { icon: GraduationCap, label: "Bachelor", sub: "Bachelor in Economics", color: "cyan" },
  { icon: Heart, label: "30+ Projects", sub: "Delivered with Care", color: "emerald" },
  { icon: Coffee, label: "1000+", sub: "Cups of Coffee ☕", color: "cyan" },
];

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/*<p className="text-emerald-500 font-mono text-sm mb-2">// get_to_know_me()</p>*/}
          <h2 className="section-heading">About Me</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-foreground text-lg font-medium">
                I'm a full-stack developer who loves building things that live on the internet.
              </p>
              <p>
                With over 4 years of experience, I specialize in the MERN stack — creating fast, scalable applications 
                that delight users. I care deeply about code quality, performance, and accessibility.
              </p>
              <p>
                When I'm not coding, you'll find me contributing to open source projects, writing technical articles, 
                or exploring the latest web technologies. I believe great software is both technically excellent and 
                beautifully crafted.
              </p>
              <p>
                I've worked with startups and established companies, and I'm always looking for new challenges that 
                push me to grow as a developer and as a problem-solver.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                ["Name:", "Kiran Thapa"],
                ["Location:", "Pokhara, Nepal"],
                ["Email:", "gogreen.kt.333@gmail.com"],
                ["Availability:", "Open to work"],
              ].map(([key, val]) => (
                <div key={key}>
                  <span className="text-xs font-mono text-emerald-500">{key}</span>
                  <p className="text-sm font-medium mt-0.5">{val}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Highlight cards */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {highlights.map(({ icon: Icon, label, sub, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <Card className="card-hover border-border/50 hover:border-emerald-500/30 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-5">
                    <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center bg-${color}-500/10`}>
                      <Icon className={`w-5 h-5 text-${color}-500`} />
                    </div>
                    <p className="text-xl font-display font-bold gradient-text">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Education card */}
            <motion.div
              className="col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Bachelor in Economics</p>
                      <p className="text-xs text-muted-foreground">Kalika Multiple Campus</p>
                      <p className="text-xs text-emerald-500 font-mono mt-1">2020 – 2024 · GPA 3.8/4.0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
