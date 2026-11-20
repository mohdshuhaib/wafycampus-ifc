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
  Video,
  FileText,
  Images,
  LayoutDashboard,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
  ArrowLeft,
  Users
} from "lucide-react";
import {
  FEATURED_VIDEOS,
  GALLERY_IMAGES,
  RESEARCH_PAPERS,
  VideoItem,
  GalleryItem,
  ResearchPaper
} from "@/data/conferenceData";

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<"overview" | "videos" | "papers" | "gallery" | "sql">("overview");

  // Data States (initialized with defaults or localStorage)
  const [videos, setVideos] = useState<VideoItem[]>(FEATURED_VIDEOS);
  const [papers, setPapers] = useState<ResearchPaper[]>(RESEARCH_PAPERS);
  const [gallery, setGallery] = useState<GalleryItem[]>(GALLERY_IMAGES);
  const [notification, setNotification] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  // New Video Form State
  const [newVideo, setNewVideo] = useState({
    title: "",
    speaker: "",
    designation: "Research Scholar, Wafy Campus",
    duration: "25:00",
    youtubeUrl: "",
    category: "Academic Paper" as VideoItem["category"],
    description: "",
    thumbnailUrl: "/img1.png",
    views: "1.2K views",
    featured: true
  });

  // New Paper Form State
  const [newPaper, setNewPaper] = useState({
    title: "",
    arabicTitle: "",
    author: "",
    authorRole: "Faculty of Islamic Jurisprudence",
    department: "Muamalah" as ResearchPaper["department"],
    year: "2026",
    abstract: "",
    pdfUrl: "/papers/paper1.pdf",
    downloadUrl: "/papers/paper1.pdf",
    pages: 20,
    featured: true
  });

  // New Gallery Form State
  const [newGallery, setNewGallery] = useState({
    title: "",
    category: "Academic Sessions" as GalleryItem["category"],
    imageUrl: "/img2.png",
    caption: "",
    featured: true
  });

  // Check existing session
  useEffect(() => {
    const session = localStorage.getItem("ifc_admin_auth");
    if (session === "true") {
      setIsAuthenticated(true);
    }
    const savedVideos = localStorage.getItem("ifc_admin_videos");
    if (savedVideos) {
      try { setVideos(JSON.parse(savedVideos)); } catch {}
    }
    const savedPapers = localStorage.getItem("ifc_admin_papers");
    if (savedPapers) {
      try { setPapers(JSON.parse(savedPapers)); } catch {}
    }
    const savedGallery = localStorage.getItem("ifc_admin_gallery");
    if (savedGallery) {
      try { setGallery(JSON.parse(savedGallery)); } catch {}
    }
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (email.trim() === "ifcadmin@gmail.com" && password === "ifcadmin@1") {
      setIsAuthenticated(true);
      localStorage.setItem("ifc_admin_auth", "true");
      showToast("Signed in successfully as Administrator");
    } else {
      setLoginError("Invalid credentials. Please use ifcadmin@gmail.com / ifcadmin@1");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("ifc_admin_auth");
  };

  // Extract YouTube ID from link or input
  const extractYoutubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : url.trim();
  };

  // Add Video
  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const ytId = extractYoutubeId(newVideo.youtubeUrl);
    const videoItem: VideoItem = {
      id: `vid-${Date.now()}`,
      title: newVideo.title,
      speaker: newVideo.speaker,
      designation: newVideo.designation,
      duration: newVideo.duration,
      youtubeId: ytId || "dQw4w9WgXcQ",
      category: newVideo.category,
      description: newVideo.description,
      thumbnailUrl: newVideo.thumbnailUrl || "/img1.png",
      views: newVideo.views,
      featured: newVideo.featured
    };

    const updated = [videoItem, ...videos];
    setVideos(updated);
    localStorage.setItem("ifc_admin_videos", JSON.stringify(updated));
    showToast("New video added successfully!");
    setNewVideo({
      title: "",
      speaker: "",
      designation: "Research Scholar, Wafy Campus",
      duration: "25:00",
      youtubeUrl: "",
      category: "Academic Paper",
      description: "",
      thumbnailUrl: "/img1.png",
      views: "1.2K views",
      featured: true
    });
  };

  // Delete Video
  const handleDeleteVideo = (id: string) => {
    const updated = videos.filter((v) => v.id !== id);
    setVideos(updated);
    localStorage.setItem("ifc_admin_videos", JSON.stringify(updated));
    showToast("Video deleted");
  };

  // Add Paper
  const handleAddPaper = (e: React.FormEvent) => {
    e.preventDefault();
    const paperItem: ResearchPaper = {
      id: `paper-${Date.now()}`,
      title: newPaper.title,
      arabicTitle: newPaper.arabicTitle || undefined,
      author: newPaper.author,
      authorRole: newPaper.authorRole,
      department: newPaper.department,
      year: newPaper.year,
      abstract: newPaper.abstract,
      pdfUrl: newPaper.pdfUrl,
      downloadUrl: newPaper.pdfUrl,
      pages: Number(newPaper.pages) || 1,
      featured: newPaper.featured
    };

    const updated = [paperItem, ...papers];
    setPapers(updated);
    localStorage.setItem("ifc_admin_papers", JSON.stringify(updated));
    showToast("New research paper added successfully!");
    setNewPaper({
      title: "",
      arabicTitle: "",
      author: "",
      authorRole: "Faculty of Islamic Jurisprudence",
      department: "Muamalah",
      year: "2026",
      abstract: "",
      pdfUrl: "/papers/paper1.pdf",
      downloadUrl: "/papers/paper1.pdf",
      pages: 20,
      featured: true
    });
  };

  // Delete Paper
  const handleDeletePaper = (id: string) => {
    const updated = papers.filter((p) => p.id !== id);
    setPapers(updated);
    localStorage.setItem("ifc_admin_papers", JSON.stringify(updated));
    showToast("Research paper removed");
  };

  // Add Gallery Image
  const handleAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    const galleryItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: newGallery.title,
      category: newGallery.category,
      imageUrl: newGallery.imageUrl || "/img2.png",
      caption: newGallery.caption,
      featured: newGallery.featured
    };

    const updated = [galleryItem, ...gallery];
    setGallery(updated);
    localStorage.setItem("ifc_admin_gallery", JSON.stringify(updated));
    showToast("New gallery photo added!");
    setNewGallery({
      title: "",
      category: "Academic Sessions",
      imageUrl: "/img2.png",
      caption: "",
      featured: true
    });
  };

  // Delete Gallery Image
  const handleDeleteGallery = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    localStorage.setItem("ifc_admin_gallery", JSON.stringify(updated));
    showToast("Gallery item deleted");
  };

  // Generate SQL script for export
  const generatedSql = `-- SQL Inserts generated from IFC Admin Panel
-- Run these statements in Supabase SQL Editor

-- 1. Insert Videos
${videos
  .map(
    (v) =>
      `INSERT INTO public.videos (id, title, speaker, designation, duration, youtube_id, category, description, thumbnail_url, views, featured) VALUES ('${v.id}', '${v.title.replace(/'/g, "''")}', '${v.speaker.replace(/'/g, "''")}', '${(v.designation || "").replace(/'/g, "''")}', '${v.duration}', '${v.youtubeId}', '${v.category}', '${v.description.replace(/'/g, "''")}', '${v.thumbnailUrl}', '${v.views || ""}', ${v.featured}) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;`
  )
  .join("\n")}

-- 2. Insert Research Papers
${papers
  .map(
    (p) =>
      `INSERT INTO public.research_papers (id, title, arabic_title, author, author_role, department, year, abstract, pdf_url, download_url, pages, featured) VALUES ('${p.id}', '${p.title.replace(/'/g, "''")}', '${(p.arabicTitle || "").replace(/'/g, "''")}', '${p.author.replace(/'/g, "''")}', '${p.authorRole.replace(/'/g, "''")}', '${p.department}', '${p.year}', '${p.abstract.replace(/'/g, "''")}', '${p.pdfUrl}', '${p.downloadUrl}', ${p.pages}, ${p.featured}) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;`
  )
  .join("\n")}

-- 3. Insert Gallery Images
${gallery
  .map(
    (g) =>
      `INSERT INTO public.gallery (id, title, category, image_url, caption, featured) VALUES ('${g.id}', '${g.title.replace(/'/g, "''")}', '${g.category}', '${g.imageUrl}', '${g.caption.replace(/'/g, "''")}', ${g.featured}) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;`
  )
  .join("\n")}
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // If Not Authenticated, show Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex flex-col justify-center items-center p-4 selection:bg-[#064e3b] selection:text-white">
        {/* Top Back Link */}
        <div className="w-full max-w-md mb-6 flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#064e3b] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Live Website</span>
          </Link>
          <span className="text-xs font-mono text-[#064e3b] font-bold">IFC SECURE PORTAL</span>
        </div>

        {/* Login Box */}
        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#064e3b] text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#064e3b]/25">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-[#1d1d1f] tracking-tight">
              IFC Admin Panel
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
              Department of Sharee&apos;ah • Wafy Campus Kalikkavu
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="ifcadmin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20"
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
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20"
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
              className="w-full py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider text-white bg-[#064e3b] hover:bg-[#043d2e] shadow-lg shadow-[#064e3b]/20 transition-all transform hover:-translate-y-0.5"
            >
              Sign In to Dashboard
            </button>
          </form>

          {/* Quick Demo Autofill */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <button
              onClick={() => {
                setEmail("ifcadmin@gmail.com");
                setPassword("ifcadmin@1");
              }}
              className="text-xs font-semibold text-[#064e3b] hover:underline"
            >
              Autofill Credentials (ifcadmin@gmail.com)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col selection:bg-[#064e3b] selection:text-white">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl bg-[#064e3b] text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin Top Navigation */}
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
                Logged in as ifcadmin@gmail.com
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#043d2e] hover:bg-emerald-900 text-xs font-semibold text-emerald-100 transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-700/80 hover:bg-rose-700 text-xs font-bold text-white transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs mb-2">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              Navigation
            </div>
            <nav className="flex flex-col gap-1.5">
              {[
                { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
                { id: "videos", label: `Videos (${videos.length})`, icon: Video },
                { id: "papers", label: `Research Papers (${papers.length})`, icon: FileText },
                { id: "gallery", label: `Gallery (${gallery.length})`, icon: Images },
                { id: "sql", label: "Export to Supabase SQL", icon: Copy },
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

          <div className="p-4 rounded-3xl bg-emerald-50 border border-emerald-200 text-xs text-[#064e3b]">
            <span className="font-bold block mb-1">Supabase Linked:</span>
            Your changes are automatically stored in the active state and ready to be synced with your Supabase SQL editor using the SQL tab.
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Overview &amp; Statistics
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage conference media, research publications, and gallery contents for IFC Season 2.
                </p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Videos</div>
                    <div className="text-3xl font-black text-[#064e3b] mt-1">{videos.length}</div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#064e3b] flex items-center justify-center">
                    <Video className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Research Papers</div>
                    <div className="text-3xl font-black text-[#064e3b] mt-1">{papers.length}</div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#064e3b] flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gallery Images</div>
                    <div className="text-3xl font-black text-[#064e3b] mt-1">{gallery.length}</div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#064e3b] flex items-center justify-center">
                    <Images className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  Quick Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab("videos")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#064e3b] text-white text-xs font-bold hover:bg-[#043d2e] shadow-xs"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add New Video</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("papers")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#064e3b] text-white text-xs font-bold hover:bg-[#043d2e] shadow-xs"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Upload Research Paper</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("gallery")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#064e3b] text-white text-xs font-bold hover:bg-[#043d2e] shadow-xs"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add Photo to Gallery</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VIDEOS */}
          {activeTab === "videos" && (
            <div className="space-y-8">
              {/* Add Video Form */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-4 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-[#064e3b]" />
                  <span>Add New YouTube Video</span>
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
                        YouTube URL or Video ID *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        value={newVideo.youtubeUrl}
                        onChange={(e) => setNewVideo({ ...newVideo, youtubeUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Duration &amp; Category
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Duration (e.g. 35:20)"
                          value={newVideo.duration}
                          onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                        />
                        <select
                          value={newVideo.category}
                          onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value as any })}
                          className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#064e3b]"
                        >
                          <option value="Inaugural">Inaugural</option>
                          <option value="Keynote">Keynote</option>
                          <option value="Panel Discussion">Panel Discussion</option>
                          <option value="Academic Paper">Academic Paper</option>
                          <option value="Valedictory">Valedictory</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Description / Summary *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Brief overview explaining what this video session covers..."
                      value={newVideo.description}
                      onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-[#064e3b] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#043d2e] shadow-md"
                  >
                    Save Video Entry
                  </button>
                </form>
              </div>

              {/* Current Videos List */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">
                  Current Videos List ({videos.length})
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {videos.map((vid) => (
                    <div
                      key={vid.id}
                      className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className="w-20 aspect-video rounded-xl overflow-hidden bg-black shrink-0 relative">
                          <Image src={vid.thumbnailUrl} alt={vid.title} fill className="object-cover" />
                        </div>
                        <div className="truncate">
                          <span className="text-[10px] font-black uppercase text-[#064e3b] bg-emerald-50 px-2 py-0.5 rounded-md mr-2">
                            {vid.category}
                          </span>
                          <span className="text-xs font-mono text-slate-400">{vid.duration}</span>
                          <h4 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                            {vid.title}
                          </h4>
                          <p className="text-xs text-slate-500 truncate">{vid.speaker}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                          title="Open on YouTube"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
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

          {/* TAB 3: PAPERS */}
          {activeTab === "papers" && (
            <div className="space-y-8">
              {/* Add Paper Form */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-4 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-[#064e3b]" />
                  <span>Add New Research Paper</span>
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
                        placeholder="e.g. Contemporary Waqf Governance in India"
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
                        placeholder="e.g. حوكمة الأوقاف المعاصرة"
                        value={newPaper.arabicTitle}
                        onChange={(e) => setNewPaper({ ...newPaper, arabicTitle: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-right font-arabic focus:outline-none focus:border-[#064e3b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Author / Research Scholar *
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
                          onChange={(e) => setNewPaper({ ...newPaper, department: e.target.value as any })}
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
                        PDF Path or Google Drive URL *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="/papers/paper1.pdf or https://drive.google.com/..."
                        value={newPaper.pdfUrl}
                        onChange={(e) => setNewPaper({ ...newPaper, pdfUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Abstract / Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Summary of the paper's thesis and juridical findings..."
                      value={newPaper.abstract}
                      onChange={(e) => setNewPaper({ ...newPaper, abstract: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-[#064e3b] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#043d2e] shadow-md"
                  >
                    Save Research Paper
                  </button>
                </form>
              </div>

              {/* Current Papers List */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">
                  Current Research Papers ({papers.length})
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {papers.map((p) => (
                    <div
                      key={p.id}
                      className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase text-[#064e3b] bg-emerald-50 px-2 py-0.5 rounded-md">
                            {p.department}
                          </span>
                          <span className="text-xs font-mono text-slate-400">{p.pages} Pages</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 truncate">
                          {p.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">{p.author}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={p.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                          title="Open PDF"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
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

          {/* TAB 4: GALLERY */}
          {activeTab === "gallery" && (
            <div className="space-y-8">
              {/* Add Gallery Form */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-4 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-[#064e3b]" />
                  <span>Add New Photo to Gallery</span>
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
                        placeholder="e.g. Inaugural Address Audience"
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
                        onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value as any })}
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
                        Image URL or Local Path *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="/img1.png, /poster.jpg or https://..."
                        value={newGallery.imageUrl}
                        onChange={(e) => setNewGallery({ ...newGallery, imageUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Caption
                    </label>
                    <input
                      type="text"
                      placeholder="Brief caption for the photo..."
                      value={newGallery.caption}
                      onChange={(e) => setNewGallery({ ...newGallery, caption: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#064e3b]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-[#064e3b] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#043d2e] shadow-md"
                  >
                    Save Photo
                  </button>
                </form>
              </div>

              {/* Current Gallery Grid */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">
                  Current Photos ({gallery.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {gallery.map((g) => (
                    <div
                      key={g.id}
                      className="group relative rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs"
                    >
                      <div className="relative aspect-[4/3] bg-slate-100">
                        <Image src={g.imageUrl} alt={g.title} fill className="object-cover" />
                        <button
                          onClick={() => handleDeleteGallery(g.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-xl bg-black/60 text-rose-400 hover:text-white hover:bg-rose-600 transition-colors"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-3">
                        <span className="text-[10px] font-bold text-[#064e3b] uppercase">
                          {g.category}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">
                          {g.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SQL EXPORTER */}
          {activeTab === "sql" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Supabase SQL Sync Script
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Copy and run these SQL statements directly inside your Supabase SQL Editor.
                  </p>
                </div>

                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#064e3b] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#043d2e] shadow-md transition-all"
                >
                  {copiedSql ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSql ? "Copied to Clipboard!" : "Copy SQL Script"}</span>
                </button>
              </div>

              <div className="relative rounded-3xl bg-slate-950 p-6 text-emerald-400 font-mono text-xs overflow-x-auto max-h-[550px] border border-slate-800 shadow-2xl">
                <pre>{generatedSql}</pre>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
