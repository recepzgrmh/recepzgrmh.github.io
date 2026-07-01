# Mascot assets — "çizgi Recep"

Şu an site **placeholder bir SVG karakterle** çalışıyor (poza göre ifade değiştiren).
Sen gerçek pozları üretince buraya atacağız, kod aynı kalacak.

## 1. Üretilecek pozlar

Her birini `public/mascot/<isim>.webp` olarak kaydet. **Şeffaf arka plan**, dikey ~3:4
oran (örn. 512×600), tutarlı karakter.

| Dosya | Ne zaman görünür |
|---|---|
| `idle.webp` | normal/sakin duruş (en çok bu görünür) |
| `wave.webp` | giriş selamı, contact tıklama |
| `point.webp` | bir projeyi/butonu işaret ederken |
| `talk.webp` | yorum yaparken (ağız açık, hafif jest) |
| `think.webp` | düşünme ("…") |
| `surprised.webp` | şaşırma |
| `panic.webp` | sürüklenirken paniği |
| `dizzy.webp` | fırlatılıp çarpınca sersem |
| `serious.webp` | CV / "ciddi mod" (kollar bağlı) |

İstersen ekstra (şart değil): `coffee` (contact), `glasses` (blog), `laptop` (work).

## 2. Tutarlılık için prompt iskeleti

Hepsini **aynı tarifle** üret, sadece son satırı (pozu) değiştir:

> Flat vector illustration of a young man, short dark hair, friendly confident
> face, minimal clean line art, slightly hand-drawn feel (small asymmetries, not
> sterile), limited palette: charcoal body with a single warm amber (#F59E0B)
> accent, transparent background, full body, consistent character design across
> all images. **Pose: `<idle / waving / pointing / …>`**

İpucu: önce `idle`'ı üret, beğendiğini referans/seed olarak ver, diğer pozları ondan
türet. Böylece yüz/tarz sabit kalır.

## 3. Devreye alma (tek satır)

Pozları `public/mascot/`'a attıktan sonra:

`src/components/mascot/MascotVisual.tsx` içinde:

```ts
export const USE_IMAGE_ASSETS = true; // false -> true
```

Hepsi bu. Maskot artık SVG yerine senin görsellerini kullanır.

## 3.5 Proje ekran görüntüleri (önizleme alanları)

Şu an her projede **placeholder** ("App preview / Web preview, görsel gelecek") var.
Gerçek görseli `src/assets/work/` içine şu adlarla at, **otomatik görünür** (placeholder
kendiliğinden kalkar, layout kaymaz):

| Dosya | Nerede |
|---|---|
| `sano-1`, `sano-2`, `sano-3` | Sano AI — telefon mockup (3 ekran) |
| `revna-1`, `revna-2` | Revna — telefon mockup (2 ekran) |
| `chat-1` | chat.sanoapp.ai — browser mockup |

Uzantı `.webp / .png / .jpg` olabilir (örn. `sano-1.webp`). Telefon görselleri **dikey
~9:19**, browser görseli **~16:10** oranında olursa frame'e tam oturur. Daha fazla ekran
eklemek istersen `src/i18n/content.ts` içindeki ilgili projenin `preview.images` dizisine
isim ekle, dosyayı at, biter.

## 4. Replikleri düzenleme

Maskotun ne dediği tamamen senin elinde:
`src/components/mascot/mascotLines.ts` — TR/EN ayrı havuzlar, hover/click/drag/throw.
İstediğin gibi değiştir, kafana göre "kanka" tonunu ayarla.
