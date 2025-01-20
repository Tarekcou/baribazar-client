/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#70b100",
        secondary: "#6c757d",
        success: "#28a745",
        warning: "#ffc107",
        danger: "#dc3545",
        light: "#f8f9fa",
        dark: "#343a40",
      },
    },
  },
  plugins: [require("daisyui")],
};
