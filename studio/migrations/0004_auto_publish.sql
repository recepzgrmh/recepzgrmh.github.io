ALTER TABLE content_bundles ADD COLUMN published_at TEXT;

UPDATE content_bundles
SET published_at = substr(updated_at, 1, 10)
WHERE published_at IS NULL AND status IN ('scheduled', 'published');

CREATE INDEX IF NOT EXISTS idx_content_bundles_status_created
ON content_bundles(status, created_at ASC);
