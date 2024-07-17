/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#E4A001",
        purple: "#5871EB",
        violet: "#555CF6",
        orange: "#F28C0D",
        pumpkin: "#EE930E",
        black: "#1E1E1E",
        gold: "#EAA501",
        pink: "#FF9B9D",
        green: "#2CB553",
      },
      fontFamily: {
        inter: ["Inter"],
        raj: ["Rajdhani"],
        pop: ["Poppins"],
        lato: ["Lato"],
        sansita: ["Sansita"],
        lex: ["Lexend"],
        lal: ["Lalezar"],
        man: ["Manrope"],
      },
      boxShadow: {
        inner: "inset 0 50px 50px 0 rgba(0, 0, 0, 0.25)",
      },
      aspectRatio: {
        'rect': '26 / 46',
      },
    },
  },
  plugins: [],
};
