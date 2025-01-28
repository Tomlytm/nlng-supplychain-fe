import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        primaryGradient:
          "linear-gradient(to bottom, var(--color-gradient-start), var(--color-gradient-end))",
        secondaryGradient:
          "linear-gradient(to top, var(--color-gradient-start), var(--color-gradient-end))",
      },
      fontFamily: {
        urban: "Urbanist",
        inter: "Inter",
        manrope: ["Manrope", "sans-serif"],
      },
      colors: {
        "lightest-grey": "#FCFCFC",
        "light-grey": "#EAECF0",
        "mid-grey": "#8697A2",
        "dark-grey": "#667085",
        "dark-grey-fade": "#66708550",
        "dark-txt": "#595959",
        "category-fade": "#FFFAEB",
        "success-bg": "#ECFDF3",
        "error-bg": "#FFE9E9",
        "blue-dark": "#2548A0",
        "resources-bg": "#F8F8F8",
        success: "#027A48",
        error: "#F13636",
        warning: "#FA642E",
        info: "#3FBDF3",
        category: "#B54708",
        primary: "#007A3D",
        secondaryBg: "#E3F1F9",
        secondary: "#0085C8",
        criteriaBg: "#E3E5FE",
        criteria: "#2548A0",
        primaryFade: "#E4FBEF",
        primaryLightest: "#424CF940",
      },
      animation: {
        slideDown: "slideDown 0.5s ease-in-out",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: '0' },
          "100%": { transform: "translateY(0)", opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
