/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            colors: {
                charcoal: '#111111',
                graphite: '#1C1C1C',
                offwhite: '#F5F5F2',
                'burnt-orange': '#E4572E',
                gold: '#C6A75E',
                sage: '#7A8F7A',
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
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Inter', 'sans-serif'],
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
