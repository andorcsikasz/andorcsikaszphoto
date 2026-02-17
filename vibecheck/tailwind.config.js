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
        primary: {
          50: '#f0f7fa',
          100: '#dbe4f0',
          500: '#0f4c75',
          600: '#0a3d5c',
          900: '#051f2e',
        },
        dark: {
          50: '#f5f4f1',
          100: '#e6e5e0',
          800: '#1e1e1c',
          900: '#141414',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '800' }],
        'headline': ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '800' }],
        'title': ['clamp(1.25rem, 3vw, 1.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '-0.01em', fontWeight: '450' }],
        'small': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '600' }],
      },
      fontWeight: {
        'extra-bold': '800',
        'bold': '700',
        'semi-bold': '600',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'float': 'float 10s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        'slide-up': 'slideUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-down': 'slideDown 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-left': 'slideLeft 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-right': 'slideRight 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scaleIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'blur-in': 'blurIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'rotate-in': 'rotateIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'bounce-subtle': 'bounceSubtle 0.5s ease-in-out',
        'shimmer': 'shimmer 2s linear infinite',
        'glitch': 'glitch 8s infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'star-movement-bottom': 'starMovementBottom 2.5s ease-in-out infinite alternate',
        'star-movement-top': 'starMovementTop 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(10px)', transform: 'scale(0.95)' },
          '100%': { opacity: '1', filter: 'blur(0)', transform: 'scale(1)' },
        },
        rotateIn: {
          '0%': { opacity: '0', transform: 'rotate(-5deg) scale(0.95)' },
          '100%': { opacity: '1', transform: 'rotate(0deg) scale(1)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glitch: {
          '0%, 6%, 100%': { transform: 'translate(0)', textShadow: 'none' },
          '2%': { transform: 'translate(2px, 0)', textShadow: '-2px 0 var(--accent-primary), 2px 0 var(--error-text)' },
          '4%': { transform: 'translate(-2px, 0)', textShadow: '2px 0 var(--accent-primary), -2px 0 var(--error-text)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(91, 163, 214, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(91, 163, 214, 0.6)' },
        },
        starMovementBottom: {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0.3' },
        },
        starMovementTop: {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0.3' },
        },
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.025em',
        'tight': '-0.015em',
      },
    },
  },
  plugins: [],
}
