-- Update all RLS policies to use the new admin email

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view all contacts" ON public.contacts;
DROP POLICY IF EXISTS "Admins can update contacts" ON public.contacts;
DROP POLICY IF EXISTS "Admins can view all partnerships" ON public.partnerships;
DROP POLICY IF EXISTS "Admins can update partnerships" ON public.partnerships;
DROP POLICY IF EXISTS "Admins can view all content" ON public.site_content;
DROP POLICY IF EXISTS "Admins can insert content" ON public.site_content;
DROP POLICY IF EXISTS "Admins can update content" ON public.site_content;
DROP POLICY IF EXISTS "Admins can delete content" ON public.site_content;

-- Recreate policies with new admin email
CREATE POLICY "Admins can view all contacts" 
ON public.contacts 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'boltx.1700@gmail.com'
));

CREATE POLICY "Admins can update contacts" 
ON public.contacts 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'boltx.1700@gmail.com'
));

CREATE POLICY "Admins can view all partnerships" 
ON public.partnerships 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'boltx.1700@gmail.com'
));

CREATE POLICY "Admins can update partnerships" 
ON public.partnerships 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'boltx.1700@gmail.com'
));

CREATE POLICY "Admins can view all content" 
ON public.site_content 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'boltx.1700@gmail.com'
));

CREATE POLICY "Admins can insert content" 
ON public.site_content 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'boltx.1700@gmail.com'
));

CREATE POLICY "Admins can update content" 
ON public.site_content 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'boltx.1700@gmail.com'
));

CREATE POLICY "Admins can delete content" 
ON public.site_content 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM auth.users 
  WHERE auth.users.id = auth.uid() 
  AND auth.users.email = 'boltx.1700@gmail.com'
));