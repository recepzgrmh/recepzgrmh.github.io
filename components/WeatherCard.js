window.App = window.App || {};

window.App.createWeatherCard = function () {
    const card = document.createElement('div');
    card.id = 'weather-live-card';
    card.className = 'weather-live-card';

    const inner = document.createElement('div');
    inner.className = 'weather-inner';
    card.appendChild(inner);

    let timezone = 'Europe/Istanbul'; // Default

    const render = (data) => {
        const city = data.city || '...';
        const temp = data.temp !== undefined ? Math.round(data.temp) : '--';
        const desc = data.description || '';
        
        inner.innerHTML = `
            <div class="weather-content">
                <div class="weather-info">
                    <span class="weather-location">${city}</span>
                    <span class="weather-details">${temp}°C, ${desc}</span>
                </div>
                <div class="weather-time-wrap">
                    <span id="yerel-saat" class="weather-time">00:00</span>
                </div>
            </div>
        `;
        
        if (data.timezone) {
            timezone = data.timezone;
        }
        updateClock();
        
        // Trigger entrance animation
        setTimeout(() => card.classList.add('active'), 100);
    };

    const updateClock = () => {
        const timeEl = inner.querySelector('#yerel-saat');
        if (!timeEl) return;

        const now = new Date();
        const timeString = now.toLocaleTimeString('en-GB', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        timeEl.textContent = timeString;
    };

    const fetchWeather = async () => {
        try {
            const res = await fetch('https://weather-api.recepzgrmh.workers.dev/');
            if (!res.ok) throw new Error('Weather fetch failed');
            const data = await res.json();
            render(data);
        } catch (e) {
            console.warn('[Weather] Fetch failed:', e.message);
            render({ city: 'Error', temp: '--', description: 'Offline' });
        }
    };

    // Initial render and fetch
    render({ city: 'Loading', temp: '--', description: '...' });
    fetchWeather();

    // Update clock every second
    setInterval(updateClock, 1000);
    
    // Refresh weather every 30 minutes
    setInterval(fetchWeather, 30 * 60 * 1000);

    return card;
};
