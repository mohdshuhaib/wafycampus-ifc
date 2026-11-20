import {
  FEATURED_VIDEOS,
  GALLERY_IMAGES,
  RESEARCH_PAPERS,
  VideoItem,
  GalleryItem,
  ResearchPaper
} from "@/data/conferenceData";

// Environment variables for Supabase (optional for local mock mode)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/**
 * Service methods that automatically pull from local datasets
 * or seamlessly transition to Supabase once credentials are provided in .env.local
 */
export async function fetchVideos(): Promise<VideoItem[]> {
  if (!isSupabaseConfigured) {
    return FEATURED_VIDEOS;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/videos?select=*&order=id.asc`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) throw new Error("Failed to fetch from Supabase");
    const data = await res.json();
    return data.length > 0 ? data : FEATURED_VIDEOS;
  } catch (error) {
    console.warn("Using local fallback video data:", error);
    return FEATURED_VIDEOS;
  }
}

export async function fetchGallery(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured) {
    return GALLERY_IMAGES;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/gallery?select=*&order=id.asc`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) throw new Error("Failed to fetch gallery from Supabase");
    const data = await res.json();
    return data.length > 0 ? data : GALLERY_IMAGES;
  } catch (error) {
    console.warn("Using local fallback gallery data:", error);
    return GALLERY_IMAGES;
  }
}

export async function fetchResearchPapers(): Promise<ResearchPaper[]> {
  if (!isSupabaseConfigured) {
    return RESEARCH_PAPERS;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/research_papers?select=*&order=id.asc`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) throw new Error("Failed to fetch papers from Supabase");
    const data = await res.json();
    return data.length > 0 ? data : RESEARCH_PAPERS;
  } catch (error) {
    console.warn("Using local fallback papers data:", error);
    return RESEARCH_PAPERS;
  }
}
