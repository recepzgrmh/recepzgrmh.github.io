ALTER TABLE content_bundles ADD COLUMN slug TEXT;
ALTER TABLE content_bundles ADD COLUMN description TEXT NOT NULL DEFAULT '';
ALTER TABLE content_bundles ADD COLUMN blog_markdown TEXT NOT NULL DEFAULT '';
ALTER TABLE content_bundles ADD COLUMN linkedin_post TEXT NOT NULL DEFAULT '';
ALTER TABLE content_bundles ADD COLUMN visual_prompt TEXT NOT NULL DEFAULT '';
ALTER TABLE content_bundles ADD COLUMN hero_alt TEXT NOT NULL DEFAULT '';
ALTER TABLE content_bundles ADD COLUMN tags_json TEXT NOT NULL DEFAULT '[]';
ALTER TABLE content_bundles ADD COLUMN sources_json TEXT NOT NULL DEFAULT '[]';
ALTER TABLE content_bundles ADD COLUMN generation_note TEXT NOT NULL DEFAULT '';
ALTER TABLE content_bundles ADD COLUMN published_url TEXT;
ALTER TABLE content_bundles ADD COLUMN created_at TEXT;

UPDATE content_bundles
SET slug = TRIM(REPLACE(blog_path, '/blog/', ''), '/'),
    created_at = updated_at
WHERE slug IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_content_bundles_slug ON content_bundles(slug);
CREATE INDEX IF NOT EXISTS idx_content_bundles_status_updated ON content_bundles(status, updated_at DESC);
