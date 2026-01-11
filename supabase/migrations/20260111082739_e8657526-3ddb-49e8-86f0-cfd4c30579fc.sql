-- Allow anyone to upload to the banners bucket (for admin use)
CREATE POLICY "Allow public upload to banners"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'banners');

-- Allow anyone to update files in the banners bucket
CREATE POLICY "Allow public update to banners"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'banners');

-- Allow anyone to delete files from the banners bucket
CREATE POLICY "Allow public delete from banners"
ON storage.objects
FOR DELETE
USING (bucket_id = 'banners');

-- Also add policies for other image buckets if they don't exist
DO $$
BEGIN
  -- blog-images bucket policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public upload to blog-images' AND tablename = 'objects') THEN
    CREATE POLICY "Allow public upload to blog-images"
    ON storage.objects
    FOR INSERT
    WITH CHECK (bucket_id = 'blog-images');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public update to blog-images' AND tablename = 'objects') THEN
    CREATE POLICY "Allow public update to blog-images"
    ON storage.objects
    FOR UPDATE
    USING (bucket_id = 'blog-images');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public delete from blog-images' AND tablename = 'objects') THEN
    CREATE POLICY "Allow public delete from blog-images"
    ON storage.objects
    FOR DELETE
    USING (bucket_id = 'blog-images');
  END IF;

  -- project-images bucket policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public upload to project-images' AND tablename = 'objects') THEN
    CREATE POLICY "Allow public upload to project-images"
    ON storage.objects
    FOR INSERT
    WITH CHECK (bucket_id = 'project-images');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public update to project-images' AND tablename = 'objects') THEN
    CREATE POLICY "Allow public update to project-images"
    ON storage.objects
    FOR UPDATE
    USING (bucket_id = 'project-images');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public delete from project-images' AND tablename = 'objects') THEN
    CREATE POLICY "Allow public delete from project-images"
    ON storage.objects
    FOR DELETE
    USING (bucket_id = 'project-images');
  END IF;

  -- apartment-images bucket policies
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public upload to apartment-images' AND tablename = 'objects') THEN
    CREATE POLICY "Allow public upload to apartment-images"
    ON storage.objects
    FOR INSERT
    WITH CHECK (bucket_id = 'apartment-images');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public update to apartment-images' AND tablename = 'objects') THEN
    CREATE POLICY "Allow public update to apartment-images"
    ON storage.objects
    FOR UPDATE
    USING (bucket_id = 'apartment-images');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public delete from apartment-images' AND tablename = 'objects') THEN
    CREATE POLICY "Allow public delete from apartment-images"
    ON storage.objects
    FOR DELETE
    USING (bucket_id = 'apartment-images');
  END IF;
END $$;