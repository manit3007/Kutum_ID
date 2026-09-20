/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          blue: {
            50: '#e0f2fe',
            100: '#bae6fd',
            200: '#7dd3fc',
            300: '#38bdf8',
            400: '#0ea5e9',
            500: '#0284c7',
            600: '#0369a1',
          },
          indigo: {
            50: '#eef2ff',
            100: '#e0e7ff',
            200: '#c7d2fe',
            300: '#a5b4fc',
            400: '#818cf8',
            500: '#6366f1',
            600: '#4f46e5',
          },
          green: {
            50: '#dcfce7',
            100: '#bbf7d0',
            200: '#86efac',
            300: '#4ade80',
            400: '#22c55e',
            500: '#16a34a',
            600: '#15803d',
          },
          amber: {
            50: '#fef3c7',
            100: '#fde68a',
            200: '#fcd34d',
            300: '#fbbf24',
            400: '#f59e0b',
            500: '#d97706',
            600: '#b45309',
          },
          rose: {
            50: '#ffe4e6',
            100: '#fecdd3',
            200: '#fda4af',
            300: '#fb7185',
            400: '#f43f5e',
            500: '#e11d48',
            600: '#be123c',
          },
          purple: {
            50: '#f3e8ff',
            100: '#e9d5ff',
            200: '#d8b4fe',
            300: '#c084fc',
            400: '#a855f7',
            500: '#9333ea',
            600: '#7e22ce',
          },
        },
        primary: {
          50: '#e0f2fe',
          100: '#bae6fd',
          500: '#0ea5e9',
          600: '#0284c7',
          900: '#0c4a6e',
        },
        gov: {
          blue: '#6366f1',
          accent: '#818cf8',
          success: '#4ade80',
          warning: '#fbbf24',
          bg: '#fafafa'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
