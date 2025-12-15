-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Anyone can view seo_metadata" ON public.seo_metadata;

-- Create new policy allowing only authenticated users to view SEO metadata
CREATE POLICY "Authenticated users can view seo_metadata" 
ON public.seo_metadata 
FOR SELECT 
USING (auth.uid() IS NOT NULL);