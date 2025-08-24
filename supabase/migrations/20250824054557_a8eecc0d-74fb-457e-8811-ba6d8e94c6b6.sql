-- Create contacts table for contact form submissions
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create partnerships table for partnership applications
CREATE TABLE public.partnerships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  partnership_type TEXT NOT NULL,
  description TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site content table for admin to manage website content
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type TEXT NOT NULL,
  title TEXT,
  content TEXT,
  image_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER DEFAULT 0,
  admin_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Contacts policies: Only admins can access
CREATE POLICY "Admins can view all contacts" 
ON public.contacts 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'admin@boltxlabs.com'
));

CREATE POLICY "Anyone can insert contacts" 
ON public.contacts 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update contacts" 
ON public.contacts 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'admin@boltxlabs.com'
));

-- Partnerships policies: Only admins can access
CREATE POLICY "Admins can view all partnerships" 
ON public.partnerships 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'admin@boltxlabs.com'
));

CREATE POLICY "Anyone can insert partnerships" 
ON public.partnerships 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update partnerships" 
ON public.partnerships 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'admin@boltxlabs.com'
));

-- Site content policies: Everyone can view published, only admins can manage
CREATE POLICY "Everyone can view published content" 
ON public.site_content 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Admins can view all content" 
ON public.site_content 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'admin@boltxlabs.com'
));

CREATE POLICY "Admins can insert content" 
ON public.site_content 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'admin@boltxlabs.com'
));

CREATE POLICY "Admins can update content" 
ON public.site_content 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'admin@boltxlabs.com'
));

CREATE POLICY "Admins can delete content" 
ON public.site_content 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'admin@boltxlabs.com'
));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_partnerships_updated_at
  BEFORE UPDATE ON public.partnerships
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();