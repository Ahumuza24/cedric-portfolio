/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            colors: {
                charcoal: '#05070D',
                graphite: '#0B101C',
                offwhite: '#F4F7FF',
                'burnt-orange': '#FF985B',
                gold: '#9DA8FF',
                sage: '#66F6D2',
                cyan: {
                    50: '#ECFEFF',
                    100: '#CFFAFE',
                    200: '#A5F3FC',
                    300: '#67E8F9',
                    400: '#22D3EE',
                    500: '#06B6D4',
                    600: '#0891B2',
                    DEFAULT: '#6EF3FF',
                },
                cobalt: '#756BFF',
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
            },
            fontFamily: {
                sans: ['Karla', 'system-ui', 'sans-serif'],
                display: ['Montserrat', 'system-ui', 'sans-serif'],
                mono: ['Space Mono', 'ui-monospace', 'monospace'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-delay': 'float 6s ease-in-out infinite 2s',
                'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
                'grid-reveal': 'gridReveal 1.5s ease forwards',
                'spin-slow': 'spin 20s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(228, 87, 46, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(228, 87, 46, 0.7)' },
                },
                gridReveal: {
                    from: { opacity: '0', transform: 'scaleY(0)' },
                    to: { opacity: '1', transform: 'scaleY(1)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
