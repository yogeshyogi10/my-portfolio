"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Plus, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Users,
  Eye,
  Trash2,
  Edit,
  X,
  Mail,
  User as UserIcon,
  Calendar,
  CheckCircle2,
  Loader2,
  Globe
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../lib/api";

// --- Types ---
interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  live_url: string;
  created_at: string;
}

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  submitted_at: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [projects, setProjects] = useState<Project[]>([]);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech_stack: "",
    live_url: ""
  });

  const router = useRouter();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/login");
        return;
      }

      const [projectsRes, contactRes] = await Promise.all([
        api.get("/projects/"),
        api.get("/contact/submissions/")
      ]);

      setProjects(projectsRes.data.results || []);
      setSubmissions(contactRes.data.results || []);
    } catch (err) {
      console.error("Dashboard error:", err);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/login");
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/projects/${id}/`);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let finalUrl = formData.live_url.trim();
      if (finalUrl && !finalUrl.startsWith("http")) {
        finalUrl = `https://${finalUrl}`;
      }

      const payload = {
        ...formData,
        live_url: finalUrl,
        tech_stack: formData.tech_stack.split(",").map(s => s.trim()).filter(s => s !== "")
      };
      await api.post("/projects/", payload);
      setModalOpen(false);
      setFormData({ title: "", description: "", tech_stack: "", live_url: "" });
      fetchData(); // Refresh list
    } catch (err: any) {
      console.error("Project add error:", err);
      // Extract specific backend validation errors
      const errorMessage = err.response?.data
        ? Object.entries(err.response.data)
            .map(([key, value]: [string, any]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
            .join("\n")
        : "Failed to add project. Please check your connection.";
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex relative">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl flex flex-col p-6 hidden lg:flex fixed h-full">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-lg" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Admin Panel
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? "bg-white/10 text-white shadow-lg shadow-black/20" 
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && <ChevronRight size={16} className="ml-auto opacity-50" />}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-8 lg:p-12 min-h-screen overflow-x-hidden">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2 capitalize">{activeTab === 'overview' ? 'Welcome Back!' : activeTab}</h2>
            <p className="text-gray-400 text-sm">
              {activeTab === 'overview' && "Here's what's happening with your portfolio today."}
              {activeTab === 'projects' && "Manage your portfolio projects and showcase your work."}
              {activeTab === 'messages' && "View and respond to people reaching out to you."}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2">
              <Eye size={18} />
              View Site
            </Link>
            <button 
              onClick={() => setModalOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-purple-500/20 transition-all flex items-center gap-2"
            >
              <Plus size={18} />
              New Project
            </button>
          </div>
        </header>

        {/* --- OVERVIEW TAB --- */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { label: "Total Projects", value: projects.length, icon: Briefcase, color: "text-purple-400", bg: "bg-purple-500/10" },
                { label: "New Messages", value: submissions.filter(s => !s.is_read).length, icon: MessageSquare, color: "text-cyan-400", bg: "bg-cyan-500/10" },
                { label: "Read Messages", value: submissions.filter(s => s.is_read).length, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                { label: "Total Submissions", value: submissions.length, icon: Users, color: "text-orange-400", bg: "bg-orange-500/10" },
              ].map((stat, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={stat.label}
                  className="bg-white/5 border border-white/10 p-6 rounded-3xl"
                >
                  <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                    <stat.icon size={24} />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Recent Projects Preview */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-xl font-bold">Recent Projects</h4>
                  <button onClick={() => setActiveTab("projects")} className="text-purple-400 text-sm hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {projects.slice(0, 3).map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-transparent hover:border-white/10 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center font-bold">
                          {project.title.charAt(0)}
                        </div>
                        <h5 className="font-bold">{project.title}</h5>
                      </div>
                      <ExternalLink size={16} className="text-gray-500" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Messages Preview */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-xl font-bold">Recent Messages</h4>
                  <button onClick={() => setActiveTab("messages")} className="text-cyan-400 text-sm hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {submissions.slice(0, 3).map((msg) => (
                    <div key={msg.id} className="p-4 rounded-2xl bg-white/5 border border-transparent hover:border-white/10 transition-all">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-bold text-sm">{msg.name}</h5>
                        <span className="text-[10px] text-gray-500">{new Date(msg.submitted_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-1">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- PROJECTS TAB --- */}
        {activeTab === "projects" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-purple-500/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center text-xl font-bold text-white">
                      {project.title.charAt(0)}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-white transition-colors"><Edit size={18} /></button>
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{project.title}</h4>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech_stack.map(tech => (
                      <span key={tech} className="text-[10px] bg-white/10 text-gray-300 px-3 py-1 rounded-full">{tech}</span>
                    ))}
                  </div>

                  {project.live_url && (
                    <a href={project.live_url} target="_blank" className="flex items-center gap-2 text-sm text-cyan-400 hover:underline">
                      <Globe size={16} />
                      {project.live_url.replace(/(^\w+:|^)\/\//, '')}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- MESSAGES TAB --- */}
        {activeTab === "messages" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 text-sm font-bold text-gray-300">Sender</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-300">Email</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-300">Message</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-300">Date</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-300 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {submissions.map((msg) => (
                    <tr key={msg.id} className="hover:bg-white/5 transition-all group">
                      <td className="px-6 py-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-500/10 text-cyan-400 rounded-full flex items-center justify-center text-xs font-bold">
                          {msg.name.charAt(0)}
                        </div>
                        <span className="font-medium">{msg.name}</span>
                      </td>
                      <td className="px-6 py-6 text-sm text-gray-400">{msg.email}</td>
                      <td className="px-6 py-6 text-sm text-gray-400 max-w-xs">
                        <p className="truncate">{msg.message}</p>
                      </td>
                      <td className="px-6 py-6 text-sm text-gray-500">
                        {new Date(msg.submitted_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-6 text-right">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${msg.is_read ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'}`}>
                          {msg.is_read ? 'Read' : 'New'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {submissions.length === 0 && (
                <div className="py-20 text-center text-gray-500">No messages found.</div>
              )}
            </div>
          </motion.div>
        )}
      </main>

      {/* --- ADD PROJECT MODAL --- */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <h3 className="text-xl font-bold">Add New Project</h3>
                <button onClick={() => setModalOpen(false)} className="p-2 text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddProject} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Project Title</label>
                    <input 
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                      placeholder="E.g. AI Portfolio"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Live URL (Optional)</label>
                    <input 
                      value={formData.live_url}
                      onChange={e => setFormData({...formData, live_url: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                      placeholder="https://myproject.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">Tech Stack (Comma separated)</label>
                  <input 
                    required
                    value={formData.tech_stack}
                    onChange={e => setFormData({...formData, tech_stack: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                    placeholder="React, Next.js, Tailwind, Django"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 ml-1">Project Description</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all resize-none"
                    placeholder="Tell us about the project..."
                  />
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 bg-white/5 border border-white/10 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="flex-[2] bg-gradient-to-r from-purple-600 to-cyan-600 py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? <Loader2 size={20} className="animate-spin" /> : "Publish Project"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
