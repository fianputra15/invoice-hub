import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#1c2434",
        primary: "#3c50e0",
        white: "#ffffff",
        honeydew: "#e1f9f0",
        eucalyptus: "#34D399",
        white02: "#f0f0f0",
        'gray-100': "#9d9d9d",
        'anti-flashwhite': "#f1f5f9",
        'charleston-green': "#212B36",
        'slate-gray': "#6C7B91",
        'dark-gunmetal': "#1C2434",
      },
    },
  },
  plugins: [],
} satisfies Config;
