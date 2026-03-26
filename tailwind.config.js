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
        // Dark theme base
        bg:           '#0B0B1A',
        'bg-2':       '#111128',
        card:         '#13132A',
        'card-hover': '#1A1A35',
        border:       'rgba(255,255,255,0.08)',
        'border-lg':  'rgba(255,255,255,0.12)',
        ink:          '#FFFFFF',
        muted:        '#9CA3AF',
        light:        '#6B7280',

        // Accents
        primary:        '#6366F1',
        'primary-dark': '#4F46E5',
        'primary-glow': 'rgba(99,102,241,0.25)',
        'primary-light':'rgba(99,102,241,0.12)',
        accent:         '#22D3EE',
        'accent-light': 'rgba(34,211,238,0.12)',
        warning:        '#F59E0B',
        'warning-light':'rgba(245,158,11,0.12)',
        purple:         '#A78BFA',
        'purple-light': 'rgba(167,139,250,0.12)',
        error:          '#EF4444',
        'error-light':  'rgba(239,68,68,0.12)',
        success:        '#10B981',
        'success-light':'rgba(16,185,129,0.12)',
      },
      fontFamily: {
        display: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      boxShadow: {
        card:        '0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
        'card-hover':'0 8px 24px rgba(0,0,0,0.4)',
        primary:     '0 4px 20px rgba(99,102,241,0.4)',
        glow:        '0 0 40px rgba(99,102,241,0.15)',
      },
      animation: {
        'fade-up':  'fadeUp 0.5s ease both',
        'fade-in':  'fadeIn 0.3s ease both',
        'slide-in': 'slideIn 0.3s ease both',
        'glow-pulse':'glowPulse 3s ease-in-out infinite',
        pulse:      'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%':      { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
