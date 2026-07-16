ALTER TABLE content_bundles ADD COLUMN article_type TEXT NOT NULL DEFAULT 'technical';
ALTER TABLE content_bundles ADD COLUMN inline_visuals_json TEXT NOT NULL DEFAULT '[]';

ALTER TABLE assets ADD COLUMN role TEXT NOT NULL DEFAULT 'hero';
ALTER TABLE assets ADD COLUMN alt_text TEXT NOT NULL DEFAULT '';
ALTER TABLE assets ADD COLUMN caption TEXT NOT NULL DEFAULT '';

CREATE INDEX IF NOT EXISTS idx_assets_bundle_role_created
ON assets(bundle_id, role, created_at DESC);
