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
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Playfair Display", "serif"],
      },
    },
  },
} satisfies Config;

export default config;

