import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Satoshi", "system-ui", "sans-serif"],
        body: ["General Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        bg: {
          primary: "var(--color-bg-primary)",
          surface: "var(--color-bg-surface)",
          elevated: "var(--color-bg-elevated)",
          terminal: "var(--color-bg-terminal)",
          code: "var(--color-bg-code)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          inverse: "var(--color-text-inverse)",
        },
        accent: {
          thread: "var(--color-accent-thread)",
          "thread-glow": "var(--color-accent-thread-glow)",
          sky: "var(--color-accent-sky)",
          "sky-muted": "var(--color-accent-sky-muted)",
          warm: "var(--color-accent-warm)",
          "warm-hover": "var(--color-accent-warm-hover)",
        },
        border: {
          subtle: "var(--color-border-subtle)",
          default: "var(--color-border-default)",
          strong: "var(--color-border-strong)",
        },
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      maxWidth: {
        content: "70rem",
        narrow: "48rem",
        wide: "85rem",
      },
      fontSize: {
        xs: ["0.7rem", { lineHeight: "1.4" }],
        sm: ["0.875rem", { lineHeight: "1.6" }],
        base: ["1rem", { lineHeight: "1.65" }],
        md: ["1.125rem", { lineHeight: "1.65" }],
        lg: ["1.25rem", { lineHeight: "1.5" }],
        xl: ["1.563rem", { lineHeight: "1.4" }],
        "2xl": ["1.953rem", { lineHeight: "1.2" }],
        "3xl": ["2.441rem", { lineHeight: "1.2" }],
        "4xl": ["3.052rem", { lineHeight: "1.1" }],
        "5xl": ["3.815rem", { lineHeight: "1.1" }],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.04)",
        md: "0 4px 12px rgba(0,0,0,0.06)",
        lg: "0 8px 24px rgba(0,0,0,0.08)",
        nav: "0 1px 0 var(--color-border-subtle)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        thread: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "node-pulse": {
          "0%": { transform: "scale(1)", opacity: "0.4" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "cursor-blink": "cursor-blink 1.06s step-end infinite",
        "node-pulse": "node-pulse 1.5s ease-out infinite",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fade-in 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        "slide-in-right":
          "slide-in-right 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
