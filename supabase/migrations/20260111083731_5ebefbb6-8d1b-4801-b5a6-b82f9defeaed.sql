-- Allow anyone to insert banners (for admin use)
CREATE POLICY "Allow public insert to banners"
ON public.banners
FOR INSERT
WITH CHECK (true);

-- Allow anyone to update banners (for admin use)
CREATE POLICY "Allow public update to banners"
ON public.banners
FOR UPDATE
USING (true);

-- Allow anyone to delete banners (for admin use)
CREATE POLICY "Allow public delete from banners"
ON public.banners
FOR DELETE
USING (true);

-- Also allow viewing all banners for admin (not just active ones)
CREATE POLICY "Allow public select all banners"
ON public.banners
FOR SELECT
USING (true);