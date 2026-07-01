/* ----------------------------------------------------------------------------
   Auto-detect project screenshots dropped into src/assets/work/.
   Name a file <basename>.webp|png|jpg and it shows up automatically; until then
   the Mockup component renders a clean placeholder. No layout shift either way.
---------------------------------------------------------------------------- */
const modules = import.meta.glob<{ default: { src: string; width: number; height: number } }>(
  "../assets/work/*.{webp,png,jpg,jpeg,avif}",
  { eager: true },
);

const byName: Record<string, { src: string; width: number; height: number }> = {};
for (const path in modules) {
  const base = path.split("/").pop()!.replace(/\.(webp|png|jpe?g|avif)$/i, "");
  byName[base] = modules[path].default;
}

export function workImage(name: string) {
  return byName[name] ?? null;
}

export function hasWorkImage(name: string): boolean {
  return name in byName;
}
