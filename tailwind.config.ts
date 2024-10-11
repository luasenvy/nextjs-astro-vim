import TailwindTypography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-ubuntu-mono)", "monospace", ...fontFamily.mono],
      },
      colors: {
        "nvim-bg": "#1c1c1c",
        "nvim-gray": "#4e4e4e",
        "nvim-blue": "#5fafd7",
        "nvim-green": "#87d787",
        "nvim-statusline": "#303030",
      },
    },
  },
  plugins: [TailwindTypography],
} satisfies Config;
