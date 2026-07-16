import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type Status = "draft" | "review" | "approved" | "scheduled" | "published";
type View = "today" | "queue" | "assets" | "history" | "settings";
type AssetRole = "hero" | "inline-1" | "inline-2";
type InlineVisual = { needed: boolean; slot: number; prompt: string; alt: string; caption: string };
type Asset = { id: string; bundleId: string; filename: string; contentType: string; sizeBytes: number; createdAt: string; url: string; role: AssetRole; alt?: string; caption?: string; bundleTitle?: string };
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
  articleType?: string;
  inlineVisuals?: InlineVisual[];
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

function inlineMarkdown(value: string): ReactNode[] {
  return value.split(/(\*\*[^*]+\*\*|(?<!\*)\*[^*]+\*(?!\*)|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^)]+\))/g).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (link) return <a key={index} href={link[2]} target="_blank" rel="noreferrer">{link[1]}</a>;
    return part;
  });
}

function CodePreview({ blocks }: { blocks: { language:string; code:string }[] }) {
  const [active, setActive] = useState(0); const current = blocks[active] || blocks[0];
  const label = (language:string,index:number) => index === 0 ? (language || "Kod") : language === "test" ? "Test" : language === "output" ? "Çıktı" : language;
  return <section className="preview-code-lab"><header><div>{blocks.map((block,index)=><button key={`${block.language}-${index}`} className={active === index ? "active" : ""} onClick={() => setActive(index)}>{label(block.language,index)}</button>)}</div><button onClick={() => void navigator.clipboard.writeText(current.code)}>Kopyala</button></header><pre><code>{current.code}</code></pre></section>;
}

function MarkdownPreview({ value, imageSlots = {}, visuals = [] }: { value: string; imageSlots?: Record<number, string>; visuals?: InlineVisual[] }) {
  const lines = value.split("\n"); const blocks: ReactNode[] = [];
  for (let i = 0; i < lines.length;) {
    const line = lines[i];
    if (!line.trim()) { i += 1; continue; }
    if (line.startsWith("```")) { const codeBlocks: {language:string;code:string}[] = []; while (i < lines.length && lines[i].startsWith("```")) { const language = lines[i].slice(3).trim() || "Kod"; const code: string[] = []; i += 1; while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]); if (i < lines.length) i += 1; codeBlocks.push({language,code:code.join("\n")}); while (i < lines.length && !lines[i].trim()) i += 1; if (!lines[i]?.startsWith("```test") && !lines[i]?.startsWith("```output")) break; } blocks.push(<CodePreview blocks={codeBlocks} key={`code-${i}`}/>); continue; }
    const marker = line.trim().match(/^\{\{INLINE_IMAGE_([12])\}\}$/); if (marker) { const slot = Number(marker[1]); const visual = visuals.find((item) => item.slot === slot); blocks.push(imageSlots[slot] ? <figure className="preview-inline-image" key={i}><img src={imageSlots[slot]} alt={visual?.alt || `Yazı içi görsel ${slot}`}/>{visual?.caption && <figcaption>{visual.caption}</figcaption>}</figure> : <div className="preview-inline-placeholder" key={i}><strong>İç görsel {slot} burada görünecek</strong>{visual?.caption && <span>{visual.caption}</span>}</div>); i += 1; continue; }
    const image = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/); if (image) { blocks.push(<figure className="preview-inline-image" key={i}><img src={image[2]} alt={image[1]}/></figure>); i += 1; continue; }
    if (line.includes("|") && i + 1 < lines.length && /^\s*\|?\s*:?-+/.test(lines[i + 1])) { const rows: string[][] = []; const split = (row:string) => row.replace(/^\s*\||\|\s*$/g, "").split("|").map((cell) => cell.trim()); const head = split(line); i += 2; while (i < lines.length && lines[i].includes("|")) rows.push(split(lines[i++])); blocks.push(<div className="preview-table-wrap" key={`table-${i}`}><table><thead><tr>{head.map((cell,index)=><th key={index}>{inlineMarkdown(cell)}</th>)}</tr></thead><tbody>{rows.map((row,rowIndex)=><tr key={rowIndex}>{row.map((cell,index)=><td key={index}>{inlineMarkdown(cell)}</td>)}</tr>)}</tbody></table></div>); continue; }
    if (line.startsWith("## ")) { blocks.push(<h2 key={i}>{inlineMarkdown(line.slice(3))}</h2>); i += 1; continue; }
    if (line.startsWith("### ")) { blocks.push(<h3 key={i}>{inlineMarkdown(line.slice(4))}</h3>); i += 1; continue; }
    if (line.startsWith("> ")) { blocks.push(<blockquote key={i}>{inlineMarkdown(line.slice(2))}</blockquote>); i += 1; continue; }
    if (/^- /.test(line)) { const items: ReactNode[] = []; while (i < lines.length && /^- /.test(lines[i])) { items.push(<li key={i}>{inlineMarkdown(lines[i].slice(2))}</li>); i += 1; } blocks.push(<ul key={`ul-${i}`}>{items}</ul>); continue; }
    if (/^\d+\. /.test(line)) { const items: ReactNode[] = []; while (i < lines.length && /^\d+\. /.test(lines[i])) { items.push(<li key={i}>{inlineMarkdown(lines[i].replace(/^\d+\. /, ""))}</li>); i += 1; } blocks.push(<ol key={`ol-${i}`}>{items}</ol>); continue; }
    blocks.push(<p key={i}>{inlineMarkdown(line)}</p>); i += 1;
  }
  return <div className="markdown-preview">{blocks}</div>;
}

function LinkedinPreview({ bundle, imageUrl, expanded, onToggle, onCopy }: { bundle: Bundle; imageUrl?: string; expanded: boolean; onToggle: () => void; onCopy: () => void }) {
  const text = bundle.linkedinPost || "LinkedIn metni henüz oluşturulmadı.";
  return <section className="linkedin-stage" aria-label="LinkedIn gönderisi önizlemesi">
    <div className="linkedin-chrome"><span>LinkedIn masaüstü akış önizlemesi</span><button onClick={onCopy}>Metni kopyala</button></div>
    <article className="linkedin-post-card">
      <header className="li-post-head"><img src="https://recepozgur.com/logo.webp" alt="Recep Özgür Mıh"/><div><strong>Recep Özgür Mıh <b>in</b><small>· 1.</small></strong><span>Product Engineer | Backend &amp; Mobile Developer</span><span>Şimdi · 🌐</span></div><button aria-label="Diğer seçenekler">•••</button></header>
      <div className={`li-post-copy ${expanded ? "expanded" : ""}`}><p>{text}</p>{!expanded && text.length > 420 && <button onClick={onToggle}>…devamını gör</button>}</div>
      {imageUrl ? <img className="li-post-image" src={imageUrl} alt={bundle.heroAlt || "LinkedIn gönderi görseli"}/> : <div className="li-image-placeholder"><span>Yazıya özel görsel burada 1.91:1 oranında görünecek</span><small>Önizlemeyi tamamlamak için pakete görsel yükle</small></div>}
      <div className="li-social-proof"><span><i>♥</i><i>💡</i> 0</span><span>0 yorum · 0 yeniden yayınlama</span></div>
      <footer className="li-action-row"><button>♧ <span>Beğen</span></button><button>▢ <span>Yorum yap</span></button><button>↻ <span>Yeniden yayınla</span></button><button>➤ <span>Gönder</span></button></footer>
    </article>
    <p className="preview-disclaimer">Yazı tipi ve boşluklar LinkedIn masaüstü akışına göre simüle edilir. Tepki sayıları yayın sonrasında oluşur.</p>
  </section>;
}

function BlogSitePreview({ bundle, imageUrl, imageSlots = {} }: { bundle: Bundle; imageUrl?: string; imageSlots?: Record<number,string> }) {
  const headings = (bundle.blogMarkdown || "").split("\n").filter((line) => line.startsWith("## ")).map((line) => line.slice(3).replace(/\*\*/g, ""));
  const wordCount = (bundle.blogMarkdown || "").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 190));
  return <section className="blog-site-preview" aria-label="Recepozgur.com blog önizlemesi">
    <nav className="site-nav"><a href="https://recepozgur.com" target="_blank" rel="noreferrer"><img src="https://recepozgur.com/logo.webp" alt="RÖM"/></a><div><span>Projeler</span><span>Yetenekler</span><span>Hakkımda</span><span>Akademik</span><span>Labs</span><b>Blog</b><span>Sohbet</span><em>EN</em><strong>İletişim</strong></div></nav>
    <header className="site-hero"><div><span className="site-back">← TÜM YAZILAR</span><p><b>{bundle.category}</b> · {new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date())} · {minutes} DK OKUMA</p><h1>{bundle.title}</h1><div className="site-description">{bundle.description}</div><div className="site-tags">{bundle.tags?.map((tag) => <span key={tag}>#{tag}</span>)}</div></div>{imageUrl ? <figure><img src={imageUrl} alt={bundle.heroAlt || "Blog kapak görseli"}/></figure> : <figure className="site-image-placeholder"><span>1200 × 630 kapak görseli</span><small>Görsel yüklediğinde gerçek hali burada görünür</small></figure>}</header>
    <div className="site-article-grid"><aside><strong>BU YAZIDA</strong>{headings.map((heading) => <span key={heading}>{heading}</span>)}</aside><main><MarkdownPreview value={bundle.blogMarkdown || ""} imageSlots={imageSlots} visuals={bundle.inlineVisuals}/><section className="site-sources"><small>DOĞRULAMA</small><h2>Kaynaklar</h2><p>Yazıdaki dış iddiaları doğrulamak ve daha derine inmek için kullandığım ana kaynaklar.</p>{bundle.sources?.map((source, index) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer"><b>{String(index + 1).padStart(2, "0")}</b><span><strong>{source.label} ↗</strong><small>{source.note}</small></span></a>)}</section><footer className="site-author"><div><small>YAZAN</small><h3>Recep Özgür Mıh</h3><p>Mobil, backend ve ürün geliştirme kesişiminde çalışan bir yazılım mühendisi.</p></div><span>Hakkımda →</span></footer></main></div>
    <footer className="site-footer"><strong>Recep Özgür Mıh</strong><span>Mobil · Backend · Ürün geliştirme</span></footer>
  </section>;
}

export default function App() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [upload, setUpload] = useState<{ name: string; url: string } | null>(null);
  const [bundleAssets, setBundleAssets] = useState<Asset[]>([]);
  const [topic, setTopic] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [readiness, setReadiness] = useState({ generation: false, publishing: false });
  const [editor, setEditor] = useState<Bundle | null>(null);
  const [view, setView] = useState<View>("today");
  const [previewMode, setPreviewMode] = useState<"edit" | "preview">("preview");
  const [previewSurface, setPreviewSurface] = useState<"linkedin" | "blog">("linkedin");
  const [fullscreenSurface, setFullscreenSurface] = useState<"linkedin" | "blog" | null>(null);
  const [linkedinExpanded, setLinkedinExpanded] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const inlineFileInputs = useRef<Record<number, HTMLInputElement | null>>({});

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
  useEffect(() => {
    setEditor(selected ? { ...selected } : null); setUpload(null); setLinkedinExpanded(false); setBundleAssets([]);
    if (selected?.id) void fetch(`/api/assets?bundleId=${encodeURIComponent(selected.id)}`).then((response) => response.json()).then((data: { assets?: Asset[] }) => setBundleAssets(data.assets || [])).catch(() => setNotice("Paket görselleri alınamadı."));
  }, [selected]);
  useEffect(() => {
    if (!fullscreenSurface) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setFullscreenSurface(null); };
    document.body.classList.add("preview-open"); window.addEventListener("keydown", close);
    return () => { document.body.classList.remove("preview-open"); window.removeEventListener("keydown", close); };
  }, [fullscreenSurface]);
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
  const inlineImageSlots = Object.fromEntries([1, 2].map((slot) => [slot, bundleAssets.find((asset) => asset.role === `inline-${slot}`)?.url]).filter((entry) => entry[1])) as Record<number,string>;
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
      const response = await fetch(`/api/bundles/${editor.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: editor.title, slug: editor.slug, description: editor.description, hook: editor.hook, blogMarkdown: editor.blogMarkdown, linkedinPost: editor.linkedinPost, visualPrompt: editor.visualPrompt, heroAlt: editor.heroAlt, category: editor.category, generationNote: editor.generationNote, articleType: editor.articleType, inlineVisuals: editor.inlineVisuals, tags: editor.tags, sources: editor.sources }) });
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

  async function uploadImage(file?: File, role: AssetRole = "hero", visual?: InlineVisual) {
    if (!file || !selected) return;
    setBusy(true);
    setNotice("");
    const body = new FormData();
    body.append("file", file);
    body.append("bundleId", selected.id);
    body.append("role", role);
    if (visual?.alt) body.append("alt", visual.alt);
    if (visual?.caption) body.append("caption", visual.caption);
    try {
      const response = await fetch("/api/assets", { method: "POST", body });
      const result = await response.json() as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error || "Görsel yüklenemedi");
      const newAsset: Asset = { id: `${role}-${Date.now()}`, bundleId:selected.id, filename:file.name, contentType:file.type, sizeBytes:file.size, createdAt:new Date().toISOString(), url:result.url, role, alt:visual?.alt, caption:visual?.caption };
      setBundleAssets((items) => [newAsset, ...items]);
      if (role === "hero") { setUpload({ name: file.name, url: result.url }); setBundles((items) => items.map((item) => item.id === selected.id ? { ...item, visualUrl: result.url, checksPassed: item.checksTotal } : item)); }
      setNotice(role === "hero" ? "Kapak görseli pakete eklendi." : `İç görsel ${role.slice(-1)} pakete eklendi.`);
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
                <label className="field-label" htmlFor="slug-editor">YAYIN URL'Sİ</label>
                <div className="slug-editor"><span>recepozgur.com/blog/</span><input id="slug-editor" value={editor.slug || ""} disabled={selected.status === "published" || selected.status === "scheduled"} maxLength={60} onChange={(event) => { const slug = event.target.value.toLowerCase().replace(/[çğıöşü]/g, (letter) => ({ ç:"c", ğ:"g", ı:"i", ö:"o", ş:"s", ü:"u" } as Record<string,string>)[letter] || letter).replace(/[^a-z0-9-]+/g, "-").replace(/-+/g, "-").replace(/^-/, ""); setEditor({ ...editor, slug, blogPath: `/blog/${slug}/` }); }}/><b>/</b></div>
                <small className="slug-help">3–5 anahtar kelime · en fazla 60 karakter · yayınlandıktan sonra değişmez <em>{editor.slug?.length || 0}/60</em></small>
                <label className="field-label">LINKEDIN AÇILIŞI</label><textarea className="short-editor" value={editor.hook} onChange={(event) => setEditor({ ...editor, hook: event.target.value })}/>
              </> : <div className="preview-title"><small>{editor.category} · {editor.sourceCount} kaynak</small><h2>{editor.title}</h2><p>{editor.description}</p></div>}
              <div className="checks"><div><span>Kaynak ve kalite kontrolleri</span><b>{selected.checksPassed}/{selected.checksTotal}</b></div><progress value={selected.checksPassed} max={selected.checksTotal}/><small>Kaynak URL’leri · iddia eşleşmesi · ton · tekrar · metadata</small></div>
              {previewMode === "preview" ? <>
                <div className="surface-switch"><div><button className={previewSurface === "linkedin" ? "active" : ""} onClick={() => setPreviewSurface("linkedin")}>LinkedIn'de görünümü</button><button className={previewSurface === "blog" ? "active" : ""} onClick={() => setPreviewSurface("blog")}>Sitede görünümü</button></div><button className="fullscreen-button" onClick={() => setFullscreenSurface(previewSurface)}>Tam ekran ↗</button></div>
                {previewSurface === "linkedin" ? <LinkedinPreview bundle={editor} imageUrl={upload?.url || selected.visualUrl} expanded={linkedinExpanded} onToggle={() => setLinkedinExpanded(true)} onCopy={() => void copyLinkedIn()}/> : <div className="blog-preview-viewport"><BlogSitePreview bundle={editor} imageUrl={upload?.url || selected.visualUrl} imageSlots={inlineImageSlots}/></div>}
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
              {editor.inlineVisuals?.filter((visual) => visual.needed).map((visual) => {
                const role = `inline-${visual.slot}` as AssetRole; const image = bundleAssets.find((asset) => asset.role === role)?.url;
                return <div className="visual-block inline-visual-block" key={role}>
                  <div className="visual-title"><span>YAZI İÇİ GÖRSEL {visual.slot}</span>{image && <b>Hazır</b>}</div>
                  <p className="inline-visual-caption">{visual.caption}</p>
                  <details className="inline-prompt"><summary>Bu bölüme özel görsel promptu</summary><textarea value={visual.prompt} onChange={(event) => setEditor({ ...editor, inlineVisuals: editor.inlineVisuals?.map((item) => item.slot === visual.slot ? { ...item, prompt:event.target.value } : item) })}/><button className="text-button" onClick={() => { void navigator.clipboard.writeText(visual.prompt); setNotice(`İç görsel ${visual.slot} promptu kopyalandı.`); }}>Promptu kopyala</button></details>
                  {image ? <div className="image-preview"><img src={image} alt={visual.alt}/><button onClick={() => inlineFileInputs.current[visual.slot]?.click()}>Değiştir</button></div> : <button className="dropzone compact" onClick={() => inlineFileInputs.current[visual.slot]?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); void uploadImage(event.dataTransfer.files[0], role, visual); }}><Icon name="image"/><strong>İç görseli yükle</strong><span>Yazıda {`{{INLINE_IMAGE_${visual.slot}}}`} konumunda görünür</span><em>Dosya seç</em></button>}
                  <input ref={(node) => { inlineFileInputs.current[visual.slot] = node; }} hidden type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={(event) => void uploadImage(event.target.files?.[0], role, visual)}/>
                </div>;
              })}
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
      {fullscreenSurface && editor && <div className={`preview-modal ${fullscreenSurface}`} role="dialog" aria-modal="true" aria-label={`${fullscreenSurface === "linkedin" ? "LinkedIn" : "Blog"} tam ekran önizleme`}><header><div><strong>{fullscreenSurface === "linkedin" ? "LinkedIn gönderisi" : "recepozgur.com blog yazısı"}</strong><span>Bu yalnızca önizleme; henüz yayınlanmadı.</span></div><button onClick={() => setFullscreenSurface(null)}>Kapat ×</button></header><div className="preview-modal-body">{fullscreenSurface === "linkedin" ? <LinkedinPreview bundle={editor} imageUrl={upload?.url || selected.visualUrl} expanded={linkedinExpanded} onToggle={() => setLinkedinExpanded(true)} onCopy={() => void copyLinkedIn()}/> : <BlogSitePreview bundle={editor} imageUrl={upload?.url || selected.visualUrl} imageSlots={inlineImageSlots}/>}</div></div>}
    </div>
  );
}
