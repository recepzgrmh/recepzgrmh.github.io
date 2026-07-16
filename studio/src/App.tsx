import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Status = "draft" | "review" | "approved" | "scheduled" | "published";
type View = "today" | "queue" | "assets" | "history" | "settings";
type Asset = { id: string; bundleId: string; filename: string; contentType: string; sizeBytes: number; createdAt: string; url: string; bundleTitle?: string };
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
  slug?: string;
  description?: string;
  blogMarkdown?: string;
  linkedinPost?: string;
  visualPrompt?: string;
  heroAlt?: string;
  tags?: string[];
  sources?: { label: string; url: string; note: string }[];
  generationNote?: string;
  publishedUrl?: string;
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

function MarkdownPreview({ value }: { value: string }) {
  return <div className="markdown-preview">{value.split("\n").map((line, index) => {
    if (line.startsWith("## ")) return <h2 key={index}>{line.slice(3)}</h2>;
    if (line.startsWith("### ")) return <h3 key={index}>{line.slice(4)}</h3>;
    if (line.startsWith("- ")) return <li key={index}>{line.slice(2)}</li>;
    if (/^\d+\. /.test(line)) return <li key={index}>{line.replace(/^\d+\. /, "")}</li>;
    if (!line.trim()) return <br key={index}/>;
    return <p key={index}>{line.replace(/\*\*/g, "")}</p>;
  })}</div>;
}

export default function App() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [upload, setUpload] = useState<{ name: string; url: string } | null>(null);
  const [topic, setTopic] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [readiness, setReadiness] = useState({ generation: false, publishing: false });
  const [editor, setEditor] = useState<Bundle | null>(null);
  const [view, setView] = useState<View>("today");
  const [previewMode, setPreviewMode] = useState<"edit" | "preview">("preview");
  const [assets, setAssets] = useState<Asset[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/bundles");
      if (!response.ok) throw new Error("Paketler alınamadı");
      const data = await response.json() as { bundles: Bundle[]; generationReady?: boolean; publishingReady?: boolean };
      setBundles(data.bundles);
      setReadiness({ generation: Boolean(data.generationReady), publishing: Boolean(data.publishingReady) });
      setSelectedId((current) => current || data.bundles[0]?.id || "");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Beklenmeyen hata");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);
  const selected = useMemo(() => bundles.find((bundle) => bundle.id === selectedId) ?? bundles[0], [bundles, selectedId]);
  useEffect(() => { setEditor(selected ? { ...selected } : null); setUpload(null); }, [selected]);
  useEffect(() => {
    if (view !== "assets") return;
    void fetch("/api/assets").then((response) => response.json()).then((data: { assets?: Asset[] }) => setAssets(data.assets || [])).catch(() => setNotice("Görsel arşivi alınamadı."));
  }, [view]);
  const reviewCount = bundles.filter((bundle) => bundle.status === "review").length;
  const visibleBundles = view === "history" ? bundles.filter((bundle) => bundle.status === "published" || bundle.status === "scheduled") : view === "queue" ? bundles.filter((bundle) => bundle.status !== "published") : bundles;
  useEffect(() => {
    if (view === "assets" || view === "settings") return;
    const allowed = view === "history" ? bundles.filter((bundle) => bundle.status === "published" || bundle.status === "scheduled") : view === "queue" ? bundles.filter((bundle) => bundle.status !== "published") : bundles;
    if (!allowed.some((bundle) => bundle.id === selectedId)) setSelectedId(allowed[0]?.id || "");
  }, [view, bundles, selectedId]);
  const canApprove = Boolean(selected?.visualUrl && editor?.blogMarkdown?.trim() && editor?.linkedinPost?.trim() && (editor?.sources?.length || 0) >= 2 && selected.checksPassed >= selected.checksTotal);
  const viewCopy: Record<View, { eyebrow: string; title: string; description: string }> = {
    today: { eyebrow: "BUGÜNÜN ÇALIŞMA ALANI", title: "Günaydın Recep.", description: "Otomasyon konuları araştırır; yayın kararı sende kalır." },
    queue: { eyebrow: "ONAY MERKEZİ", title: "İçerik kuyruğu", description: "Blog ve LinkedIn paketlerini yayınlamadan önce incele." },
    assets: { eyebrow: "R2 MEDYA KÜTÜPHANESİ", title: "Görsel arşivi", description: "İçerik paketlerine yüklediğin tüm görseller." },
    history: { eyebrow: "YAYIN KAYITLARI", title: "Yayın geçmişi", description: "GitHub'a gönderilen ve canlılığı doğrulanan yazılar." },
    settings: { eyebrow: "OTOMASYON AYARLARI", title: "Sistem nasıl çalışıyor?", description: "Konu keşfi otomatik, yayınlama daima onaylı." },
  };

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

  async function generate() {
    setBusy(true); setNotice("");
    try {
      const response = await fetch("/api/bundles/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ topic }) });
      const result = await response.json() as { bundle?: Bundle; error?: string };
      if (!response.ok || !result.bundle) throw new Error(result.error || "Paket üretilemedi");
      setBundles((items) => [result.bundle!, ...items]); setSelectedId(result.bundle.id); setTopic(""); setShowCreate(false);
      setNotice("Kaynaklı blog + LinkedIn paketi üretildi. Yayından önce kontrol et.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Beklenmeyen hata"); }
    finally { setBusy(false); }
  }

  async function saveDraft() {
    if (!editor) return; setBusy(true); setNotice("");
    try {
      const response = await fetch(`/api/bundles/${editor.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: editor.title, description: editor.description, hook: editor.hook, blogMarkdown: editor.blogMarkdown, linkedinPost: editor.linkedinPost, visualPrompt: editor.visualPrompt, heroAlt: editor.heroAlt, category: editor.category, generationNote: editor.generationNote, tags: editor.tags, sources: editor.sources }) });
      const result = await response.json() as { bundle?: Bundle; error?: string }; if (!response.ok || !result.bundle) throw new Error(result.error || "Taslak kaydedilemedi");
      setBundles((items) => items.map((item) => item.id === result.bundle!.id ? result.bundle! : item)); setNotice("Düzenlemeler kaydedildi.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Beklenmeyen hata"); } finally { setBusy(false); }
  }

  async function publishOrVerify() {
    if (!selected) return; setBusy(true); setNotice("");
    const action = selected.status === "scheduled" ? "verify" : "publish";
    try {
      const response = await fetch(`/api/bundles/${selected.id}/${action}`, { method: "POST" }); const result = await response.json() as { status?: Status; url?: string; pending?: boolean; error?: string };
      if (!response.ok && response.status !== 202) throw new Error(result.error || "Yayın işlemi başarısız");
      if (result.pending) { setNotice("GitHub Pages henüz deploy ediyor. Biraz sonra tekrar doğrula."); return; }
      const status = result.status || "scheduled"; setBundles((items) => items.map((item) => item.id === selected.id ? { ...item, status, publishedUrl: result.url || item.publishedUrl } : item));
      setNotice(status === "published" ? "Blog canlı. LinkedIn metni aşağıdan kopyalanabilir." : "Blog GitHub'a gönderildi. Deploy tamamlanınca canlılığı doğrula.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Beklenmeyen hata"); } finally { setBusy(false); }
  }

  async function copyLinkedIn() {
    if (!editor?.linkedinPost) return; await navigator.clipboard.writeText(editor.linkedinPost); setNotice("LinkedIn metni panoya kopyalandı.");
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
      setBundles((items) => items.map((item) => item.id === selected.id ? { ...item, visualUrl: result.url, checksPassed: item.checksTotal } : item));
      setNotice("Görsel pakete eklendi.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Beklenmeyen hata"); }
    finally { setBusy(false); }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="İçerik Stüdyosu ana sayfa"><span>RÖ</span><div>İçerik<br/>Stüdyosu</div></a>
        <nav className="nav" aria-label="Ana navigasyon">
          <button className={view === "today" ? "active" : ""} onClick={() => setView("today")}><Icon name="spark"/><span>Bugün</span></button>
          <button className={view === "queue" ? "active" : ""} onClick={() => setView("queue")}><Icon name="queue"/><span>İçerik kuyruğu</span><b>{reviewCount}</b></button>
          <button className={view === "assets" ? "active" : ""} onClick={() => setView("assets")}><Icon name="image"/><span>Görsel arşivi</span></button>
          <button className={view === "history" ? "active" : ""} onClick={() => setView("history")}><Icon name="check"/><span>Yayın geçmişi</span></button>
        </nav>
        <div className="sidebar-bottom">
          <a href="https://recepozgur.com/blog/" target="_blank" rel="noreferrer"><Icon name="external"/><span>Canlı blog</span></a>
          <button className={view === "settings" ? "active" : ""} onClick={() => setView("settings")}><Icon name="settings"/><span>Ayarlar</span></button>
          <div className="profile"><span>RÖ</span><div><strong>Recep Özgür</strong><small>Cloudflare Access</small></div></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar"><div><p>{viewCopy[view].eyebrow} · {new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date()).toLocaleUpperCase("tr-TR")}</p><h1>{viewCopy[view].title}</h1><small className="view-description">{viewCopy[view].description}</small></div><span className="private-badge">● Yalnızca sana açık</span></header>
        {notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice("")}>×</button></div>}
        {(!readiness.generation || !readiness.publishing) && <div className="setup-banner"><strong>Kurulum durumu</strong><span>İçerik motoru: {readiness.generation ? "hazır" : "OpenAI anahtarı bekliyor"}</span><span>Blog yayını: {readiness.publishing ? "hazır" : "GitHub anahtarı bekliyor"}</span></div>}

        {(view === "today" || view === "queue") && <section className="stats" aria-label="İçerik özeti">
          <article><span>İNCELEME BEKLİYOR</span><strong>{loading ? "–" : reviewCount}</strong><small>Yayın yetkisi hâlâ sende</small></article>
          <article><span>BU AY YAYINLANAN</span><strong>{bundles.filter((b) => b.status === "published").length}</strong><small>Blog + LinkedIn paketi</small></article>
          <article className="accent"><span>OTOMATİK ÜRETİM</span><strong>Pzt · Çrş · Cum</strong><small>10:00 İstanbul · konu girmek zorunda değilsin</small></article>
        </section>}

        {(view === "today" || view === "queue" || view === "history") && <div className="workspace-grid">
          <section className="queue-panel">
            <div className="section-head"><div><span className="eyebrow">{view === "history" ? "YAYIN GEÇMİŞİ" : "İÇERİK KUYRUĞU"}</span><h2>{view === "history" ? "Yayınlanan paketler" : "Karar bekleyen paketler"}</h2></div>{view !== "history" && <button className="icon-button" aria-label="İsteğe bağlı yeni paket" onClick={() => setShowCreate((value) => !value)}>+</button>}</div>
            {showCreate && view !== "history" && <div className="create-box"><label htmlFor="topic">OPSİYONEL KONU / BRIEF</label><textarea id="topic" value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="Boş bırakabilirsin: sistem güncel kaynaklardan sana uygun bir konu seçer. İstersen burada belirli bir yön de verebilirsin."/><small>Konu bulmak senin işin değil. Bu alan yalnızca belirli bir şey yazmak istediğinde var.</small><div><button onClick={() => setShowCreate(false)}>Vazgeç</button><button className="primary" disabled={busy || !readiness.generation} onClick={() => void generate()}>{busy ? "Araştırılıyor…" : topic.trim() ? "Bu konudan paket üret" : "Konuyu bul ve paket üret"}</button></div></div>}
            <div className="bundle-list">
              {loading && <div className="empty">Paketler hazırlanıyor…</div>}
              {!loading && visibleBundles.length === 0 && <div className="empty">{view === "history" ? "Henüz yayın kaydı yok." : "Kuyruk şu an boş. Otomasyon sıradaki çalışma saatinde yeni paket ekleyecek."}</div>}
              {visibleBundles.map((bundle) => (
                <button key={bundle.id} className={`bundle-row ${selected?.id === bundle.id ? "selected" : ""}`} onClick={() => setSelectedId(bundle.id)}>
                  <span className={`status-dot ${bundle.status}`}></span>
                  <div><small>{bundle.category}</small><strong>{bundle.title}</strong><p>{bundle.hook}</p></div>
                  <span className="row-meta"><b>{bundle.sourceCount} kaynak</b>{labels[bundle.status]}</span>
                </button>
              ))}
            </div>
          </section>

          <aside className="review-panel">
            {selected && editor ? <>
              <div className="review-head"><span className="eyebrow">PAKET ÖNİZLEMESİ</span><span className={`pill ${selected.status}`}>{labels[selected.status]}</span></div>
              <div className="preview-toggle"><button className={previewMode === "preview" ? "active" : ""} onClick={() => setPreviewMode("preview")}>Okuyucu önizlemesi</button><button className={previewMode === "edit" ? "active" : ""} onClick={() => setPreviewMode("edit")}>Düzenle</button></div>
              {previewMode === "edit" ? <>
                <input className="title-input" value={editor.title} onChange={(event) => setEditor({ ...editor, title: event.target.value })}/>
                <label className="field-label">LINKEDIN AÇILIŞI</label><textarea className="short-editor" value={editor.hook} onChange={(event) => setEditor({ ...editor, hook: event.target.value })}/>
              </> : <div className="preview-title"><small>{editor.category} · {editor.sourceCount} kaynak</small><h2>{editor.title}</h2><p>{editor.description}</p></div>}
              <div className="checks"><div><span>Kaynak ve kalite kontrolleri</span><b>{selected.checksPassed}/{selected.checksTotal}</b></div><progress value={selected.checksPassed} max={selected.checksTotal}/><small>Kaynak URL’leri · iddia eşleşmesi · ton · tekrar · metadata</small></div>
              {previewMode === "preview" ? <>
                <section className="content-preview"><div className="preview-label"><span>BLOG ÖNİZLEMESİ</span><small>recepozgur.com{editor.blogPath}</small></div>{(upload?.url || selected.visualUrl) && <img src={upload?.url || selected.visualUrl} alt={editor.heroAlt || "Yazı görseli"}/>}<MarkdownPreview value={editor.blogMarkdown || ""}/></section>
                <section className="linkedin-preview"><div className="linkedin-author"><span>RÖ</span><div><strong>Recep Özgür Mıh</strong><small>Product Engineer · Backend · Mobile</small></div></div><p>{editor.linkedinPost}</p>{(upload?.url || selected.visualUrl) && <img src={upload?.url || selected.visualUrl} alt="LinkedIn paylaşım görseli"/>}<div className="linkedin-actions"><span>Beğen</span><span>Yorum yap</span><span>Yeniden yayınla</span><span>Gönder</span></div><button className="text-button" onClick={() => void copyLinkedIn()}>LinkedIn metnini kopyala</button></section>
              </> : <>
                <details className="editor-section" open><summary>Blog yazısı</summary><textarea value={editor.blogMarkdown || ""} onChange={(event) => setEditor({ ...editor, blogMarkdown: event.target.value })}/></details>
                <details className="editor-section" open><summary>LinkedIn paylaşımı</summary><textarea value={editor.linkedinPost || ""} onChange={(event) => setEditor({ ...editor, linkedinPost: event.target.value })}/><button className="text-button" onClick={() => void copyLinkedIn()}>Metni kopyala</button></details>
              </>}
              <details className="editor-section"><summary>Kaynaklar ({editor.sources?.length || 0})</summary><div className="source-list">{editor.sources?.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer"><strong>{source.label}</strong><span>{source.note}</span></a>) || <small>Kaynak yok.</small>}</div></details>
              <details className="editor-section"><summary>Görsel üretim promptu</summary><textarea className="prompt-editor" value={editor.visualPrompt || ""} onChange={(event) => setEditor({ ...editor, visualPrompt: event.target.value })}/><button className="text-button" onClick={() => { void navigator.clipboard.writeText(editor.visualPrompt || ""); setNotice("Görsel promptu kopyalandı."); }}>Promptu kopyala</button></details>
              <div className="visual-block">
                <div className="visual-title"><span>YAZIYA ÖZEL GÖRSEL</span>{(upload?.url || selected.visualUrl) && <b>Hazır</b>}</div>
                {(upload?.url || selected.visualUrl) ? <div className="image-preview"><img src={upload?.url || selected.visualUrl} alt="Yüklenen içerik görseli"/><button onClick={() => fileInput.current?.click()}>Değiştir</button></div> :
                  <button className="dropzone" onClick={() => fileInput.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); void uploadImage(event.dataTransfer.files[0]); }}>
                    <Icon name="image"/><strong>Görseli buraya bırak</strong><span>PNG, JPG, WebP veya SVG · en fazla 10 MB</span><em>Dosya seç</em>
                  </button>}
                <input ref={fileInput} hidden type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={(event) => void uploadImage(event.target.files?.[0])}/>
              </div>
              <div className="actions">{previewMode === "edit" && <button className="secondary" disabled={busy} onClick={() => void saveDraft()}>Düzenlemeyi kaydet</button>}{selected.status !== "published" && selected.status !== "scheduled" && <button className="primary" disabled={busy || !canApprove} onClick={() => void updateStatus("approved")}><Icon name="check"/>{busy ? "İşleniyor…" : "Paketi onayla"}</button>}</div>
              {(selected.status === "approved" || selected.status === "scheduled") && <button className="publish-button" disabled={busy || !readiness.publishing || (!selected.visualUrl && !upload?.url)} onClick={() => void publishOrVerify()}>{selected.status === "scheduled" ? "Canlılığı doğrula" : "Blogu GitHub'a gönder"}</button>}
              {selected.status === "published" && <a className="preview-link" href={selected.publishedUrl || `https://recepozgur.com${selected.blogPath}`} target="_blank" rel="noreferrer">Canlı blogu aç <Icon name="external"/></a>}
              <p className="safety-note">Sistem taslak üretir; kamuya açık yayın yalnız sen onaylayıp yayın butonuna bastığında başlar. LinkedIn paylaşımı şimdilik kopyala-yapıştır ile sende kalır.</p>
            </> : <div className="empty">İncelemek için bir paket seç.</div>}
          </aside>
        </div>}

        {view === "assets" && <section className="single-panel"><div className="section-head"><div><span className="eyebrow">GÖRSEL ARŞİVİ</span><h2>Yüklenen içerik görselleri</h2></div><span className="count-badge">{assets.length} dosya</span></div>{assets.length ? <div className="asset-grid">{assets.map((asset) => <article className="asset-card" key={asset.id}><a href={asset.url} target="_blank" rel="noreferrer"><img src={asset.url} alt={asset.bundleTitle || asset.filename}/></a><div><strong>{asset.bundleTitle || "İçerik görseli"}</strong><span>{asset.filename}</span><small>{new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium" }).format(new Date(asset.createdAt))} · {(asset.sizeBytes / 1024).toFixed(0)} KB</small></div></article>)}</div> : <div className="empty large">Henüz görsel yüklenmedi. Bir içerik paketini açıp yazıya özel görselini eklediğinde burada görünecek.</div>}</section>}

        {view === "settings" && <section className="settings-grid">
          <article className="settings-card accent-card"><span>OTOMATİK KONU KEŞFİ</span><h2>Açık</h2><p>OpenAI güncel web kaynaklarını tarar, geçmiş başlıklarla tekrar etmeyen ve senin uzmanlık alanlarına uyan konuyu kendi seçer.</p></article>
          <article className="settings-card"><span>ÜRETİM TAKVİMİ</span><h2>Pzt · Çrş · Cum</h2><p>Her çalışma günü saat 10:00'da (İstanbul) bir blog + LinkedIn paketi oluşturulur ve inceleme kuyruğuna alınır.</p></article>
          <article className="settings-card"><span>YAYIN GÜVENLİĞİ</span><h2>İnsan onayı zorunlu</h2><p>Hiçbir içerik kendiliğinden bloga veya LinkedIn'e gitmez. Önizler, düzenler, onaylar ve blog yayınını sen başlatırsın.</p></article>
          <article className="settings-card"><span>İÇERİK MOTORU</span><h2>GPT-5.6 Luna</h2><p>Kaynaklı araştırma, blog yazısı, LinkedIn uyarlaması, SEO metadata ve görsel promptu tek paket olarak üretilir.</p></article>
          <article className="settings-card wide"><span>KONU ÇERÇEVESİ</span><h2>Gösteriş değil, kanıtlanabilir teknik düşünce</h2><p>Backend ve sistem tasarımı, AI ile ürün geliştirme, mobil mimari, ürün mühendisliği, otomasyon ve growth engineering. Projeler yalnız gerçek bir ders veya trade-off anlatıyorsa örnek olur; kullanıcı sayısı veya başarı şişirilmez.</p></article>
        </section>}
      </main>
    </div>
  );
}
