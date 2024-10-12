import TailwindTypography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
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
        "nvim-bg-default": colors.stone[900],
        "nvim-bg-paper": colors.zinc[800],
        "nvim-text-primary": colors.amber[500],
        "nvim-text-primaryDark": colors.amber[600],
        "nvim-text-selection": colors.gray[950],
        "nvim-bg-text-selection": colors.stone[400],
        "nvim-text-secondary": colors.gray[400],
        "nvim-error": colors.red[600],
        "nvim-placeholder": colors.blue[700],
        "nvim-primary": colors.green[600],
      },
    },
  },
  plugins: [TailwindTypography],
} satisfies Config;
