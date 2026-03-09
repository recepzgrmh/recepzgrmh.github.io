document.addEventListener("DOMContentLoaded", () => {
    window.pageCache = window.pageCache || {};

    // Prefetch HTML on hover to make navigation instantaneous
    document.body.addEventListener("mouseover", e => {
        const link = e.target.closest("a");
        if (!link) return;
        const href = link.getAttribute("href");
        if (href && !href.startsWith("#") && !href.startsWith("http") && !href.startsWith("mailto") && link.target !== "_blank") {
            if (!window.pageCache[href]) {
                window.pageCache[href] = fetch(href).then(res => res.ok ? res.text() : null).catch(() => null);
            }
        }
    });

    // Intercept clicks on links
    document.body.addEventListener("click", e => {
        const link = e.target.closest("a");
        if (!link) return;

        const href = link.getAttribute("href");

        // Skip external links, mailto, etc.
        if (!href || href.startsWith("http") || href.startsWith("mailto") || link.target === "_blank") {
            return;
        }

        // If it's a pure hash link
        if (href.startsWith("#")) {
            return;
        }

        const targetUrl = new URL(href, window.location.origin);
        const currentPath = window.location.pathname;
        const normalizedTargetPath = targetUrl.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '/');
        const normalizedCurrentPath = currentPath.replace(/\/index\.html$/, '/').replace(/\.html$/, '/');
        const isSamePage = normalizedCurrentPath === normalizedTargetPath;

        // If it's the same page and has a hash, let browser handle normal scroll jump
        if (isSamePage && targetUrl.hash) {
            return;
        }

        // If same page without hash, just ignore
        if (isSamePage && !targetUrl.hash) {
            e.preventDefault();
            return;
        }

        e.preventDefault();
        navigateTo(href);
    });

    window.addEventListener("popstate", () => {
        navigateTo(window.location.pathname, true);
    });
});

async function navigateTo(url, isPopState = false) {
    const targetUrlObj = new URL(url, window.location.origin);
    const targetPath = targetUrlObj.pathname;
    const currentPath = window.location.pathname;

    // Safety check just in case
    const normalizedTargetPath = targetPath.replace(/\/index\.html$/, '/').replace(/\.html$/, '/');
    const normalizedCurrentPath = currentPath.replace(/\/index\.html$/, '/').replace(/\.html$/, '/');

    if (!isPopState && normalizedCurrentPath === normalizedTargetPath && !targetUrlObj.hash) {
        return;
    }

    const contentContainer = document.getElementById("page-content");
    if (!contentContainer) return;

    try {
        // Very fast hardware-accelerated fade out with GSAP
        if (typeof gsap !== "undefined") {
            await gsap.to(contentContainer, { opacity: 0, y: 15, duration: 0.15, ease: "power1.inOut" });
        } else {
            contentContainer.style.opacity = '0';
            await new Promise(r => setTimeout(r, 150));
        }

        let html = null;
        if (window.pageCache && window.pageCache[url]) {
            html = await window.pageCache[url];
        } else {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Page not found");
            html = await response.text();
            if (window.pageCache) window.pageCache[url] = Promise.resolve(html);
        }

        if (!html) throw new Error("Could not load html");

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const newContent = doc.getElementById("page-content");
        if (!newContent) throw new Error("No page-content found in target");

        document.title = doc.title;
        contentContainer.innerHTML = newContent.innerHTML;

        if (targetUrlObj.hash) {
            const targetEl = document.getElementById(targetUrlObj.hash.substring(1));
            if (targetEl) {
                targetEl.scrollIntoView();
            } else {
                window.scrollTo(0, 0);
            }
        } else {
            window.scrollTo(0, 0);
        }

        if (!isPopState) {
            history.pushState(null, doc.title, url);
        }

        updateNavLinks(url);

        if (typeof window.reinitDynamicContent === "function") {
            window.reinitDynamicContent();
        }

        if (typeof window.reapplyLanguage === "function") {
            window.reapplyLanguage();
        }

        if (url.includes("contact.html") || url.includes("/contact/")) {
            if (typeof window.initContactBg === "function") window.initContactBg();
            if (typeof window.initContactForm === "function") window.initContactForm();
        } else {
            if (typeof window.destroyContactBg === "function") window.destroyContactBg();
        }

        // Fast fade in
        if (typeof gsap !== "undefined") {
            gsap.fromTo(contentContainer, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
        } else {
            contentContainer.style.opacity = '1';
        }

    } catch (error) {
        console.error("Navigation error:", error);
        window.location.href = url;
    }
}

function updateNavLinks(url) {
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#")) return;

        // Normalize URLs to compare accurately
        const isIndex = url.endsWith("/") || url.endsWith("index.html");
        const linkIsIndex = href === "index.html" || href === "/";

        const isMatch = (isIndex && linkIsIndex) || (!isIndex && !linkIsIndex && url.includes(href));

        if (isMatch) {
            link.classList.add("text-cyan-400");
            link.classList.remove("hover:text-white", "text-white");
        } else {
            link.classList.remove("text-cyan-400");
            link.classList.add("hover:text-white");
            link.classList.remove("text-white");
        }

        const span = link.querySelector("span");
        if (span) {
            if (isMatch) {
                span.classList.remove("text-white");
            }
        }
    });
}
