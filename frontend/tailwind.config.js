const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  media: false,
  theme: {
    extend: {
      colors: {
        yellow: {
          "light": "#F3F7FD"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities, addComponents, e, prefix, config }) {}),
  ],
};
