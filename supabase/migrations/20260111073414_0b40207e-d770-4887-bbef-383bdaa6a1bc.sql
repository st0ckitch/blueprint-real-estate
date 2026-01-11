-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for role-based access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create admin_settings table for admin password
CREATE TABLE public.admin_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Project status enum
CREATE TYPE public.project_status_type AS ENUM ('ongoing', 'completed', 'upcoming');

-- Projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ka TEXT NOT NULL,
    name_en TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    address_ka TEXT,
    address_en TEXT,
    description_ka TEXT,
    description_en TEXT,
    status project_status_type NOT NULL DEFAULT 'ongoing',
    completion_date TEXT,
    total_units INTEGER DEFAULT 0,
    available_units INTEGER DEFAULT 0,
    price_from DECIMAL(12,2),
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Project tags table
CREATE TABLE public.project_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ka TEXT NOT NULL,
    name_en TEXT NOT NULL,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.project_tags ENABLE ROW LEVEL SECURITY;

-- Project-Tag junction table
CREATE TABLE public.project_tag_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    tag_id UUID REFERENCES public.project_tags(id) ON DELETE CASCADE NOT NULL,
    UNIQUE (project_id, tag_id)
);

-- Enable RLS
ALTER TABLE public.project_tag_assignments ENABLE ROW LEVEL SECURITY;

-- Apartment status enum
CREATE TYPE public.apartment_status_type AS ENUM ('available', 'reserved', 'sold');

-- Apartments table
CREATE TABLE public.apartments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    title_ka TEXT,
    title_en TEXT,
    floor INTEGER,
    area DECIMAL(10,2),
    rooms INTEGER,
    price DECIMAL(12,2),
    status apartment_status_type NOT NULL DEFAULT 'available',
    image_url TEXT,
    floor_plan_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.apartments ENABLE ROW LEVEL SECURITY;

-- Apartment features table
CREATE TABLE public.apartment_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ka TEXT NOT NULL,
    name_en TEXT NOT NULL,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.apartment_features ENABLE ROW LEVEL SECURITY;

-- Apartment-Feature junction table
CREATE TABLE public.apartment_feature_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    apartment_id UUID REFERENCES public.apartments(id) ON DELETE CASCADE NOT NULL,
    feature_id UUID REFERENCES public.apartment_features(id) ON DELETE CASCADE NOT NULL,
    UNIQUE (apartment_id, feature_id)
);

-- Enable RLS
ALTER TABLE public.apartment_feature_assignments ENABLE ROW LEVEL SECURITY;

-- Blog categories table
CREATE TABLE public.blog_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ka TEXT NOT NULL,
    name_en TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- Blog posts table with SEO fields
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title_ka TEXT NOT NULL,
    title_en TEXT NOT NULL,
    excerpt_ka TEXT,
    excerpt_en TEXT,
    content_ka TEXT,
    content_en TEXT,
    image_url TEXT,
    category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
    -- SEO fields
    meta_title_ka TEXT,
    meta_title_en TEXT,
    meta_description_ka TEXT,
    meta_description_en TEXT,
    focus_keyword TEXT,
    seo_score INTEGER DEFAULT 0,
    -- Status
    is_active BOOLEAN NOT NULL DEFAULT false,
    read_time INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Site settings table
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    label_ka TEXT,
    label_en TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Banners table
CREATE TABLE public.banners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_ka TEXT,
    title_en TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access

-- Projects: Public can read active projects
CREATE POLICY "Anyone can view active projects"
ON public.projects FOR SELECT
USING (is_active = true);

-- Apartments: Public can read active apartments
CREATE POLICY "Anyone can view active apartments"
ON public.apartments FOR SELECT
USING (is_active = true);

-- Blog posts: Public can read active posts
CREATE POLICY "Anyone can view active blog posts"
ON public.blog_posts FOR SELECT
USING (is_active = true);

-- Blog categories: Public can read all categories
CREATE POLICY "Anyone can view blog categories"
ON public.blog_categories FOR SELECT
USING (true);

-- Project tags: Public can read all tags
CREATE POLICY "Anyone can view project tags"
ON public.project_tags FOR SELECT
USING (true);

-- Site settings: Public can read all settings
CREATE POLICY "Anyone can view site settings"
ON public.site_settings FOR SELECT
USING (true);

-- Banners: Public can view active banners
CREATE POLICY "Anyone can view active banners"
ON public.banners FOR SELECT
USING (is_active = true);

-- Apartment features: Public can read all features
CREATE POLICY "Anyone can view apartment features"
ON public.apartment_features FOR SELECT
USING (true);

-- Junction tables: Public read access
CREATE POLICY "Anyone can view project tag assignments"
ON public.project_tag_assignments FOR SELECT
USING (true);

CREATE POLICY "Anyone can view apartment feature assignments"
ON public.apartment_feature_assignments FOR SELECT
USING (true);

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update triggers
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_apartments_updated_at
BEFORE UPDATE ON public.apartments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_banners_updated_at
BEFORE UPDATE ON public.banners
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_settings_updated_at
BEFORE UPDATE ON public.admin_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site settings
INSERT INTO public.site_settings (key, value, label_ka, label_en) VALUES
('total_apartments', '150', 'სულ ბინები', 'Total Apartments'),
('starting_price', '45000', 'საწყისი ფასი', 'Starting Price'),
('available_apartments', '23', 'ხელმისაწვდომი ბინები', 'Available Apartments'),
('company_email', 'info@company.ge', 'ელ. ფოსტა', 'Email'),
('company_phone', '+995 555 123 456', 'ტელეფონი', 'Phone');

-- Insert default blog categories
INSERT INTO public.blog_categories (name_ka, name_en, slug) VALUES
('პროექტები', 'Projects', 'projects'),
('რჩევები', 'Tips', 'tips'),
('სიახლეები', 'News', 'news'),
('გზამკვლევი', 'Guides', 'guides');

-- Insert default project tags
INSERT INTO public.project_tags (name_ka, name_en, icon) VALUES
('ავტოსადგომი', 'Parking', 'car'),
('მწვანე ზონა', 'Green Zone', 'trees'),
('სპორტ დარბაზი', 'Gym', 'dumbbell'),
('საბავშვო მოედანი', 'Playground', 'baby'),
('დაცვა 24/7', 'Security 24/7', 'shield'),
('ლიფტი', 'Elevator', 'arrow-up');

-- Insert default apartment features
INSERT INTO public.apartment_features (name_ka, name_en, icon) VALUES
('აივანი', 'Balcony', 'door-open'),
('პანორამული ფანჯრები', 'Panoramic Windows', 'maximize'),
('ცენტრალური გათბობა', 'Central Heating', 'thermometer'),
('კონდიციონერი', 'Air Conditioning', 'wind'),
('სარდაფი', 'Basement', 'warehouse');

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
('banners', 'banners', true),
('blog-images', 'blog-images', true),
('project-images', 'project-images', true),
('apartment-images', 'apartment-images', true);

-- Storage policies for public read access
CREATE POLICY "Public can view banner images"
ON storage.objects FOR SELECT
USING (bucket_id = 'banners');

CREATE POLICY "Public can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

CREATE POLICY "Public can view project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Public can view apartment images"
ON storage.objects FOR SELECT
USING (bucket_id = 'apartment-images');