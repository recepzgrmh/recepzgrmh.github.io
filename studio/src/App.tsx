import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Status = "draft" | "review" | "approved" | "scheduled" | "published";
type Bundle = {
  id: string;
  title: string;
  hook: string;
  blogPath: string;
  status: Status;
  category: string;
  updatedAt: string;
  sourceCount: number;
  checksPassed: number;
  checksTotal: number;
  visualUrl?: string;
};

const labels: Record<Status, string> = { draft: "Taslak", review: "İncelemede", approved: "Onaylandı", scheduled: "Planlandı", published: "Yayında" };

function Icon({ name }: { name: "spark" | "queue" | "image" | "check" | "settings" | "external" }) {
  const paths = {
    spark: <path d="m12 2 1.5 5.2L19 9l-5.5 1.8L12 16l-1.5-5.2L5 9l5.5-1.8L12 2Zm-6 12 .8 2.7L10 18l-3.2 1.3L6 22l-.8-2.7L2 18l3.2-1.3L6 14Z" />,
    queue: <><rect x="4" y="5" width="16" height="14" rx="3"/><path d="M8 9h8M8 13h5"/></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="8.5" cy="9" r="1.5"/><path d="m5 17 4-4 3 3 2-2 5 3"/></>,
    check: <path d="m5 12 4 4L19 6" />,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
    external: <><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function App() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [upload, setUpload] = useState<{ name: string; url: string } | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/bundles");
      if (!response.ok) throw new Error("Paketler alınamadı");
      const data = await response.json() as { bundles: Bundle[] };
      setBundles(data.bundles);
      setSelectedId((current) => current || data.bundles[0]?.id || "");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Beklenmeyen hata");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);
  const selected = useMemo(() => bundles.find((bundle) => bundle.id === selectedId) ?? bundles[0], [bundles, selectedId]);
  const reviewCount = bundles.filter((bundle) => bundle.status === "review").length;

  async function updateStatus(status: Status) {
    if (!selected) return;
    setBusy(true);
    setNotice("");
    try {
      const response = await fetch(`/api/bundles/${selected.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
      if (!response.ok) throw new Error("Durum güncellenemedi");
      setBundles((items) => items.map((item) => item.id === selected.id ? { ...item, status } : item));
      setNotice(status === "approved" ? "Paket onaylandı. Henüz yayınlanmadı." : "Paket güncellendi.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Beklenmeyen hata"); }
    finally { setBusy(false); }
  }

  async function uploadImage(file?: File) {
    if (!file || !selected) return;
    setBusy(true);
    setNotice("");
    const body = new FormData();
    body.append("file", file);
    body.append("bundleId", selected.id);
    try {
      const response = await fetch("/api/assets", { method: "POST", body });
      const result = await response.json() as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error || "Görsel yüklenemedi");
      setUpload({ name: file.name, url: result.url });
      setBundles((items) => items.map((item) => item.id === selected.id ? { ...item, visualUrl: result.url } : item));
      setNotice("Görsel pakete eklendi.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Beklenmeyen hata"); }
    finally { setBusy(false); }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="İçerik Stüdyosu ana sayfa"><span>RÖ</span><div>İçerik<br/>Stüdyosu</div></a>
        <nav className="nav" aria-label="Ana navigasyon">
          <button className="active"><Icon name="spark"/><span>Bugün</span></button>
          <button><Icon name="queue"/><span>İçerik kuyruğu</span><b>{reviewCount}</b></button>
          <button><Icon name="image"/><span>Görsel arşivi</span></button>
          <button><Icon name="check"/><span>Yayın geçmişi</span></button>
        </nav>
        <div className="sidebar-bottom">
          <a href="https://recepozgur.com/blog/" target="_blank" rel="noreferrer"><Icon name="external"/><span>Canlı blog</span></a>
          <button><Icon name="settings"/><span>Ayarlar</span></button>
          <div className="profile"><span>RÖ</span><div><strong>Recep Özgür</strong><small>Cloudflare Access</small></div></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar"><div><p>16 TEMMUZ 2026 · PERŞEMBE</p><h1>Günaydın Recep.</h1></div><span className="private-badge">● Yalnızca sana açık</span></header>
        {notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice("")}>×</button></div>}

        <section className="stats" aria-label="İçerik özeti">
          <article><span>İNCELEME BEKLİYOR</span><strong>{loading ? "–" : reviewCount}</strong><small>Yayın yetkisi hâlâ sende</small></article>
          <article><span>BU AY YAYINLANAN</span><strong>{bundles.filter((b) => b.status === "published").length}</strong><small>Blog + LinkedIn paketi</small></article>
          <article className="accent"><span>SONRAKİ PLAN</span><strong>—</strong><small>Onaydan önce takvim yok</small></article>
        </section>

        <div className="workspace-grid">
          <section className="queue-panel">
            <div className="section-head"><div><span className="eyebrow">İÇERİK KUYRUĞU</span><h2>Karar bekleyen paketler</h2></div><button className="icon-button" aria-label="Yeni paket">+</button></div>
            <div className="bundle-list">
              {loading && <div className="empty">Paketler hazırlanıyor…</div>}
              {bundles.map((bundle) => (
                <button key={bundle.id} className={`bundle-row ${selected?.id === bundle.id ? "selected" : ""}`} onClick={() => setSelectedId(bundle.id)}>
                  <span className={`status-dot ${bundle.status}`}></span>
                  <div><small>{bundle.category}</small><strong>{bundle.title}</strong><p>{bundle.hook}</p></div>
                  <span className="row-meta"><b>{bundle.sourceCount} kaynak</b>{labels[bundle.status]}</span>
                </button>
              ))}
            </div>
          </section>

          <aside className="review-panel">
            {selected ? <>
              <div className="review-head"><span className="eyebrow">PAKET ÖNİZLEMESİ</span><span className={`pill ${selected.status}`}>{labels[selected.status]}</span></div>
              <h2>{selected.title}</h2>
              <div className="hook-card"><span>LINKEDIN AÇILIŞI</span><p>{selected.hook}</p></div>
              <div className="checks"><div><span>Kaynak ve kalite kontrolleri</span><b>{selected.checksPassed}/{selected.checksTotal}</b></div><progress value={selected.checksPassed} max={selected.checksTotal}/><small>Kaynak URL’leri · iddia eşleşmesi · ton · tekrar · metadata</small></div>
              <div className="visual-block">
                <div className="visual-title"><span>YAZIYA ÖZEL GÖRSEL</span>{(upload?.url || selected.visualUrl) && <b>Hazır</b>}</div>
                {(upload?.url || selected.visualUrl) ? <div className="image-preview"><img src={upload?.url || selected.visualUrl} alt="Yüklenen içerik görseli"/><button onClick={() => fileInput.current?.click()}>Değiştir</button></div> :
                  <button className="dropzone" onClick={() => fileInput.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); void uploadImage(event.dataTransfer.files[0]); }}>
                    <Icon name="image"/><strong>Görseli buraya bırak</strong><span>PNG, JPG, WebP veya SVG · en fazla 10 MB</span><em>Dosya seç</em>
                  </button>}
                <input ref={fileInput} hidden type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={(event) => void uploadImage(event.target.files?.[0])}/>
              </div>
              <a className="preview-link" href={`https://recepozgur.com${selected.blogPath}`} target="_blank" rel="noreferrer">Blog önizlemesini aç <Icon name="external"/></a>
              <div className="actions"><button className="secondary" disabled={busy} onClick={() => void updateStatus("draft")}>Düzeltmeye gönder</button><button className="primary" disabled={busy || selected.checksPassed < selected.checksTotal} onClick={() => void updateStatus("approved")}><Icon name="check"/>{busy ? "İşleniyor…" : "Paketi onayla"}</button></div>
              <p className="safety-note">Onay içerik paketini kilitler; otomatik yayın yapmaz. Yayınlama ayrı bir adım olarak kalır.</p>
            </> : <div className="empty">İncelemek için bir paket seç.</div>}
          </aside>
        </div>
      </main>
    </div>
  );
}
