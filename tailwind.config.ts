import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        doodle: {
          cream: '#FFF8E7',
          pink: '#FFB6D9',
          yellow: '#FFE17B',
          green: '#B4F1A8',
          blue: '#A8D8EA',
          purple: '#D5AAFF',
        }
      }
    },
  },
  plugins: [],
};
export default config;

