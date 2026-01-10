
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for the Creative Star theme
				"creative-purple": "#8B5CF6",
				"creative-pink": "#EC4899",
				"creative-indigo": "#6366F1",
				"creative-blue": "#3B82F6",
				"creative-yellow": "#FCD34D",
				"creative-orange": "#F97316",
				"creative-red": "#EF4444",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" }
				},
				"fade-out": {
					"0%": { opacity: "1" },
					"100%": { opacity: "0" }
				},
				"slide-in": {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(0)" }
				},
				"slide-up": {
					"0%": { transform: "translateY(100%)" },
					"100%": { transform: "translateY(0)" }
				},
				"glow": {
					"0%": { boxShadow: "0 0 0 rgba(139, 92, 246, 0.4)" },
					"50%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)" },
					"100%": { boxShadow: "0 0 0 rgba(139, 92, 246, 0.4)" }
				},
				"float": {
					"0%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
					"100%": { transform: "translateY(0)" }
				},
				"bounce-in": {
					"0%": { transform: "scale(0.8)", opacity: "0" },
					"80%": { transform: "scale(1.1)", opacity: "1" },
					"100%": { transform: "scale(1)", opacity: "1" }
				},
				"color-change": {
					"0%": { color: "#8B5CF6" },
					"25%": { color: "#EC4899" },
					"50%": { color: "#3B82F6" },
					"75%": { color: "#F97316" },
					"100%": { color: "#8B5CF6" }
				},
				"confetti": {
					"0%": { transform: "translateY(0) rotate(0)", opacity: "1" },
					"100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out forwards",
				"fade-out": "fade-out 0.5s ease-out forwards",
				"slide-in": "slide-in 0.5s ease-out forwards",
				"slide-up": "slide-up 0.5s ease-out forwards",
				"glow": "glow 2s infinite",
				"float": "float 6s ease-in-out infinite",
				"bounce-in": "bounce-in 0.8s ease-out forwards",
				"color-change": "color-change 8s linear infinite",
				"confetti": "confetti 5s ease-out forwards"
			},
			fontFamily: {
				'playfair': ['"Playfair Display"', 'serif'],
				'poppins': ['Poppins', 'sans-serif'],
				'bilderberg': ['Bilderberg', 'serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			backgroundImage: {
				'gradient-creative': 'linear-gradient(to right, #8B5CF6, #EC4899, #3B82F6)',
				'gradient-warm': 'linear-gradient(to right, #F97316, #FCD34D)',
				'gradient-cool': 'linear-gradient(to right, #3B82F6, #8B5CF6)',
				'texture-dots': 'radial-gradient(#3B82F6 1px, transparent 1px)',
				'hero-pattern': 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(240, 240, 240, 0.8)), url("/lovable-uploads/3b26f380-c74f-448d-a46c-6f0c07b063a6.png")',
			},
			backgroundSize: {
				'texture-size': '20px 20px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
