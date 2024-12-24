import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "rotate-center": "rotate-center 1s linear infinite both",
        "ripple": "ripple 750ms ease-out"
      },
      keyframes: {
        "rotate-center": {
          "0%": {
            transform: "rotate(0)"
          },
          to: {
            transform: "rotate(360deg)"
          }
        },
        "ripple": {
          '0%': { 
            transform: 'scale(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(2)',
            opacity: '0'
          }
        }
      }
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant(
        "hover",
        "@media(hover:hover){ &:where(:any-link, :enabled, div, summary):hover }"
      )
      addVariant('where', ':where(&)')
    })
  ],
};
export default config;
