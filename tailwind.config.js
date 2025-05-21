/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Variables CSS :root
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',

        // Tes couleurs personnalisées
        "custom-blue": "#0F548D",
        "custom-gray": "#a4a4a4",
        "custom-rose": "#fff1f1",
        "custom-red": "#c32721",
        "custom-red-clear": "#c6312b",
        "custom-green": "#42a199",
        "custom-green-clear": "#ebf8f7",
        "custom-green-background": "#c7f0d9",
        "custom-green-divider": "#bde4e1",
        "custom-brown": "#ffeca7",
        "custom-green-text": "#4E986D",
        "custom-red-bg-clear": "#fad4ce",
        "custom-orange": "#ffeda3",
        "custom-text-orange": "#FF8200",
        "custom-orange-bg": "#FFECA7",
        "mockup-green": "#2d6b66",
        "mockup-blue": "#6dc3bc",
        "tab2-bg":"#e1f5f5",
        "tab4-bg":"#fdf2f0",
      },
      lineHeight: {
        clash: 1,
        archivo: 1.2,
      },
      fontSize: {
        s:8,
        xs: 12,
        sm: 14,
        sl: 15,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '2.5xl': 26,
        '3xl': 30,
        '4xl': 36,
        '5xl': 48,
        '6xl': 60,
      },
    },
  },
  letterSpacing: {
    tightest: "-.075em",
    tighter: "-.05em",
    tight: "-.025em",
    normal: "0",
    wide: ".025em",
    wider: ".05em",
    widest: ".1em",
    widest: ".25em",
  },
  plugins: [],
}