import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Search } from "lucide-react";
import { Card, CardContent, Badge } from "@/components/ui/index";
import { Button } from "@/components/ui/button";
import { projectsAPI } from "@/lib/api";
import { SAMPLE_PROJECTS } from "@/lib/data";
import { useInView } from "@/hooks/useInView";

function ProjectSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
      <div className="h-48 bg-muted" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-5/6" />
        <div className="flex gap-2 mt-4">
          <div className="h-5 w-16 bg-muted rounded-lg" />
          <div className="h-5 w-16 bg-muted rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group h-full card-hover border-border/50 hover:border-emerald-500/30 overflow-hidden">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-secondary to-muted">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">🚀</div>
          )}
          {project.featured && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 text-xs">⭐ Featured</Badge>
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <div className="flex gap-3">
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="bg-background/80 backdrop-blur-sm gap-1.5">
                    <Github className="w-3.5 h-3.5" /> Code
                  </Button>
                </a>
              )}
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" /> Demo
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>

        <CardContent className="p-5">
          <h3 className="font-display font-semibold text-base mb-2 group-hover:text-emerald-500 transition-colors">{project.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((tech) => (
              <Badge key={tech} className="text-xs">{tech}</Badge>
            ))}
            {project.technologies.length > 5 && (
              <Badge variant="secondary" className="text-xs">+{project.technologies.length - 5}</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const { ref, inView } = useInView();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectsAPI.getAll();
        setProjects(res.data.data?.length ? res.data.data : SAMPLE_PROJECTS);
      } catch {
        setProjects(SAMPLE_PROJECTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const allTechs = ["All", ...new Set(projects.flatMap((p) => p.technologies))];

  const filtered = projects.filter((p) => {
    const matchesTech = filter === "All" || p.technologies.includes(filter);
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchesTech && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/*<p className="text-emerald-500 font-mono text-sm mb-2">// featured_work()</p>*/}
          <h2 className="section-heading">Projects</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            A selection of projects I've built — from SaaS platforms to developer tools.
          </p>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Tech filter */}
          <div className="flex flex-wrap gap-2">
            {allTechs.slice(0, 8).map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  filter === tech
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                    : "bg-card border border-border text-muted-foreground hover:border-emerald-500/30"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {loading
            ? Array(4).fill(0).map((_, i) => <ProjectSkeleton key={i} />)
            : filtered.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} inView={inView} />
              ))}
        </div>

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-4xl mb-4">🔍</p>
            <p>No projects found. Try a different filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
