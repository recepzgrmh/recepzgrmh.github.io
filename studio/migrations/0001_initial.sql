CREATE TABLE IF NOT EXISTS content_bundles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  hook TEXT NOT NULL,
  blog_path TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','review','approved','scheduled','published')),
  category TEXT NOT NULL,
  source_count INTEGER NOT NULL DEFAULT 0,
  checks_passed INTEGER NOT NULL DEFAULT 0,
  checks_total INTEGER NOT NULL DEFAULT 5,
  visual_url TEXT,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS assets (
  id TEXT PRIMARY KEY,
  bundle_id TEXT NOT NULL,
  object_key TEXT NOT NULL UNIQUE,
  filename TEXT NOT NULL,
  content_type TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY(bundle_id) REFERENCES content_bundles(id)
);

CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bundle_id TEXT NOT NULL,
  action TEXT NOT NULL,
  actor_email TEXT NOT NULL,
  created_at TEXT NOT NULL
);

INSERT OR IGNORE INTO content_bundles VALUES
('architecture-001','Her mobil uygulamanın mikroservise ihtiyacı yok','Servis sayısı, teknik olgunluğun ölçüsü değildir.','/blog/her-mobil-uygulamanin-mikroservise-ihtiyaci-yok/','review','Yazılım Mimarisi',3,5,5,NULL,'2026-07-16T08:30:00.000Z'),
('api-001','API hataları kullanıcı deneyiminin bir parçasıdır','“Bir hata oluştu” bir sonraki adım değildir.','/blog/api-hatalari-kullanici-deneyiminin-parcasidir/','review','API Tasarımı',2,5,5,NULL,'2026-07-16T08:10:00.000Z'),
('ai-001','Geçerli JSON, güvenilir AI çıktısı değildir','JSON’ın parse edilmesi, doğrulamanın bittiği değil başladığı andır.','/blog/gecerli-json-guvenilir-ai-ciktisi-degildir/','review','AI Ürünleri',3,4,5,NULL,'2026-07-16T07:45:00.000Z');
