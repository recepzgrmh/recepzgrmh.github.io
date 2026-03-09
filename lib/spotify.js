window.App = window.App || {};

class SpotifyPlayer {
    constructor() {
        this.endpoint = 'https://spotify-worker.recepzgrmh.workers.dev/';
        this.pollInterval = 45 * 1000;
        this.timeoutDuration = 8000;
        this.timer = null;
        this.currentTrack = null;
        this.isPaused = false;
        this.isFetching = false;

        this.init();
    }

    init() {
        // Mount logic is handled in app.js, this just starts the data flow
        this.fetchAndUpdate();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.isPaused = true;
                if (this.timer) clearTimeout(this.timer);
            } else {
                this.isPaused = false;
                this.fetchAndUpdate();
            }
        });
    }

    dispatchState(payload) {
        window.dispatchEvent(
            new CustomEvent('spotify:update', {
                detail: payload,
            })
        );
    }

    async fetchAndUpdate() {
        if (this.isPaused || this.isFetching) return;
        if (this.timer) clearTimeout(this.timer);

        this.isFetching = true;

        try {
            const track = await this.getCurrentlyPlaying();
            this.currentTrack = track;
            this.dispatchState(track);
        } catch (e) {
            console.warn('[Spotify] Fetch failed:', e.message);

            if (this.currentTrack) {
                // Keep showing stale data if we have it
                this.dispatchState({
                    ...this.currentTrack,
                    isStale: true
                });
            } else {
                this.dispatchState({ isError: true });
            }
        } finally {
            this.isFetching = false;
            if (!this.isPaused) {
                this.timer = setTimeout(() => this.fetchAndUpdate(), this.pollInterval);
            }
        }
    }

    async getCurrentlyPlaying() {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.timeoutDuration);

        try {
            const res = await fetch(this.endpoint, {
                signal: controller.signal,
                headers: { 'Accept': 'application/json' }
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();

            // Normalize data
            return {
                isPlaying: !!data.isPlaying,
                title: data.title || null,
                artist: data.artist || null,
                album: data.album || null,
                albumArt: data.albumArt || null,
                songUrl: data.songUrl || null,
                isLoading: false,
                isError: false
            };
        } finally {
            clearTimeout(timeout);
        }
    }
}

window.App.spotifyPlayer = window.App.spotifyPlayer || new SpotifyPlayer();