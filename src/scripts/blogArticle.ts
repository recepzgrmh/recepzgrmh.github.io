function languageLabel(code: HTMLElement) {
  const language = [...code.classList].find((name) => name.startsWith("language-"))?.replace("language-", "") || "code";
  const labels: Record<string, string> = { js:"JavaScript", javascript:"JavaScript", ts:"TypeScript", typescript:"TypeScript", json:"JSON", bash:"Terminal", shell:"Terminal", test:"Test", output:"Çıktı", text:"Metin" };
  return labels[language] || language.toUpperCase();
}

async function copyCode(button: HTMLButtonElement, code: HTMLElement) {
  await navigator.clipboard.writeText(code.textContent || "");
  button.textContent = "Kopyalandı";
  window.setTimeout(() => { button.textContent = "Kopyala"; }, 1400);
}

function enhanceArticles() {
  document.querySelectorAll<HTMLElement>(".blog-prose").forEach((article) => {
    const blocks = [...article.querySelectorAll<HTMLPreElement>(":scope > pre")];
    for (const pre of blocks) {
      if (pre.dataset.enhanced || pre.closest(".code-lab")) continue;
      const code = pre.querySelector<HTMLElement>("code");
      if (!code) continue;
      const kind = [...code.classList].find((name) => name.startsWith("language-"))?.replace("language-", "") || "code";
      if (kind === "test" || kind === "output") continue;

      const group = [pre];
      let next = pre.nextElementSibling as HTMLPreElement | null;
      while (next?.tagName === "PRE") {
        const nextCode = next.querySelector<HTMLElement>("code");
        const nextKind = [...(nextCode?.classList || [])].find((name) => name.startsWith("language-"))?.replace("language-", "");
        if (!nextCode || (nextKind !== "test" && nextKind !== "output")) break;
        group.push(next); next = next.nextElementSibling as HTMLPreElement | null;
      }

      const lab = document.createElement("section");
      lab.className = "code-lab";
      lab.setAttribute("aria-label", "Kod örneği");
      const toolbar = document.createElement("div"); toolbar.className = "code-lab-toolbar";
      const tabs = document.createElement("div"); tabs.className = "code-lab-tabs"; tabs.setAttribute("role", "tablist");
      const copy = document.createElement("button"); copy.type = "button"; copy.className = "code-copy"; copy.textContent = "Kopyala";
      toolbar.append(tabs, copy); lab.append(toolbar); pre.before(lab);

      group.forEach((panel, index) => {
        const panelCode = panel.querySelector<HTMLElement>("code")!;
        panel.dataset.enhanced = "true"; panel.classList.add("code-lab-panel");
        panel.hidden = index !== 0; lab.append(panel);
        const tab = document.createElement("button"); tab.type = "button"; tab.setAttribute("role", "tab"); tab.textContent = index === 0 ? languageLabel(panelCode) : languageLabel(panelCode);
        tab.className = index === 0 ? "active" : "";
        tab.addEventListener("click", () => {
          group.forEach((item, itemIndex) => { item.hidden = itemIndex !== index; });
          [...tabs.children].forEach((item, itemIndex) => item.classList.toggle("active", itemIndex === index));
        });
        tabs.append(tab);
      });
      copy.addEventListener("click", () => { const visible = group.find((item) => !item.hidden)?.querySelector<HTMLElement>("code"); if (visible) void copyCode(copy, visible); });
    }
  });
}

document.addEventListener("astro:page-load", enhanceArticles);
enhanceArticles();
