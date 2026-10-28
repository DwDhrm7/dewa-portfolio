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
        walnut: {
          950: "#1c130c",
          900: "#271a11",
          800: "#382618",
          700: "#4e3622",
          600: "#6b4c32",
        },
        oak: "#9a7653",
        brass: "#b08d57",
        parchment: "#f4ecdd",
        linen: "#e9dcc5",
        ink: "#2a1f16",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        headline: ["var(--font-headline)", "system-ui", "sans-serif"],
        garamond: ["var(--font-garamond)", "Garamond", "Georgia", "serif"],
        serif: ["var(--font-garamond)", "Garamond", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
