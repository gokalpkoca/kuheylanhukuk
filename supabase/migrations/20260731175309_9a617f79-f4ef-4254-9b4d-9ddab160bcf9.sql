ALTER TABLE public.career_applications ADD COLUMN IF NOT EXISTS cv_url TEXT;

CREATE POLICY "Anyone can upload a CV" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'career-cvs');