import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

// Theme colors are CSS variables (space-separated RGB) defined in src/index.css,
// so every class works in both light and dark mode.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "monospace"],
      },
      colors: {
        bg: v("bg"),
        surface: v("surface"),
        line: v("line"),
        fg: v("fg"), // headings
        fg2: v("fg2"), // body text
        fg3: v("fg3"), // muted
        fg4: v("fg4"), // subtle (dates, labels)
        fg5: v("fg5"), // faint (numbers, separators)
        accent: v("accent"), // amber
        accent2: v("accent2"), // emerald
      },
      keyframes: {
        blink: { "0%, 50%": { opacity: "1" }, "50.01%, 100%": { opacity: "0" } },
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
