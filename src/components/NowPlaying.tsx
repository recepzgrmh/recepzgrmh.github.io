/* ----------------------------------------------------------------------------
   NowPlaying — the little "what Recep is listening to" card in the footer.

   The hard part (Spotify OAuth: client secret + refresh token → access token →
   /currently-playing) already runs server-side in a Cloudflare Worker that Recep
   set up earlier. This component just polls that worker's JSON and renders it, so
   no secret ever touches the browser. Same "static site + one external endpoint"
   shape the mascot chat uses.

   Worker returns: { isPlaying, title, artist, album, albumArt, songUrl }
     • isPlaying true  → "Now playing"    (colour art + equalizer)
     • isPlaying false → "Recently played" (greyscale art)

   Override the endpoint with PUBLIC_SPOTIFY_NOW_PLAYING_URL if the worker moves.
---------------------------------------------------------------------------- */
import { useEffect, useRef, useState } from "react";
import type { Lang } from "../i18n/content";

const ENDPOINT =
  (import.meta.env.PUBLIC_SPOTIFY_NOW_PLAYING_URL as string | undefined)?.trim() ||
  "https://spotify-worker.recepzgrmh.workers.dev/";

const POLL_MS = 45_000;
const TIMEOUT_MS = 8_000;

interface Track {
  isPlaying: boolean;
  title: string | null;
  artist: string | null;
  album: string | null;
  albumArt: string | null;
  songUrl: string | null;
}

interface Labels {
  now: string;
  recent: string;
  offline: string;
}

type Phase = "loading" | "ok" | "error";

function normalize(d: any): Track {
  return {
    isPlaying: !!d?.isPlaying,
    title: d?.title ?? null,
    artist: d?.artist ?? null,
    album: d?.album ?? null,
    albumArt: d?.albumArt ?? null,
    songUrl: d?.songUrl ?? null,
  };
}

export default function NowPlaying({ lang, labels }: { lang: Lang; labels: Labels }) {
  const [track, setTrack] = useState<Track | null>(null);
  const [phase, setPhase] = useState<Phase>("loading");
  // ref mirrors the latest track so the poll loop can decide whether to keep
  // showing stale data on a failed fetch without re-subscribing the effect.
  const trackRef = useRef<Track | null>(null);
  trackRef.current = track;

  useEffect(() => {
    let alive = true;
    let timer: number | undefined;

    async function tick() {
      const ctrl = new AbortController();
      const to = window.setTimeout(() => ctrl.abort(), TIMEOUT_MS);
      try {
        const res = await fetch(ENDPOINT, {
          signal: ctrl.signal,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = normalize(await res.json());
        if (!alive) return;
        setTrack(data);
        setPhase("ok");
      } catch {
        if (!alive) return;
        // keep any track we already have; only fall to "error" if we never got one
        if (!trackRef.current) setPhase("error");
      } finally {
        window.clearTimeout(to);
        if (alive) timer = window.setTimeout(tick, POLL_MS);
      }
    }

    tick();
    // pause polling while the tab is hidden; refresh the moment it's back
    const onVis = () => {
      if (document.hidden) {
        if (timer) window.clearTimeout(timer);
      } else {
        tick();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      alive = false;
      if (timer) window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // network died before we ever got data → stay out of the footer entirely
  if (phase === "error" && !track) return null;

  const loading = phase === "loading" && !track;
  const playing = !!track?.isPlaying;
  const hasTrack = !!track?.title;

  const statusText = loading
    ? "…"
    : !hasTrack
      ? labels.offline
      : playing
        ? labels.now
        : labels.recent;

  const title = track?.title ?? "";
  const artist = track?.artist ?? "";
  const art = track?.albumArt || null;
  const href = track?.songUrl || "https://open.spotify.com";

  const Inner = (
    <>
      <div className="relative shrink-0">
        {art ? (
          <img
            src={art}
            alt=""
            width={56}
            height={56}
            loading="lazy"
            className={`h-14 w-14 rounded-card object-cover transition ${
              playing ? "" : "grayscale group-hover:grayscale-0"
            }`}
          />
        ) : (
          <div className="grid h-14 w-14 place-items-center rounded-card bg-soft text-muted">
            {loading ? (
              <span className="h-14 w-14 animate-pulse rounded-card bg-border" />
            ) : (
              <span aria-hidden="true">♪</span>
            )}
          </div>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {playing ? (
            <span className="eq" aria-hidden="true">
              <i></i>
              <i></i>
              <i></i>
            </span>
          ) : (
            <span aria-hidden="true" className="text-muted">
              {loading ? "•" : "⌛"}
            </span>
          )}
          <span
            className="kicker"
            style={playing ? { color: "var(--color-amber)" } : undefined}
          >
            {statusText}
          </span>
        </div>
        {loading ? (
          <>
            <span className="mt-1.5 block h-3.5 w-32 animate-pulse rounded bg-border" />
            <span className="mt-1.5 block h-3 w-20 animate-pulse rounded bg-border" />
          </>
        ) : (
          <>
            <p className="mt-1 truncate font-bold text-fg">{title || labels.offline}</p>
            {artist && <p className="truncate text-sm text-fg-2">{artist}</p>}
          </>
        )}
      </div>
    </>
  );

  const cardClass =
    "group inline-flex w-fit max-w-full items-center gap-4 rounded-card2 border border-border bg-surface p-3 pr-6 shadow-sm transition hover:border-fg/20 hover:shadow-md";

  return (
    <div aria-live="polite" aria-label="Spotify">
      {loading || !hasTrack ? (
        <div className={cardClass}>{Inner}</div>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
          aria-label={`${statusText}: ${title}${artist ? ` — ${artist}` : ""}`}
        >
          {Inner}
        </a>
      )}
    </div>
  );
}
