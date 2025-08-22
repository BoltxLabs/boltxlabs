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
			fontFamily: {
				inter: ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					hover: 'hsl(var(--primary-hover))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					hover: 'hsl(var(--secondary-hover))'
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
					foreground: 'hsl(var(--accent-foreground))',
					hover: 'hsl(var(--accent-hover))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					hover: 'hsl(var(--card-hover))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-accent': 'var(--gradient-accent)',
				'gradient-subtle': 'var(--gradient-subtle)'
			},
			boxShadow: {
				'xs': 'var(--shadow-xs)',
				'sm': 'var(--shadow-sm)',
				'md': 'var(--shadow-md)',
				'lg': 'var(--shadow-lg)',
				'primary': 'var(--shadow-primary)'
			},
			transitionDuration: {
				'fast': 'var(--transition-fast)',
				'normal': 'var(--transition-normal)',
				'slow': 'var(--transition-slow)'
			},
			borderRadius: {
				lg: 'var(--radius-lg)',
				md: 'var(--radius)',
				sm: 'calc(var(--radius) - 2px)',
				xl: 'var(--radius-xl)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(40px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px) rotateX(0deg)'
					},
					'33%': {
						transform: 'translateY(-15px) rotateX(5deg)'
					},
					'66%': {
						transform: 'translateY(-8px) rotateX(-3deg)'
					}
				},
				'floating-3d': {
					'0%, 100%': {
						transform: 'translateY(0px) rotateX(0deg) rotateZ(0deg)'
					},
					'25%': {
						transform: 'translateY(-20px) rotateX(10deg) rotateZ(5deg)'
					},
					'50%': {
						transform: 'translateY(-15px) rotateX(-5deg) rotateZ(-3deg)'
					},
					'75%': {
						transform: 'translateY(-25px) rotateX(8deg) rotateZ(2deg)'
					}
				},
				'rotate-3d': {
					'0%': {
						transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
					},
					'25%': {
						transform: 'rotateX(90deg) rotateY(90deg) rotateZ(0deg)'
					},
					'50%': {
						transform: 'rotateX(180deg) rotateY(180deg) rotateZ(90deg)'
					},
					'75%': {
						transform: 'rotateX(270deg) rotateY(270deg) rotateZ(180deg)'
					},
					'100%': {
						transform: 'rotateX(360deg) rotateY(360deg) rotateZ(270deg)'
					}
				},
				'cube-rotate': {
					'0%': {
						transform: 'rotateX(0deg) rotateY(0deg)'
					},
					'100%': {
						transform: 'rotateX(360deg) rotateY(360deg)'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px hsl(270 95% 68% / 0.5)'
					},
					'50%': {
						boxShadow: '0 0 60px hsl(270 95% 68% / 0.9), 0 0 100px hsl(280 85% 75% / 0.6)'
					}
				},
				'morph': {
					'0%, 100%': {
						borderRadius: '20px',
						transform: 'scale(1)'
					},
					'25%': {
						borderRadius: '50px 20px',
						transform: 'scale(1.05) rotateZ(5deg)'
					},
					'50%': {
						borderRadius: '20px 50px',
						transform: 'scale(0.95) rotateZ(-3deg)'
					},
					'75%': {
						borderRadius: '40px 30px',
						transform: 'scale(1.02) rotateZ(2deg)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-up': 'slide-up 0.8s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'floating-3d': 'floating-3d 8s ease-in-out infinite',
				'rotate-3d': 'rotate-3d 20s linear infinite',
				'cube-rotate': 'cube-rotate 12s linear infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'morph': 'morph 8s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
