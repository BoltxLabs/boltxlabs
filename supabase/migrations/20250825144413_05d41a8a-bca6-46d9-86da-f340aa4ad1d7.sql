-- Create blogs table for blog management
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  author TEXT NOT NULL DEFAULT 'Bolt X Labs',
  category TEXT NOT NULL DEFAULT 'Technology',
  tags TEXT[],
  status TEXT NOT NULL DEFAULT 'draft',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  read_time INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create team members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  email TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site settings table for editable content
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  setting_type TEXT NOT NULL DEFAULT 'text',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table for managing notifications
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  notification_type TEXT NOT NULL DEFAULT 'general',
  target_audience TEXT NOT NULL DEFAULT 'all',
  is_sent BOOLEAN NOT NULL DEFAULT false,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for blogs
CREATE POLICY "Everyone can view published blogs" 
ON public.blogs 
FOR SELECT 
USING (status = 'published');

CREATE POLICY "Admins can view all blogs" 
ON public.blogs 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'boltx.1700@gmail.com'
));

CREATE POLICY "Admins can insert blogs" 
ON public.blogs 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'boltx.1700@gmail.com'
));

CREATE POLICY "Admins can update blogs" 
ON public.blogs 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'boltx.1700@gmail.com'
));

CREATE POLICY "Admins can delete blogs" 
ON public.blogs 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'boltx.1700@gmail.com'
));

-- Create RLS policies for team members
CREATE POLICY "Everyone can view active team members" 
ON public.team_members 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can view all team members" 
ON public.team_members 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'boltx.1700@gmail.com'
));

CREATE POLICY "Admins can manage team members" 
ON public.team_members 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'boltx.1700@gmail.com'
));

-- Create RLS policies for site settings
CREATE POLICY "Everyone can view public site settings" 
ON public.site_settings 
FOR SELECT 
USING (setting_key NOT LIKE 'admin_%');

CREATE POLICY "Admins can manage site settings" 
ON public.site_settings 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'boltx.1700@gmail.com'
));

-- Create RLS policies for notifications
CREATE POLICY "Admins can manage notifications" 
ON public.notifications 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'boltx.1700@gmail.com'
));

-- Add triggers for updated_at columns
CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON public.blogs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at
BEFORE UPDATE ON public.notifications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site settings
INSERT INTO public.site_settings (setting_key, setting_value, setting_type, description) VALUES
('hero_title', 'Building the Future of Robotics with AI', 'text', 'Main hero section title'),
('hero_subtitle', 'Innovative Solutions for Tomorrow''s Challenges', 'text', 'Hero section subtitle'),
('hero_description', 'At Bolt X Labs, we''re pioneering the next generation of intelligent robotics systems that seamlessly integrate artificial intelligence with cutting-edge hardware to solve real-world problems.', 'textarea', 'Hero section description'),
('company_email', 'hello@boltxlabs.com', 'email', 'Main company email'),
('company_phone', '+1 (555) 123-4567', 'text', 'Company phone number'),
('company_address', 'San Francisco, CA', 'text', 'Company address'),
('social_github', '#', 'url', 'GitHub profile URL'),
('social_discord', '#', 'url', 'Discord server URL'),
('social_youtube', '#', 'url', 'YouTube channel URL'),
('social_linkedin', '#', 'url', 'LinkedIn company page URL'),
('social_twitter', '#', 'url', 'Twitter/X profile URL'),
('footer_description', 'Pioneering the future of robotics and AI through innovative solutions and collaborative partnerships.', 'textarea', 'Footer description text');