/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#378ADD',
        'primary-light': '#EBF4FF',
        accent: '#1D9E75',
        'accent-light': '#E8F7F2',
        warning: '#E85D24',
        'warning-light': '#FFF0EB',
        purple: '#7F77DD',
        'purple-light': '#F0EFFF',
        bg: '#F4F6FF',
        card: '#FFFFFF',
        ink: '#1A1A2E',
        muted: '#6B7280',
        light: '#9CA3AF',
        border: '#E5E7EB',
        error: '#EF4444',
        'error-light': '#FEF2F2',
        success: '#10B981',
        'success-light': '#ECFDF5',
      },
      fontFamily: {
        display: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08)',
        primary: '0 4px 14px rgba(55,138,221,0.3)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease both',
        'fade-in': 'fadeIn 0.3s ease both',
        'slide-in': 'slideIn 0.3s ease both',
        pulse: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
