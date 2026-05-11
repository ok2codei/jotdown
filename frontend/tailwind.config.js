/** @type {import('tailwindcss').Config} */
export default {
  darkMode  : 'class',
  content: ["./index.html",
     "./src/**/*.{ts,tsx}",
    ],
  theme: {
    extend: {
      colors: {
        // 1. BRAND TOKENS (The "Ingredients")
        brand: {
          primary: '#6366f1',   /* Baby Purple */
          secondary: '#94a3b8', /* Muted Slate */
          accent: '#da051e',    /* Soft Red/Rose */
        },

        // 2. SEMANTIC ROLES (The "Usage")
        // We name these based on WHERE they go
        ui: {
          canvas: '#f8fafc',         // Light mode background
          'canvas-dark': '#0f172a',  // Dark mode background
          
          surface: '#ffffff',        // Light mode card
          'surface-dark': '#1e293b', // Dark mode card

          border: '#e2e8f0',         // Light Border
          'border-dark': '#334155',  // Dark Border
      },
    },
    fontFamily: {
      brand: ['Inter', 'sans-serif'],
      heading: ['Montserrat', 'serif'],
    },
    fontSize: {
      'xs-tiny': '0.65rem', // Custom tiny text for labels
    }
    },
  },
  plugins: [],
}

