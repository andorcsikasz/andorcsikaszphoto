/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      // ===== TYPOGRAPHY =====
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Segoe UI', 'Roboto', 'system-ui', 'sans-serif'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.35rem', letterSpacing: '0.005em' }],
        'base': ['1rem', { lineHeight: '1.6rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.8rem', letterSpacing: '-0.015em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '2.35rem', letterSpacing: '-0.025em' }],
        '4xl': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.035em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
        '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.045em' }],
      },
      
      // ===== BLUEGROUND-INSPIRED COLOR PALETTE =====
      colors: {
        // Premium Neutrals - Warmer, more sophisticated
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          150: '#E8EDF3',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          850: '#172033',
          900: '#0F172A',
          950: '#0A0F1A',
        },
        
        // Primary - Blueground's sophisticated teal/emerald
        primary: {
          50: '#ECFDF8',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
        },
        
        // Accent - Deep Navy Blue (Blueground's signature)
        navy: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        
        // Warm accent - For highlights and CTAs
        coral: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        
        // Luxurious gold for premium indicators
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        
        // Sophisticated violet for special features
        violet: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
        },
        
        // Rose for soft accents
        rose: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
        },
        
        // Mint - Fresh and modern
        mint: {
          50: '#F0FDF9',
          100: '#CCFBEF',
          200: '#99F6E0',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        
        // === SEMANTIC COLORS ===
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        
        // Surface colors - Light mode
        surface: {
          DEFAULT: '#FFFFFF',
          elevated: '#FFFFFF',
          muted: '#F8FAFC',
          subtle: '#F1F5F9',
        },
        
        // Role-specific (tenant/landlord)
        tenant: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#5C6AC4',
          700: '#4F46E5',
          800: '#4338CA',
          900: '#3730A3',
          light: '#E9ECF5',
        },
        landlord: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#2B7352',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          light: '#DDEFE6',
        },
        warm: {
          50: '#FDFDFB',
          100: '#FAFAF8',
          200: '#F5F5F3',
        },

        // === DARK MODE COLORS ===
        dark: {
          bg: {
            DEFAULT: '#09090B',
            elevated: '#18181B',
            secondary: '#0E0E10',
            tertiary: '#1C1C1F',
            input: '#1E1E21',
            hover: '#27272A',
          },
          card: {
            DEFAULT: '#18181B',
            border: '#27272A',
            hover: '#222225',
          },
          text: {
            primary: '#FAFAFA',
            secondary: '#A1A1AA',
            tertiary: '#71717A',
            muted: '#52525B',
          },
          border: {
            DEFAULT: '#27272A',
            light: '#3F3F46',
            focus: '#52525B',
          },
          cta: {
            green: '#4ADE80',
            purple: '#A78BFA',
            blue: '#60A5FA',
          },
          tooltip: {
            bg: '#27272A',
            border: '#3F3F46',
            text: '#E4E4E7',
          },
        },
      },
      
      // ===== SPACING SCALE =====
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      
      // ===== SHADOWS - Refined for depth =====
      boxShadow: {
        // Subtle shadows
        'soft-xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'soft-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.06), 0 4px 12px -4px rgba(0, 0, 0, 0.04)',
        'soft-md': '0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 8px 24px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -4px rgba(0, 0, 0, 0.05)',
        'soft-xl': '0 20px 40px -8px rgba(0, 0, 0, 0.1), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
        'soft-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        
        // Elevation shadows (card depth)
        'elevation-1': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        'elevation-2': '0 3px 6px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'elevation-3': '0 10px 20px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.04)',
        'elevation-4': '0 15px 30px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.05)',
        
        // Glow effects
        'glow-sm': '0 0 12px -2px rgba(16, 185, 129, 0.25)',
        'glow': '0 0 20px -5px rgba(16, 185, 129, 0.35)',
        'glow-lg': '0 0 30px -5px rgba(16, 185, 129, 0.45)',
        'glow-primary': '0 0 20px -5px rgba(16, 185, 129, 0.4)',
        'glow-violet': '0 0 20px -5px rgba(139, 92, 246, 0.4)',
        'glow-navy': '0 0 20px -5px rgba(59, 130, 246, 0.4)',
        'glow-coral': '0 0 20px -5px rgba(249, 115, 22, 0.4)',
        
        // Dark mode shadows
        'dark-soft': '0 2px 8px -2px rgba(0, 0, 0, 0.35), 0 4px 12px -4px rgba(0, 0, 0, 0.45)',
        'dark-md': '0 4px 12px -2px rgba(0, 0, 0, 0.4), 0 2px 6px -2px rgba(0, 0, 0, 0.3)',
        'dark-lg': '0 8px 24px -4px rgba(0, 0, 0, 0.5), 0 4px 12px -4px rgba(0, 0, 0, 0.4)',
        'dark-xl': '0 20px 40px -8px rgba(0, 0, 0, 0.6)',
        'dark-glow-green': '0 0 20px -5px rgba(74, 222, 128, 0.5)',
        'dark-glow-purple': '0 0 20px -5px rgba(167, 139, 250, 0.5)',
        
        // Inner shadows
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
        'inner-md': 'inset 0 4px 8px 0 rgba(0, 0, 0, 0.06)',
        
        // Button shadows
        'btn': '0 1px 2px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05)',
        'btn-hover': '0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.05)',
        'btn-active': '0 1px 1px rgba(0,0,0,0.05)',
        
        // CTA shadows
        'cta': '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
        'cta-hover': '0 6px 20px 0 rgba(0, 0, 0, 0.15)',
        'cta-primary': '0 4px 14px 0 rgba(16, 185, 129, 0.25)',
        'cta-primary-hover': '0 6px 20px 0 rgba(16, 185, 129, 0.35)',
      },
      
      // ===== BORDER RADIUS =====
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      
      // ===== BACKDROP BLUR =====
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '64px',
      },
      
      // ===== ANIMATIONS =====
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-out': 'fadeOut 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-left': 'slideInLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'scale-out': 'scaleOut 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up-fade': 'slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'modal-slide': 'modalSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'modal-exit': 'modalExit 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'backdrop-blur': 'backdropBlur 0.3s ease-out',
        'drawer-slide': 'drawerSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'tooltip-fade': 'tooltipFade 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'popover-enter': 'popoverEnter 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ghost-anchor': 'ghostAnchor 2s infinite ease-in-out',
        'pulse-ring': 'pulseRing 1.5s cubic-bezier(0.24, 0, 0.38, 1) infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'wiggle': 'wiggle 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'shake': 'shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'spin-smooth': 'spinSmooth 1s linear infinite',
        'loading-dots': 'loadingDots 1.4s infinite',
        'card-hover': 'cardHover 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'page-enter': 'pageEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'page-exit': 'pageExit 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'notification-pop': 'notificationPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'badge-pulse': 'badgePulse 2s ease-in-out infinite',
        'progress-fill': 'progressFill 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer': 'shimmer 2s infinite',
        'success-check': 'successCheck 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'error-shake': 'errorShake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        // New premium animations
        'gradient-shift': 'gradientShift 8s ease infinite',
        'subtle-bounce': 'subtleBounce 2s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'text-shimmer': 'textShimmer 2.5s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.92)' },
        },
        slideUpFade: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        modalSlide: {
          '0%': { opacity: '0', transform: 'translateY(32px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        modalExit: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.96)' },
        },
        backdropBlur: {
          '0%': { opacity: '0', backdropFilter: 'blur(0px)' },
          '100%': { opacity: '1', backdropFilter: 'blur(8px)' },
        },
        drawerSlide: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        tooltipFade: {
          '0%': { opacity: '0', transform: 'translateY(-6px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        popoverEnter: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        ghostAnchor: {
          '0%, 100%': { opacity: '0.4', transform: 'translateY(0)' },
          '50%': { opacity: '1', transform: 'translateY(8px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.7)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 12px rgba(99, 102, 241, 0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        bounceSubtle: {
          '0%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-8px)' },
          '50%': { transform: 'translateY(-4px)' },
          '70%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
        spinSmooth: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        loadingDots: {
          '0%, 80%, 100%': { transform: 'scale(0)', opacity: '0.5' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
        cardHover: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-4px) scale(1.01)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pageEnter: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pageExit: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
        notificationPop: {
          '0%': { opacity: '0', transform: 'scale(0.8) translateY(-10px)' },
          '50%': { transform: 'scale(1.05) translateY(0)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        badgePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width, 100%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        successCheck: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        errorShake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-6px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(6px)' },
        },
        // Premium animations
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        subtleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px -5px rgba(16, 185, 129, 0.3)' },
          '50%': { boxShadow: '0 0 30px -5px rgba(16, 185, 129, 0.5)' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
      },
      
      // ===== TRANSITION UTILITIES =====
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
        '450': '450ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      
      // ===== BACKGROUND PATTERNS =====
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-shine': 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(174,72%,56%,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(262,72%,56%,0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(174,72%,56%,0.2) 0px, transparent 50%)',
        'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
      },
      
      // ===== RING COLORS =====
      ringColor: {
        focus: {
          blue: '#60A5FA',
          purple: '#A78BFA',
          primary: '#10B981',
        },
      },
    },
  },
  plugins: [],
}
