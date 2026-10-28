import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        muted: "var(--muted)",
        line: "var(--line)",
        accent: "var(--accent)",
        // Writer's realm: paper and ink, brown only as a faint pencil tint.
        paper: "#fbf9f5",
        wash: "#f3ede4",
        ink: { DEFAULT: "#241c15", soft: "#6b5d50" },
        oak: "#8a6a4a",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        headline: ["var(--font-headline)", "system-ui", "sans-serif"],
        serif: ["var(--font-reading)", "Georgia", "Cambria", "serif"],
        ui: ["var(--font-writer-ui)", "Helvetica Neue", "Arial", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
