import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        "spring-slide-in-right": {
          "0%": { transform: "translateX(100%) scale(0.95)", opacity: "0" },
          "60%": { transform: "translateX(-10%) scale(1.02)", opacity: "1" },
          "80%": { transform: "translateX(5%) scale(0.98)" },
          "100%": { transform: "translateX(0%) scale(1)" },
        },
        "spring-slide-out-right": {
          "0%": { transform: "translateX(0%) scale(1)", opacity: "1" },
          "100%": { transform: "translateX(100%) scale(0.95)", opacity: "0" },
        },
      },
      animation: {
        "spring-slide-in-right":
          "spring-slide-in-right 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
        "spring-slide-out-right": "spring-slide-out-right 0.5s ease-in",
      },
    },
  },
  plugins: [animate],
};

export default config;
