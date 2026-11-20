-- ==============================================================================
-- Supabase SQL Schema for IFC Season 2 (International Fiqh Conference)
-- Wafy Campus kalikavu - Department of Sharee'ah
-- Run this directly inside your Supabase SQL Editor
-- ==============================================================================

-- Enable pgcrypto for password hashing & UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert the IFC Admin Account
-- Email: ifcadmin@gmail.com | Password: ifcadmin@1
INSERT INTO public.admin_users (email, password_hash, role)
VALUES (
  'ifcadmin@gmail.com',
  crypt('ifcadmin@1', gen_salt('bf')),
  'superadmin'
)
ON CONFLICT (email) 
DO UPDATE SET password_hash = crypt('ifcadmin@1', gen_salt('bf'));

-- 2. VIDEOS TABLE
CREATE TABLE IF NOT EXISTS public.videos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  speaker TEXT NOT NULL,
  designation TEXT,
  duration TEXT,
  youtube_id TEXT NOT NULL,
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. GALLERY TABLE (Google Drive Images)
CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  drive_url TEXT NOT NULL,
  caption TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RESEARCH PAPERS TABLE (Google Drive PDF Links)
CREATE TABLE IF NOT EXISTS public.research_papers (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  arabic_title TEXT,
  author TEXT NOT NULL,
  author_role TEXT,
  department TEXT NOT NULL,
  year TEXT,
  drive_url TEXT NOT NULL,
  pages INT DEFAULT 1,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  institution TEXT NOT NULL,
  delegation_type TEXT DEFAULT 'Individual',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- PERMISSIONS & ACCESS CONTROL (CRITICAL: Grants access to anon & authenticated)
-- ==============================================================================

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;

-- Enable Row Level Security (RLS)
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Allow public read and write access
DROP POLICY IF EXISTS "Allow all on videos" ON public.videos;
CREATE POLICY "Allow all on videos" ON public.videos FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on gallery" ON public.gallery;
CREATE POLICY "Allow all on gallery" ON public.gallery FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on research_papers" ON public.research_papers;
CREATE POLICY "Allow all on research_papers" ON public.research_papers FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on registrations" ON public.registrations;
CREATE POLICY "Allow all on registrations" ON public.registrations FOR ALL USING (true) WITH CHECK (true);
