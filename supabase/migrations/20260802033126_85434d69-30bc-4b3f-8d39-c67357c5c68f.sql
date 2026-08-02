DROP POLICY IF EXISTS "Anyone can upload a CV" ON storage.objects;

CREATE POLICY "Anyone can upload a CV"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'career-cvs'
  AND lower(storage.extension(name)) IN ('pdf', 'doc', 'docx')
  AND COALESCE((metadata->>'size')::bigint, 0) <= 5242880
  AND COALESCE(metadata->>'mimetype', 'application/pdf') IN (
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )
);