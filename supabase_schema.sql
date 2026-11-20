-- ==============================================================================
-- Supabase SQL Schema for IFC Season 2 (International Fiqh Conference)
-- Wafy Campus Kalikkavu - Department of Sharee'ah
-- Run this directly inside your Supabase SQL Editor
-- ==============================================================================

-- Enable pgcrypto for password hashing & UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. ADMIN USERS TABLE (Internal Auth Table)
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

-- (Optional) Create Supabase Auth User in auth.users table if using Supabase Built-in Auth
DO $$
DECLARE
  new_user_id UUID := gen_random_uuid();
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'ifcadmin@gmail.com') THEN
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      role
    )
    VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'ifcadmin@gmail.com',
      crypt('ifcadmin@1', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"IFC Admin"}',
      false,
      'authenticated'
    );
  END IF;
END $$;

-- 2. VIDEOS TABLE
CREATE TABLE IF NOT EXISTS public.videos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  speaker TEXT NOT NULL,
  designation TEXT,
  duration TEXT,
  youtube_id TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  views TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RESEARCH PAPERS TABLE
CREATE TABLE IF NOT EXISTS public.research_papers (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  arabic_title TEXT,
  author TEXT NOT NULL,
  author_role TEXT,
  department TEXT NOT NULL,
  year TEXT,
  abstract TEXT,
  pdf_url TEXT NOT NULL,
  download_url TEXT,
  pages INT DEFAULT 1,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. REGISTRATIONS TABLE (FOR SEASON 2 ATTENDEES)
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  institution TEXT NOT NULL,
  delegation_type TEXT DEFAULT 'Individual',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Allow public read access on media
CREATE POLICY "Allow public read access on videos" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Allow public read access on gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read access on research_papers" ON public.research_papers FOR SELECT USING (true);
CREATE POLICY "Allow public insert on registrations" ON public.registrations FOR INSERT WITH CHECK (true);

-- Allow full management for authenticated users / admins
CREATE POLICY "Allow admin all access on videos" ON public.videos FOR ALL USING (true);
CREATE POLICY "Allow admin all access on gallery" ON public.gallery FOR ALL USING (true);
CREATE POLICY "Allow admin all access on research_papers" ON public.research_papers FOR ALL USING (true);
CREATE POLICY "Allow admin all access on registrations" ON public.registrations FOR ALL USING (true);
