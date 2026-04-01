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
          accent: "#C8A96E",
          "accent-dark": "#B8954A",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Playfair Display", "serif"],
      },
      backgroundImage: {
        "jc-gold": "linear-gradient(135deg, #C8A96E, #B8954A, #C8A96E)",
      },
    },
  },
} satisfies Config;

export default config;

