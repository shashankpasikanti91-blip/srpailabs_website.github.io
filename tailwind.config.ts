import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(20px) rotate(-5deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(265 85% 65% / 0.3), 0 0 10px hsl(190 100% 50% / 0.15)" },
          "50%": { boxShadow: "0 0 50px hsl(265 85% 65% / 0.5), 0 0 25px hsl(190 100% 50% / 0.25)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "aurora-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1) translate(0, 0)" },
          "25%": { opacity: "0.6", transform: "scale(1.1) translate(2%, -3%)" },
          "50%": { opacity: "0.5", transform: "scale(0.95) translate(-2%, 2%)" },
          "75%": { opacity: "0.7", transform: "scale(1.05) translate(1%, -1%)" },
        },
        "orb-float-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 30px) scale(0.95)" },
        },
        "orb-float-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-40px, 30px) scale(1.05)" },
          "66%": { transform: "translate(25px, -40px) scale(0.9)" },
        },
        "orb-float-3": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(20px, 40px) scale(0.95)" },
          "66%": { transform: "translate(-30px, -20px) scale(1.08)" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 8s ease-in-out infinite",
        "float-reverse": "float-reverse 10s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "shimmer": "shimmer 3s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
        "scale-in": "scale-in 0.4s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "aurora-pulse": "aurora-pulse 12s ease-in-out infinite",
        "orb-float-1": "orb-float-1 18s ease-in-out infinite",
        "orb-float-2": "orb-float-2 22s ease-in-out infinite",
        "orb-float-3": "orb-float-3 20s ease-in-out infinite",
        "text-shimmer": "text-shimmer 4s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': `
          radial-gradient(at 40% 20%, hsl(265 85% 65% / 0.15) 0px, transparent 50%),
          radial-gradient(at 80% 0%, hsl(320 90% 60% / 0.1) 0px, transparent 50%),
          radial-gradient(at 0% 50%, hsl(190 100% 50% / 0.1) 0px, transparent 50%),
          radial-gradient(at 80% 50%, hsl(220 85% 60% / 0.08) 0px, transparent 50%),
          radial-gradient(at 0% 100%, hsl(265 85% 65% / 0.12) 0px, transparent 50%)
        `,
        'gradient-srp': 'linear-gradient(135deg, hsl(320 90% 60%), hsl(265 85% 65%), hsl(220 85% 60%), hsl(190 100% 50%))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
