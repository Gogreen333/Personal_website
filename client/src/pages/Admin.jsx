import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, LogOut, Eye, EyeOff, MessageSquare, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Textarea, Badge } from "@/components/ui/index";
import { authAPI, projectsAPI, contactAPI } from "@/lib/api";
import { useToast } from "@/components/ui/toast";

function LoginForm({ onLogin }) {
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.login(creds);
      localStorage.setItem("admin_token", res.data.token);
      onLogin(res.data.user);
    } catch {
      toast({ type: "error", title: "Login failed", description: "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-3">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" placeholder="admin@example.com" value={creds.email}
                onChange={(e) => setCreds({ ...creds, email: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Password</Label>
              <div className="relative">
                <Input type={showPwd ? "text" : "password"} placeholder="••••••••" value={creds.password}
                  onChange={(e) => setCreds({ ...creds, password: e.target.value })} className="pr-10" />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const EMPTY_PROJECT = { title: "", description: "", image: "", technologies: "", githubLink: "", liveLink: "", featured: false };

export default function Admin() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState(EMPTY_PROJECT);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) setUser({ role: "admin" });
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchProjects();
    fetchMessages();
  }, [user]);

  const fetchProjects = async () => {
    try {
      const res = await projectsAPI.getAll();
      setProjects(res.data.data || []);
    } catch {}
  };

  const fetchMessages = async () => {
    try {
      const res = await contactAPI.getMessages();
      setMessages(res.data.data || []);
    } catch {}
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { ...form, technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean) };
      if (editingId) {
        await projectsAPI.update(editingId, data);
        toast({ type: "success", title: "Project updated!" });
      } else {
        await projectsAPI.create(data);
        toast({ type: "success", title: "Project created!" });
      }
      setForm(EMPTY_PROJECT);
      setEditingId(null);
      fetchProjects();
    } catch {
      toast({ type: "error", title: "Failed to save project" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await projectsAPI.delete(id);
      toast({ type: "success", title: "Project deleted" });
      fetchProjects();
    } catch {
      toast({ type: "error", title: "Failed to delete" });
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await contactAPI.delete(id);
      fetchMessages();
    } catch {}
  };

  const startEdit = (project) => {
    setForm({ ...project, technologies: project.technologies.join(", ") });
    setEditingId(project._id);
    setTab("projects");
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setUser(null);
  };

  if (!user) return <LoginForm onLogin={setUser} />;

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold">Admin Panel</span>
          </div>
          <div className="flex items-center gap-2">
            {[{ id: "projects", label: "Projects" }, { id: "messages", label: `Messages (${messages.filter(m => !m.read).length})` }].map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? "bg-emerald-500/10 text-emerald-500" : "text-muted-foreground hover:text-foreground"}`}>
                {t.label}
              </button>
            ))}
            <Button variant="ghost" size="icon" onClick={logout} className="text-muted-foreground">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {tab === "projects" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <Card>
              <CardHeader><CardTitle>{editingId ? "✏️ Edit Project" : "➕ Add Project"}</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProject} className="space-y-4">
                  {[["title", "Title", "text", "My Awesome Project"],
                    ["description", "Description", "textarea", "A brief description..."],
                    ["image", "Image URL", "text", "https://..."],
                    ["technologies", "Technologies (comma-separated)", "text", "React, Node.js, MongoDB"],
                    ["githubLink", "GitHub URL", "text", "https://github.com/..."],
                    ["liveLink", "Live URL", "text", "https://..."]
                  ].map(([key, label, type, placeholder]) => (
                    <div key={key} className="space-y-1.5">
                      <Label>{label}</Label>
                      {type === "textarea" ? (
                        <Textarea placeholder={placeholder} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                      ) : (
                        <Input type={type} placeholder={placeholder} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                      )}
                    </div>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-emerald-500" />
                    <span className="text-sm">Featured project</span>
                  </label>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? "Saving..." : editingId ? "Update" : "Create"}
                    </Button>
                    {editingId && (
                      <Button type="button" variant="outline" onClick={() => { setForm(EMPTY_PROJECT); setEditingId(null); }}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Projects list */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                {projects.length} Projects
              </h3>
              {projects.map((p) => (
                <Card key={p._id} className="border-border/50">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{p.title}</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {p.technologies.slice(0, 4).map((t) => <Badge key={t} className="text-xs">{t}</Badge>)}
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(p)}>
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(p._id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {tab === "messages" && (
          <div className="space-y-4">
            <h3 className="font-semibold">{messages.length} Messages</h3>
            {messages.map((msg) => (
              <Card key={msg._id} className={`border-border/50 ${!msg.read ? "border-emerald-500/30" : ""}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm">{msg.name}</p>
                        {!msg.read && <Badge className="text-xs">New</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{msg.email}</p>
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{new Date(msg.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 flex-shrink-0" onClick={() => handleDeleteMessage(msg._id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {messages.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No messages yet</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
