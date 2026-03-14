import { useState } from "react";
import { motion } from "framer-motion";
import { SKILLS } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/index";
import { useInView } from "@/hooks/useInView";

const CATEGORY_ICONS = {
  Frontend: "🖥️",
  Backend: "⚙️",
  Database: "🗄️",
  Tools: "🔧",
};

const CATEGORY_COLORS = {
  Frontend: "from-emerald-500 to-teal-500",
  Backend: "from-cyan-500 to-blue-500",
  Database: "from-violet-500 to-purple-500",
  Tools: "from-orange-500 to-amber-500",
};

function SkillBar({ name, level, icon, inView, delay }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm font-medium">
          <span>{icon}</span> {name}
        </span>
        <span className="text-xs font-mono text-muted-foreground">{level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView();
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...Object.keys(SKILLS)];

  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/*<p className="text-emerald-500 font-mono text-sm mb-2">// my_tech_stack()</p>*/}
          <h2 className="section-heading">Skills & Technologies</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full mb-8" />

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-emerald-500/30"
                }`}
              >
                {cat !== "All" && <span className="mr-1">{CATEGORY_ICONS[cat]}</span>}
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(SKILLS)
            .filter(([cat]) => activeCategory === "All" || activeCategory === cat)
            .map(([category, skills], catIdx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              >
                <Card className="card-hover border-border/50 hover:border-emerald-500/20 h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <span className={`w-7 h-7 rounded-lg bg-gradient-to-br ${CATEGORY_COLORS[category]} flex items-center justify-center text-sm`}>
                        {CATEGORY_ICONS[category]}
                      </span>
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skills.map((skill, i) => (
                      <SkillBar
                        key={skill.name}
                        {...skill}
                        inView={inView}
                        delay={0.3 + catIdx * 0.1 + i * 0.08}
                      />
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
