window.App = window.App || {};

window.App.createSpotifyLiveCard = function () {
    const card = document.createElement('div');
    card.id = 'spotify-live-card';
    card.className = 'spotify-live-card'; // active class will be added by render
    card.setAttribute('aria-live', 'polite');

    function escapeHtml(str = '') {
        return String(str)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');
    }

    function renderLoading() {
        card.classList.add('active');
        card.innerHTML = `
            <div class="spotify-inner spotify-loading">
                <div class="spotify-art-wrap">
                    <div class="spotify-art spotify-skeleton"></div>
                </div>
                <div class="spotify-info">
                    <div class="spotify-status">
                        <span class="spotify-icon animate-spin">•</span>
                        <span>LOADING...</span>
                    </div>
                    <div class="spotify-skeleton-line" style="width: 120px; height: 14px; margin-bottom: 6px;"></div>
                    <div class="spotify-skeleton-line" style="width: 80px; height: 12px;"></div>
                </div>
            </div>
        `;
    }

    function renderUnavailable() {
        card.classList.add('active', 'is-unavailable');
        card.innerHTML = `
            <div class="spotify-inner">
                <div class="spotify-art-wrap">
                    <img src="/assets/logo.webp" alt="Spotify unavailable" class="spotify-art grayscale">
                </div>
                <div class="spotify-info">
                    <div class="spotify-status">
                        <span class="spotify-icon">!</span>
                        <span>UNAVAILABLE</span>
                    </div>
                    <p class="spotify-title">No status found</p>
                    <p class="spotify-artist">Offline</p>
                </div>
            </div>
        `;
    }

    function renderRecentlyPlayed(track) {
        card.classList.add('active', 'recently-played');
        card.classList.remove('is-unavailable');

        const title = escapeHtml(track.title || 'Unknown track');
        const artist = escapeHtml(track.artist || 'Unknown artist');
        const albumArt = escapeHtml(track.albumArt || 'assets/logo.webp');
        const songUrl = track.songUrl
            ? `href="${escapeHtml(track.songUrl)}" target="_blank" rel="noopener noreferrer"`
            : 'href="https://open.spotify.com" target="_blank" rel="noopener noreferrer"';

        card.innerHTML = `
            <a ${songUrl} class="spotify-inner" aria-label="Open recently played: ${title} by ${artist}">
                <div class="spotify-art-wrap">
                    <img src="${albumArt}" alt="Album art" class="spotify-art grayscale">
                </div>
                <div class="spotify-info">
                    <div class="spotify-status">
                        <span class="spotify-icon">⌛</span>
                        <span>RECENTLY PLAYED</span>
                    </div>
                    <p class="spotify-title">${title}</p>
                    <p class="spotify-artist">${artist}</p>
                </div>
            </a>
        `;
    }

    function renderPlaying(track) {
        card.classList.add('active');
        card.classList.remove('recently-played', 'is-unavailable');

        const title = escapeHtml(track.title || 'Unknown track');
        const artist = escapeHtml(track.artist || 'Unknown artist');
        const albumArt = escapeHtml(track.albumArt || 'assets/logo.webp');
        const songUrl = track.songUrl
            ? `href="${escapeHtml(track.songUrl)}" target="_blank" rel="noopener noreferrer"`
            : 'href="https://open.spotify.com" target="_blank" rel="noopener noreferrer"';

        card.innerHTML = `
            <a ${songUrl} class="spotify-inner" aria-label="Now playing: ${title} by ${artist}">
                <div class="spotify-art-wrap">
                    <img src="${albumArt}" alt="Album art" class="spotify-art">
                    <div class="spotify-pulse"></div>
                </div>
                <div class="spotify-info">
                    <div class="spotify-status pulsing">
                        <span class="spotify-icon">♫</span>
                        <span>NOW PLAYING</span>
                    </div>
                    <p class="spotify-title">${title}</p>
                    <p class="spotify-artist">${artist}</p>
                </div>
            </a>
        `;
    }

    function render(track) {
        if (!track || track.isLoading) {
            renderLoading();
            return;
        }

        if (track.isError) {
            // If we have no data at all, show unavailable
            renderUnavailable();
            return;
        }

        if (!track.isPlaying) {
            renderRecentlyPlayed(track);
            return;
        }

        renderPlaying(track);
    }

    window.addEventListener('spotify:update', (e) => {
        render(e.detail);
    });

    // Initial render
    const initialTrack = window.App.spotifyPlayer?.currentTrack;
    render(initialTrack);

    return card;
};