import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./components/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx,md}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        // Alias secondaire (optionnel)
        secondary: "var(--secondary)",
        textSecondary: "var(--muted-foreground)",
        // Jay's Creations Design palette
        jc: {
          bg: "#FAF7F2",
          surface: "#FFFFFF",
          border: "#E8E4DF",
          text: "#2C1A0E",
          muted: "#6B6B6B",
          accent: "#8B4513",
          "accent-dark": "#6b3410",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Playfair Display", "serif"],
      },
      backgroundImage: {
        "jc-gold": "linear-gradient(135deg, #8B4513, #6b3410, #8B4513)",
      },
    },
  },
} satisfies Config;

export default config;

