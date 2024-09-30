/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(158deg, rgba(13,14,51,1) 0%, rgba(24,20,46,1) 100%)",
      },
      minHeight: {
        "1/2": "50%",
      },
    },
  },
  plugins: [],
};
