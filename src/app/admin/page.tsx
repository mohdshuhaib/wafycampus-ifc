"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogOut,
  PlusCircle,
  Trash2,
  Pencil,
  X,
  Video,
  FileText,
  Images,
  LayoutDashboard,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Star,
  StarOff,
  ArrowLeft
} from "lucide-react";
import {
  extractYoutubeId,
  getYoutubeThumbnail,
  getDriveImageUrl,
  getDrivePdfPreviewUrl
} from "@/lib/driveUtils";
import { VideoData, PaperData, GalleryData } from "@/lib/db";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"overview" | "videos" | "papers" | "gallery">("overview");

  // Database-backed Data States
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [papers, setPapers] = useState<PaperData[]>([]);
  const [gallery, setGallery] = useState<GalleryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  // New Video Form (NO description field)
  const [newVideo, setNewVideo] = useState({
    title: "",
    speaker: "",
    designation: "Faculty / Research Scholar",
    duration: "30:00",
    youtubeUrl: "",
    category: "Keynote",
    featured: true
  });

  // New Paper Form (Google Drive link only)
  const [newPaper, setNewPaper] = useState({
    title: "",
    arabicTitle: "",
    author: "",
    authorRole: "Faculty of Islamic Jurisprudence",
    department: "Muamalah",
    year: "2026",
    driveUrl: "",
    pages: 20,
    featured: true
  });

  // New Gallery Form (Google Drive link only)
  const [newGallery, setNewGallery] = useState({
    title: "",
    category: "Academic Sessions",
    driveUrl: "",
    caption: "",
    featured: true
  });

  // Edit states for modals
  const [editingVideo, setEditingVideo] = useState<VideoData | null>(null);
  const [editingPaper, setEditingPaper] = useState<PaperData | null>(null);
  const [editingGallery, setEditingGallery] = useState<GalleryData | null>(null);

  // Load Database Records
  const loadDatabaseData = async () => {
    setIsLoading(true);
    try {
      const [resV, resP, resG] = await Promise.all([
        fetch("/api/videos", { cache: "no-store" }),
        fetch("/api/papers", { cache: "no-store" }),
        fetch("/api/gallery", { cache: "no-store" })
      ]);
      if (resV.ok) setVideos(await resV.json());
      if (resP.ok) setPapers(await resP.json());
      if (resG.ok) setGallery(await resG.json());
    } catch (e) {
      console.error("Error loading data from database:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const session = localStorage.getItem("ifc_admin_auth");
    if (session === "true") {
      setIsAuthenticated(true);
      loadDatabaseData();
    }
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (email.trim() === "ifcadmin@gmail.com" && password === "ifcadmin@1") {
      setIsAuthenticated(true);
      localStorage.setItem("ifc_admin_auth", "true");
      loadDatabaseData();
      showToast("Authenticated as Administrator");
    } else {
      setLoginError("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("ifc_admin_auth");
  };

  // Add Video
  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const ytId = extractYoutubeId(newVideo.youtubeUrl);
    if (!ytId) {
      showToast("Please enter a valid YouTube URL or ID");
      return;
    }

    const videoItem: VideoData = {
      id: `vid-${Date.now()}`,
      title: newVideo.title,
      speaker: newVideo.speaker,
      designation: newVideo.designation,
      duration: newVideo.duration,
      youtubeId: ytId,
      category: newVideo.category,
      featured: newVideo.featured
    };

    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(videoItem)
      });
      if (res.ok) {
        showToast("Video added to database");
        setNewVideo({
          title: "",
          speaker: "",
          designation: "Faculty / Research Scholar",
          duration: "30:00",
          youtubeUrl: "",
          category: "Keynote",
          featured: true
        });
        loadDatabaseData();
      }
    } catch (err) {
      showToast("Error adding video");
    }
  };

  // Delete Video
  const handleDeleteVideo = async (id: string) => {
    try {
      const res = await fetch(`/api/videos?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Video deleted");
        loadDatabaseData();
      }
    } catch {
      showToast("Failed to delete video");
    }
  };

  // Toggle Video Top 5 Main Page
  const handleToggleVideoFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/videos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, featured: !currentStatus })
      });
      if (res.ok) {
        showToast(!currentStatus ? "Added to Main Page Top 5" : "Removed from Main Page Top 5");
        loadDatabaseData();
      }
    } catch {}
  };

  // Save Edit Video
  const handleSaveEditVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;
    const yId = extractYoutubeId(editingVideo.youtubeId) || editingVideo.youtubeId.trim();
    const updated: VideoData = {
      ...editingVideo,
      youtubeId: yId
    };

    try {
      const res = await fetch("/api/videos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Video updated successfully");
        setEditingVideo(null);
        loadDatabaseData();
      } else {
        showToast(data.error || "Failed to update video");
      }
    } catch {
      showToast("Error updating video");
    }
  };

  // Add Paper
  const handleAddPaper = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPaper.driveUrl) {
      showToast("Please enter a Google Drive link");
      return;
    }

    const paperItem: PaperData = {
      id: `paper-${Date.now()}`,
      title: newPaper.title,
      arabicTitle: newPaper.arabicTitle || undefined,
      author: newPaper.author,
      authorRole: newPaper.authorRole,
      department: newPaper.department,
      year: newPaper.year,
      driveUrl: newPaper.driveUrl.trim(),
      pages: Number(newPaper.pages) || 1,
      featured: newPaper.featured
    };

    try {
      const res = await fetch("/api/papers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paperItem)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Research paper added to database");
        setNewPaper({
          title: "",
          arabicTitle: "",
          author: "",
          authorRole: "Faculty of Islamic Jurisprudence",
          department: "Muamalah",
          year: "2026",
          driveUrl: "",
          pages: 20,
          featured: true
        });
        loadDatabaseData();
      } else {
        showToast(data.error || "Error saving paper to database");
      }
    } catch {
      showToast("Error saving paper");
    }
  };

  // Delete Paper
  const handleDeletePaper = async (id: string) => {
    try {
      const res = await fetch(`/api/papers?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Paper removed");
        loadDatabaseData();
      }
    } catch {
      showToast("Failed to delete paper");
    }
  };

  // Toggle Paper Featured
  const handleTogglePaperFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/papers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, featured: !currentStatus })
      });
      if (res.ok) {
        showToast(!currentStatus ? "Marked for Main Page" : "Unmarked from Main Page");
        loadDatabaseData();
      }
    } catch {}
  };

  // Save Edit Paper
  const handleSaveEditPaper = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPaper) return;
    const updated: PaperData = {
      ...editingPaper,
      driveUrl: editingPaper.driveUrl.trim(),
      pages: Number(editingPaper.pages) || 1
    };

    try {
      const res = await fetch("/api/papers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Research paper updated successfully");
        setEditingPaper(null);
        loadDatabaseData();
      } else {
        showToast(data.error || "Failed to update paper");
      }
    } catch {
      showToast("Error updating paper");
    }
  };

  // Add Gallery Image
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGallery.driveUrl) {
      showToast("Please provide a Google Drive link");
      return;
    }

    const galleryItem: GalleryData = {
      id: `gal-${Date.now()}`,
      title: newGallery.title,
      category: newGallery.category,
      driveUrl: newGallery.driveUrl.trim(),
      caption: newGallery.caption,
      featured: newGallery.featured
    };

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(galleryItem)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Gallery image added to database");
        setNewGallery({
          title: "",
          category: "Academic Sessions",
          driveUrl: "",
          caption: "",
          featured: true
        });
        loadDatabaseData();
      } else {
        showToast(data.error || "Error saving image to database");
      }
    } catch {
      showToast("Error saving photo");
    }
  };

  // Delete Gallery Image
  const handleDeleteGallery = async (id: string) => {
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Gallery photo removed");
        loadDatabaseData();
      }
    } catch {
      showToast("Failed to delete image");
    }
  };

  // Toggle Gallery Top 5 Main Page
  const handleToggleGalleryFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, featured: !currentStatus })
      });
      if (res.ok) {
        showToast(!currentStatus ? "Added to Main Page Top 5" : "Removed from Main Page Top 5");
        loadDatabaseData();
      }
    } catch {}
  };

  // Save Edit Gallery
  const handleSaveEditGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery) return;
    const updated: GalleryData = {
      ...editingGallery,
      driveUrl: editingGallery.driveUrl.trim()
    };

    try {
      const res = await fetch("/api/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Gallery photo updated successfully");
        setEditingGallery(null);
        loadDatabaseData();
      } else {
        showToast(data.error || "Failed to update gallery photo");
      }
    } catch {
      showToast("Error updating photo");
    }
  };

  // Unauthenticated Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex flex-col justify-center items-center p-4 selection:bg-[#064e3b] selection:text-white">
        <div className="w-full max-w-md mb-6 flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#064e3b] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Site</span>
          </Link>
          <span className="text-xs font-mono text-[#064e3b] font-bold">IFC PORTAL</span>
        </div>

        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#064e3b] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-[#1d1d1f] tracking-tight">
              Administrative Sign In
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              International Fiqh Conference • Wafy Campus kalikavu
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-rose-700 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="ifcadmin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#064e3b]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#064e3b]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider text-white bg-[#064e3b] hover:bg-[#043d2e] shadow-md transition-all"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate featured top 5 counts
  const featuredVideosCount = videos.filter((v) => v.featured).length;
  const featuredGalleryCount = gallery.filter((g) => g.featured).length;
  const featuredPapersCount = papers.filter((p) => p.featured).length;

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col selection:bg-[#064e3b] selection:text-white">
      {/* Toast Alert */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl bg-[#064e3b] text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin Header */}
      <header className="bg-[#064e3b] text-white border-b border-emerald-800 py-3.5 px-4 sm:px-8 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-[#064e3b] flex items-center justify-center font-black text-sm">
              IFC
            </div>
            <div>
              <div className="text-sm font-black tracking-tight leading-none">
                IFC Management Console
              </div>
              <div className="text-[10px] text-emerald-200 font-mono mt-0.5">
                {email || "ifcadmin@gmail.com"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#043d2e] hover:bg-emerald-900 text-xs font-semibold text-emerald-100 transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-700 hover:bg-rose-800 text-xs font-bold text-white transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2 px-2">
              Console
            </div>
            <nav className="flex flex-col gap-1.5">
              {[
                { id: "overview", label: "Overview", icon: LayoutDashboard },
                { id: "videos", label: `Videos (${videos.length})`, icon: Video },
                { id: "papers", label: `Research Papers (${papers.length})`, icon: FileText },
                { id: "gallery", label: `Gallery (${gallery.length})`, icon: Images },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                      isActive
                        ? "bg-[#064e3b] text-white shadow-sm"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Database Overview
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Live counts and configuration loaded directly from the database.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Videos in Database
                    </div>
                    <div className="text-3xl font-black text-[#064e3b] mt-1">{videos.length}</div>
                    <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                      {featuredVideosCount} active in Top 5
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#064e3b] flex items-center justify-center">
                    <Video className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Research Papers
                    </div>
                    <div className="text-3xl font-black text-[#064e3b] mt-1">{papers.length}</div>
                    <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                      {featuredPapersCount} shown on main page
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#064e3b] flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Gallery Images
                    </div>
                    <div className="text-3xl font-black text-[#064e3b] mt-1">{gallery.length}</div>
                    <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                      {featuredGalleryCount} in Top 5 Grid
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#064e3b] flex items-center justify-center">
                    <Images className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VIDEOS (NO DESCRIPTION FIELD, AUTO THUMBNAIL, TOP 5 SELECTION) */}
          {activeTab === "videos" && (
            <div className="space-y-8">
              {/* Add Video Form */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-4 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-[#064e3b]" />
                  <span>Add Video</span>
                </h3>

                <form onSubmit={handleAddVideo} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Video Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Keynote on Ethical Banking in India"
                        value={newVideo.title}
                        onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Speaker Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Luqmanul Hakeem Azhari"
                        value={newVideo.speaker}
                        onChange={(e) => setNewVideo({ ...newVideo, speaker: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Speaker Designation *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Senior Jurisprudence Fellow"
                        value={newVideo.designation}
                        onChange={(e) => setNewVideo({ ...newVideo, designation: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        YouTube URL or ID *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={newVideo.youtubeUrl}
                        onChange={(e) => setNewVideo({ ...newVideo, youtubeUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Duration (e.g. 35:20)
                      </label>
                      <input
                        type="text"
                        placeholder="35:20"
                        value={newVideo.duration}
                        onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Category
                      </label>
                      <select
                        value={newVideo.category}
                        onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#064e3b]"
                      >
                        <option value="Inaugural">Inaugural</option>
                        <option value="Keynote">Keynote</option>
                        <option value="Panel Discussion">Panel Discussion</option>
                        <option value="Academic Paper">Academic Paper</option>
                        <option value="Valedictory">Valedictory</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="videoFeatured"
                      checked={newVideo.featured}
                      onChange={(e) => setNewVideo({ ...newVideo, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#064e3b] focus:ring-[#064e3b]"
                    />
                    <label htmlFor="videoFeatured" className="text-xs font-bold text-slate-800">
                      Show in Top 5 (Main Page)
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-2xl bg-[#064e3b] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#043d2e] shadow-xs"
                  >
                    Add Video
                  </button>
                </form>
              </div>

              {/* Video List with Top 5 Selection Toggle */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">
                    Video Catalog ({videos.length})
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Top 5 on Main Page: <strong className="text-[#064e3b]">{featuredVideosCount} selected</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {videos.map((vid) => (
                    <div
                      key={vid.id}
                      className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 overflow-hidden">
                        {/* Auto YouTube Thumbnail */}
                        <div className="w-24 aspect-video rounded-xl overflow-hidden bg-black shrink-0 relative">
                          <Image
                            src={getYoutubeThumbnail(vid.youtubeId)}
                            alt={vid.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="truncate">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-black uppercase text-[#064e3b] bg-emerald-50 px-2 py-0.5 rounded-md">
                              {vid.category}
                            </span>
                            <span className="text-xs font-mono text-slate-400">{vid.duration}</span>
                            {vid.featured && (
                              <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                Top 5 (Main Page)
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 truncate">
                            {vid.title}
                          </h4>
                          <p className="text-xs text-slate-500 truncate">
                            {vid.speaker} • {vid.designation}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Toggle Top 5 Button */}
                        <button
                          onClick={() => handleToggleVideoFeatured(vid.id, vid.featured)}
                          className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                            vid.featured
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                          title="Toggle Main Page Top 5"
                        >
                          {vid.featured ? <Star className="w-4 h-4 fill-amber-600 text-amber-600" /> : <StarOff className="w-4 h-4" />}
                          <span className="hidden sm:inline">{vid.featured ? "In Top 5" : "Make Top 5"}</span>
                        </button>

                        <a
                          href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                          title="Open YouTube"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>

                        {/* Edit Video Button */}
                        <button
                          onClick={() => setEditingVideo(vid)}
                          className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-[#064e3b] transition-colors"
                          title="Edit Video"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteVideo(vid.id)}
                          className="p-2 rounded-xl text-rose-600 hover:bg-rose-50"
                          title="Delete Video"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PAPERS (GOOGLE DRIVE LINK ONLY) */}
          {activeTab === "papers" && (
            <div className="space-y-8">
              {/* Add Paper Form */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-4 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-[#064e3b]" />
                  <span>Add Research Paper (Drive Link)</span>
                </h3>

                <form onSubmit={handleAddPaper} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Paper Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Modern Banking Principles in Shariah"
                        value={newPaper.title}
                        onChange={(e) => setNewPaper({ ...newPaper, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Arabic Title (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. أصول المعاملات المصرفية المعاصرة"
                        value={newPaper.arabicTitle}
                        onChange={(e) => setNewPaper({ ...newPaper, arabicTitle: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-right font-arabic focus:outline-none focus:border-[#064e3b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Author / Research Group *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Scholars of MUL 2 (Muamalah Department)"
                        value={newPaper.author}
                        onChange={(e) => setNewPaper({ ...newPaper, author: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Department &amp; Pages
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={newPaper.department}
                          onChange={(e) => setNewPaper({ ...newPaper, department: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#064e3b]"
                        >
                          <option value="Muamalah">Muamalah</option>
                          <option value="Usrah">Usrah</option>
                          <option value="General Fiqh">General Fiqh</option>
                        </select>
                        <input
                          type="number"
                          placeholder="Pages (e.g. 24)"
                          value={newPaper.pages}
                          onChange={(e) => setNewPaper({ ...newPaper, pages: Number(e.target.value) })}
                          className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Google Drive Link *
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                        value={newPaper.driveUrl}
                        onChange={(e) => setNewPaper({ ...newPaper, driveUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="paperFeatured"
                      checked={newPaper.featured}
                      onChange={(e) => setNewPaper({ ...newPaper, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#064e3b] focus:ring-[#064e3b]"
                    />
                    <label htmlFor="paperFeatured" className="text-xs font-bold text-slate-800">
                      Show on Main Page
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-2xl bg-[#064e3b] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#043d2e] shadow-xs"
                  >
                    Save Paper
                  </button>
                </form>
              </div>

              {/* Current Papers List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">
                    Research Papers ({papers.length})
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Main Page: <strong className="text-[#064e3b]">{featuredPapersCount} selected</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {papers.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase text-[#064e3b] bg-emerald-50 px-2 py-0.5 rounded-md">
                            {p.department}
                          </span>
                          <span className="text-xs font-mono text-slate-400">{p.pages} Pages</span>
                          {p.featured && (
                            <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              Main Page
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-bold text-slate-900 truncate">
                          {p.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">{p.author}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Toggle Featured Button */}
                        <button
                          onClick={() => handleTogglePaperFeatured(p.id, p.featured)}
                          className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                            p.featured
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                          title="Toggle Main Page"
                        >
                          {p.featured ? <Star className="w-4 h-4 fill-amber-600 text-amber-600" /> : <StarOff className="w-4 h-4" />}
                          <span className="hidden sm:inline">{p.featured ? "Featured" : "Feature"}</span>
                        </button>

                        <a
                          href={p.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                          title="Open Drive Link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>

                        {/* Edit Paper Button */}
                        <button
                          onClick={() => setEditingPaper(p)}
                          className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-[#064e3b] transition-colors"
                          title="Edit Paper"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeletePaper(p.id)}
                          className="p-2 rounded-xl text-rose-600 hover:bg-rose-50"
                          title="Delete Paper"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GALLERY (GOOGLE DRIVE LINK ONLY & TOP 5 SELECTION) */}
          {activeTab === "gallery" && (
            <div className="space-y-8">
              {/* Add Gallery Form */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-4 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-[#064e3b]" />
                  <span>Add Gallery Photo (Drive Link)</span>
                </h3>

                <form onSubmit={handleAddGallery} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Photo Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Inaugural Plenary Hall"
                        value={newGallery.title}
                        onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Category
                      </label>
                      <select
                        value={newGallery.category}
                        onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#064e3b]"
                      >
                        <option value="Inaugural">Inaugural</option>
                        <option value="Academic Sessions">Academic Sessions</option>
                        <option value="Dignitaries">Dignitaries</option>
                        <option value="Audience">Audience</option>
                        <option value="Campus Life">Campus Life</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Google Drive Image Link *
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                        value={newGallery.driveUrl}
                        onChange={(e) => setNewGallery({ ...newGallery, driveUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Caption (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Brief caption..."
                      value={newGallery.caption}
                      onChange={(e) => setNewGallery({ ...newGallery, caption: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="galleryFeatured"
                      checked={newGallery.featured}
                      onChange={(e) => setNewGallery({ ...newGallery, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#064e3b] focus:ring-[#064e3b]"
                    />
                    <label htmlFor="galleryFeatured" className="text-xs font-bold text-slate-800">
                      Show in Top 5 (Main Page)
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-2xl bg-[#064e3b] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#043d2e] shadow-xs"
                  >
                    Save Photo
                  </button>
                </form>
              </div>

              {/* Gallery Grid with Top 5 Selection Toggle */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">
                    Gallery Collection ({gallery.length})
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Top 5 on Main Page: <strong className="text-[#064e3b]">{featuredGalleryCount} selected</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {gallery.map((g) => (
                    <div
                      key={g.id}
                      className="group relative rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
                    >
                      <div className="relative aspect-[4/3] bg-slate-100">
                        {/* Google Drive Image Embed */}
                        <Image
                          src={getDriveImageUrl(g.driveUrl)}
                          alt={g.title}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => setEditingGallery(g)}
                          className="absolute top-2 left-2 p-1.5 rounded-xl bg-black/60 text-white hover:bg-[#064e3b] transition-colors z-10"
                          title="Edit Photo"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteGallery(g.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-xl bg-black/60 text-rose-400 hover:text-white hover:bg-rose-600 transition-colors z-10"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-3">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-bold text-[#064e3b] uppercase">
                            {g.category}
                          </span>
                          <button
                            onClick={() => handleToggleGalleryFeatured(g.id, g.featured)}
                            className={`p-1 rounded-md text-[10px] font-bold flex items-center gap-1 ${
                              g.featured
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                            title="Toggle Top 5"
                          >
                            <Star className={`w-3 h-3 ${g.featured ? "fill-amber-500 text-amber-500" : ""}`} />
                            <span>{g.featured ? "Top 5" : "Off"}</span>
                          </button>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {g.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ============================================================== */}
      {/* EDIT VIDEO MODAL */}
      {/* ============================================================== */}
      {editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#064e3b] flex items-center justify-center font-bold">
                  <Video className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Edit Video Details</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingVideo(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditVideo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingVideo.title}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Speaker / Presenter *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingVideo.speaker}
                    onChange={(e) => setEditingVideo({ ...editingVideo, speaker: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={editingVideo.designation}
                    onChange={(e) => setEditingVideo({ ...editingVideo, designation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={editingVideo.duration}
                    onChange={(e) => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={editingVideo.category}
                    onChange={(e) => setEditingVideo({ ...editingVideo, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#064e3b]"
                  >
                    <option value="Inaugural">Inaugural</option>
                    <option value="Keynote">Keynote</option>
                    <option value="Panel Discussion">Panel Discussion</option>
                    <option value="Academic Paper">Academic Paper</option>
                    <option value="Valedictory">Valedictory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  YouTube URL or ID *
                </label>
                <input
                  type="text"
                  required
                  value={editingVideo.youtubeId}
                  onChange={(e) => setEditingVideo({ ...editingVideo, youtubeId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="editVideoFeatured"
                  checked={editingVideo.featured}
                  onChange={(e) => setEditingVideo({ ...editingVideo, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#064e3b] focus:ring-[#064e3b]"
                />
                <label htmlFor="editVideoFeatured" className="text-xs font-bold text-slate-800">
                  Show in Top 5 (Main Page)
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingVideo(null)}
                  className="px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-[#064e3b] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#043d2e] shadow-md shadow-[#064e3b]/20 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* EDIT PAPER MODAL */}
      {/* ============================================================== */}
      {editingPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#064e3b] flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Edit Research Paper</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingPaper(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditPaper} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Paper Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingPaper.title}
                  onChange={(e) => setEditingPaper({ ...editingPaper, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Arabic Title (Optional)
                </label>
                <input
                  type="text"
                  value={editingPaper.arabicTitle || ""}
                  onChange={(e) => setEditingPaper({ ...editingPaper, arabicTitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-right font-arabic focus:outline-none focus:border-[#064e3b]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Author / Research Group *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPaper.author}
                    onChange={(e) => setEditingPaper({ ...editingPaper, author: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Author Role / Designation
                  </label>
                  <input
                    type="text"
                    value={editingPaper.authorRole}
                    onChange={(e) => setEditingPaper({ ...editingPaper, authorRole: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Department
                  </label>
                  <select
                    value={editingPaper.department}
                    onChange={(e) => setEditingPaper({ ...editingPaper, department: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#064e3b]"
                  >
                    <option value="Muamalah">Muamalah</option>
                    <option value="Usrah">Usrah</option>
                    <option value="General Fiqh">General Fiqh</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={editingPaper.year}
                    onChange={(e) => setEditingPaper({ ...editingPaper, year: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pages
                  </label>
                  <input
                    type="number"
                    value={editingPaper.pages}
                    onChange={(e) => setEditingPaper({ ...editingPaper, pages: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google Drive Link *
                </label>
                <input
                  type="url"
                  required
                  value={editingPaper.driveUrl}
                  onChange={(e) => setEditingPaper({ ...editingPaper, driveUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="editPaperFeatured"
                  checked={editingPaper.featured}
                  onChange={(e) => setEditingPaper({ ...editingPaper, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#064e3b] focus:ring-[#064e3b]"
                />
                <label htmlFor="editPaperFeatured" className="text-xs font-bold text-slate-800">
                  Show on Main Page
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingPaper(null)}
                  className="px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-[#064e3b] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#043d2e] shadow-md shadow-[#064e3b]/20 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* EDIT GALLERY MODAL */}
      {/* ============================================================== */}
      {editingGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#064e3b] flex items-center justify-center font-bold">
                  <Images className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Edit Gallery Photo</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingGallery(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditGallery} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingGallery.title}
                  onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={editingGallery.category}
                  onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#064e3b]"
                >
                  <option value="Inaugural">Inaugural</option>
                  <option value="Academic Sessions">Academic Sessions</option>
                  <option value="Dignitaries">Dignitaries</option>
                  <option value="Audience">Audience</option>
                  <option value="Campus Life">Campus Life</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google Drive Image Link *
                </label>
                <input
                  type="url"
                  required
                  value={editingGallery.driveUrl}
                  onChange={(e) => setEditingGallery({ ...editingGallery, driveUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  value={editingGallery.caption || ""}
                  onChange={(e) => setEditingGallery({ ...editingGallery, caption: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="editGalleryFeatured"
                  checked={editingGallery.featured}
                  onChange={(e) => setEditingGallery({ ...editingGallery, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#064e3b] focus:ring-[#064e3b]"
                />
                <label htmlFor="editGalleryFeatured" className="text-xs font-bold text-slate-800">
                  Show in Top 5 (Main Page)
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingGallery(null)}
                  className="px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-[#064e3b] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#043d2e] shadow-md shadow-[#064e3b]/20 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
