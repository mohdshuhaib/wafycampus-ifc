import fs from "fs";
import path from "path";

export interface VideoData {
  id: string;
  title: string;
  speaker: string;
  designation: string;
  duration: string;
  youtubeId: string;
  category: string;
  featured: boolean;
  createdAt?: string;
}

export interface PaperData {
  id: string;
  title: string;
  arabicTitle?: string;
  author: string;
  authorRole: string;
  department: string;
  year: string;
  driveUrl: string;
  pages: number;
  featured: boolean;
  createdAt?: string;
}

export interface GalleryData {
  id: string;
  title: string;
  category: string;
  driveUrl: string;
  caption?: string;
  featured: boolean;
  createdAt?: string;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const DB_FILE = path.join(process.cwd(), "src", "data", "serverDb.json");

// Initial baseline data in case database is freshly initialized
const DEFAULT_VIDEOS: VideoData[] = [
  {
    id: "vid-1",
    title: "IFC Season 1 Grand Inaugural Address: Fiqh for Modern Civilisation",
    speaker: "Usthad Abdul Hakeem Faizy Adrissery",
    designation: "General Secretary, CIC",
    duration: "42:15",
    youtubeId: "dQw4w9WgXcQ",
    category: "Inaugural",
    featured: true
  },
  {
    id: "vid-2",
    title: "Islamic Finance Principles: Blueprint for Ethical Economic Growth in India",
    speaker: "Dr. Luqmanul Hakeem Azhari",
    designation: "Senior Jurisprudence Fellow",
    duration: "34:50",
    youtubeId: "LXb3EKWsInQ",
    category: "Keynote",
    featured: true
  },
  {
    id: "vid-3",
    title: "Panel Discussion: Digital Currencies & Modern Contracts Under Shariah Review",
    speaker: "Faculty of Muamalah Panel",
    designation: "Muamalah Department, Wafy Campus",
    duration: "58:10",
    youtubeId: "3JZ_D3ELwOQ",
    category: "Panel Discussion",
    featured: true
  },
  {
    id: "vid-4",
    title: "Contemporary Family Disputes & Mediation Mechanisms in Islamic Jurisprudence",
    speaker: "Faculty of Usrah Scholars",
    designation: "Usrah Department, Wafy Campus",
    duration: "29:45",
    youtubeId: "fJ9rUzIMcZQ",
    category: "Academic Paper",
    featured: true
  },
  {
    id: "vid-5",
    title: "IFC Season 1 Concluding Resolutions & Season 2 Roadmap Announcement",
    speaker: "Scholarly Council of Wafy Campus",
    designation: "Wafy Campus Kalikavu",
    duration: "25:30",
    youtubeId: "kXYiU_JCYtU",
    category: "Valedictory",
    featured: true
  }
];

const DEFAULT_PAPERS: PaperData[] = [
  {
    id: "paper-1",
    title: "Islamic Finance Principles: Strength & Opportunities for India's Ethical Growth",
    arabicTitle: "مبادئ التمويل الإسلامي: القوة والفرص للنمو الأخلاقي في الهند",
    author: "Dept. of Muamalah Research Collective",
    authorRole: "Faculty of Islamic Jurisprudence, Wafy Campus Kalikavu",
    department: "Muamalah",
    year: "2025-2026",
    driveUrl: "https://drive.google.com/file/d/1examplePdfPaperOne/view?usp=sharing",
    pages: 28,
    featured: true
  },
  {
    id: "paper-2",
    title: "Cryptocurrency, CBDCs & Digital Assets in Contemporary Fiqh Deliberations",
    arabicTitle: "العملات الرقمية والأصول المشفرة في ميزان الفقه الإسلامي المعاصر",
    author: "Scholars of MUL 2 (Muamalah Final Year)",
    authorRole: "Postgraduate Juridical Research Group",
    department: "Muamalah",
    year: "2025",
    driveUrl: "https://drive.google.com/file/d/1examplePdfPaperTwo/view?usp=sharing",
    pages: 34,
    featured: true
  },
  {
    id: "paper-3",
    title: "Mediation & Reconciliation in Modern Marital Disputes: Usrah Jurisprudential Model",
    arabicTitle: "التحكيم والإصلاح في النزاعات الأسرية المعاصرة: نموذج كلية الأسرة",
    author: "Scholars of USR 2 (Usrah Final Year)",
    authorRole: "Family Law & Arbitration Wing",
    department: "Usrah",
    year: "2025",
    driveUrl: "https://drive.google.com/file/d/1examplePdfPaperThree/view?usp=sharing",
    pages: 24,
    featured: true
  }
];

const DEFAULT_GALLERY: GalleryData[] = [
  {
    id: "gal-1",
    title: "Grand Inaugural Plenary Hall",
    category: "Inaugural",
    driveUrl: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    caption: "Scholars and delegates filling the main conference auditorium.",
    featured: true
  },
  {
    id: "gal-2",
    title: "Keynote Lecture on Contemporary Fiqh",
    category: "Academic Sessions",
    driveUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    caption: "Senior jurists delivering the keynote address on economic principles.",
    featured: true
  },
  {
    id: "gal-3",
    title: "Scholarly Research Paper Presentations",
    category: "Academic Sessions",
    driveUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80",
    caption: "Postgraduate scholars of Muamalah & Usrah presenting peer-reviewed research.",
    featured: true
  },
  {
    id: "gal-4",
    title: "Dignitaries on the Dais",
    category: "Dignitaries",
    driveUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    caption: "Distinguished scholars from CIC and national universities convened on the dais.",
    featured: true
  },
  {
    id: "gal-5",
    title: "Wafy Campus Kalikavu Sharee'ah Delegation",
    category: "Campus Life",
    driveUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    caption: "Student committee of the Sharee'ah Department organizing the event.",
    featured: true
  }
];

interface ServerStore {
  videos: VideoData[];
  papers: PaperData[];
  gallery: GalleryData[];
}

function getLocalStore(): ServerStore {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading local db file:", e);
  }
  const initial = { videos: DEFAULT_VIDEOS, papers: DEFAULT_PAPERS, gallery: DEFAULT_GALLERY };
  saveLocalStore(initial);
  return initial;
}

function saveLocalStore(store: ServerStore) {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving local db file:", e);
  }
}

// ----------------- VIDEOS -----------------
export async function getVideos(): Promise<VideoData[]> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/videos?select=*&order=created_at.desc`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
        cache: "no-store"
      });
      if (res.ok) {
        const rows = await res.json();
        return rows.map((r: any) => ({
          id: r.id,
          title: r.title,
          speaker: r.speaker,
          designation: r.designation,
          duration: r.duration,
          youtubeId: r.youtube_id || r.youtubeId,
          category: r.category,
          featured: Boolean(r.featured),
          createdAt: r.created_at
        }));
      }
    } catch {}
  }
  return getLocalStore().videos;
}

export async function addVideo(video: VideoData): Promise<void> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/videos`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          id: video.id,
          title: video.title,
          speaker: video.speaker,
          designation: video.designation,
          duration: video.duration,
          youtube_id: video.youtubeId,
          category: video.category,
          featured: video.featured
        })
      });
    } catch {}
  }
  const store = getLocalStore();
  store.videos = [video, ...store.videos.filter((v) => v.id !== video.id)];
  saveLocalStore(store);
}

export async function deleteVideo(id: string): Promise<void> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/videos?id=eq.${id}`, {
        method: "DELETE",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      });
    } catch {}
  }
  const store = getLocalStore();
  store.videos = store.videos.filter((v) => v.id !== id);
  saveLocalStore(store);
}

export async function toggleVideoFeatured(id: string, featured: boolean): Promise<void> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/videos?id=eq.${id}`, {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ featured })
      });
    } catch {}
  }
  const store = getLocalStore();
  store.videos = store.videos.map((v) => (v.id === id ? { ...v, featured } : v));
  saveLocalStore(store);
}

// ----------------- PAPERS -----------------
export async function getPapers(): Promise<PaperData[]> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/research_papers?select=*&order=created_at.desc`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
        cache: "no-store"
      });
      if (res.ok) {
        const rows = await res.json();
        return rows.map((r: any) => ({
          id: r.id,
          title: r.title,
          arabicTitle: r.arabic_title || r.arabicTitle,
          author: r.author,
          authorRole: r.author_role || r.authorRole,
          department: r.department,
          year: r.year,
          driveUrl: r.drive_url || r.driveUrl || r.pdf_url,
          pages: r.pages,
          featured: Boolean(r.featured),
          createdAt: r.created_at
        }));
      }
    } catch {}
  }
  return getLocalStore().papers;
}

export async function addPaper(paper: PaperData): Promise<void> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/research_papers`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          id: paper.id,
          title: paper.title,
          arabic_title: paper.arabicTitle,
          author: paper.author,
          author_role: paper.authorRole,
          department: paper.department,
          year: paper.year,
          drive_url: paper.driveUrl,
          pages: paper.pages,
          featured: paper.featured
        })
      });
    } catch {}
  }
  const store = getLocalStore();
  store.papers = [paper, ...store.papers.filter((p) => p.id !== paper.id)];
  saveLocalStore(store);
}

export async function deletePaper(id: string): Promise<void> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/research_papers?id=eq.${id}`, {
        method: "DELETE",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      });
    } catch {}
  }
  const store = getLocalStore();
  store.papers = store.papers.filter((p) => p.id !== id);
  saveLocalStore(store);
}

export async function togglePaperFeatured(id: string, featured: boolean): Promise<void> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/research_papers?id=eq.${id}`, {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ featured })
      });
    } catch {}
  }
  const store = getLocalStore();
  store.papers = store.papers.map((p) => (p.id === id ? { ...p, featured } : p));
  saveLocalStore(store);
}

// ----------------- GALLERY -----------------
export async function getGallery(): Promise<GalleryData[]> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/gallery?select=*&order=created_at.desc`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
        cache: "no-store"
      });
      if (res.ok) {
        const rows = await res.json();
        return rows.map((r: any) => ({
          id: r.id,
          title: r.title,
          category: r.category,
          driveUrl: r.drive_url || r.driveUrl || r.image_url,
          caption: r.caption,
          featured: Boolean(r.featured),
          createdAt: r.created_at
        }));
      }
    } catch {}
  }
  return getLocalStore().gallery;
}

export async function addGallery(item: GalleryData): Promise<void> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/gallery`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          id: item.id,
          title: item.title,
          category: item.category,
          drive_url: item.driveUrl,
          caption: item.caption,
          featured: item.featured
        })
      });
    } catch {}
  }
  const store = getLocalStore();
  store.gallery = [item, ...store.gallery.filter((g) => g.id !== item.id)];
  saveLocalStore(store);
}

export async function deleteGallery(id: string): Promise<void> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/gallery?id=eq.${id}`, {
        method: "DELETE",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      });
    } catch {}
  }
  const store = getLocalStore();
  store.gallery = store.gallery.filter((g) => g.id !== id);
  saveLocalStore(store);
}

export async function toggleGalleryFeatured(id: string, featured: boolean): Promise<void> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/gallery?id=eq.${id}`, {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ featured })
      });
    } catch {}
  }
  const store = getLocalStore();
  store.gallery = store.gallery.map((g) => (g.id === id ? { ...g, featured } : g));
  saveLocalStore(store);
}
