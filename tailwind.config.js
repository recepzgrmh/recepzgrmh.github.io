/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        main: "var(--text-main)",
        muted: "var(--text-muted)",
        body: "var(--bg-body)",
        canvas: "var(--bg-canvas)",
        card: "var(--card-bg)",
        "card-border": "var(--card-border)",
        "card-hover": "var(--card-hover-bg)",
        cyan: {
          400: '#06b6d4',
          500: '#0891b2',
          DEFAULT: "var(--accent-cyan)",
        },
        nav: "var(--nav-bg)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
